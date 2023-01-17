/**
 * 
 */
package simple.mind.dbplayer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.base.CaseFormat;
import com.google.common.base.Strings;

import lombok.extern.log4j.Log4j2;
import simple.mind.template.TemplateProcessor;

/**
 * @author Mohibur Rashid
 *
 */
@Controller
@Log4j2
@Configuration
public class OnlyController {
  // private String dbplayer;

  public static final String BASE = "/database";
  public static final String TABLE = BASE + "/table";
  public static final String EXECUTE = BASE + "/execute";
  public static final String TABLE_LIST = BASE + "/table-list";
  public static final String SELECT_QUERY = BASE + "/select-query";
  public static final String JAVA_CLASS = BASE + "/java_class";

  private DatabaseOperation db;

  @Autowired
  public OnlyController(DataSource datasource, @Value("${simple.mind.dbplayer}") String dbplayer) {
    log.info("dbplayer: " + dbplayer);
    // this.dbplayer = dbplayer;
    db = SupportedDB.getDBOperation(dbplayer, datasource);
  }

  @GetMapping({ BASE, BASE + "/" })
  public String index(Model model) {
    model.addAttribute("tables", db.tableList());
    model.addAttribute("path", OnlyController.class);
    return "zznotforproductiondatabase/index";
  }

  @PostMapping( //
      value = { TABLE, TABLE + "/" }, //
      produces = MediaType.APPLICATION_JSON_VALUE, //
      consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public ResultGeneric<List<List<String>>> getTableInformation( //
      @RequestBody Map<String, String> data, //
      Model model //
  ) {
    return db.descTable(data.get("tableName"));
  }

  @PutMapping( //
      value = { EXECUTE, EXECUTE + "/" }, //
      produces = MediaType.APPLICATION_JSON_VALUE, //
      consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public ResultGeneric<Map<String, String>> execteQuery(@RequestBody Map<String, String> data, Model model) {
    log.info("execteQuery: " + data.get("query"));
    return db.otherQueries(data.get("query"));
  }

  @RequestMapping({ TABLE_LIST, TABLE_LIST + "/" })
  @ResponseBody
  public ResultGeneric<List<String>> getTableList() {
    log.info("getTableList");
    return ResultGeneric.success(db.tableList());
  }

  @PutMapping( //
      value = { SELECT_QUERY, SELECT_QUERY + "/" }, //
      produces = MediaType.APPLICATION_JSON_VALUE, //
      consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public ResultGeneric<List<List<String>>> select(@RequestBody Map<String, String> data, Model model) {
    log.info("select: " + data.get("query"));
    var v = new ResultGeneric<List<List<String>>>();
    try {
      v.setStatus(true);
      v.setResult(db.selectQuery(data.get("query")));
      return v;
    } catch (Exception e) {
      List<List<String>> l = new ArrayList<>();
      l.add(Arrays.asList(new String[] { e.getMessage() }));
      v.setStatus(false);
      v.setResult(l);
      return v;
    }
  }

  @PostMapping(value = { JAVA_CLASS, JAVA_CLASS + "/" }, //
      produces = MediaType.APPLICATION_JSON_VALUE // , //
  // consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
  )
  @ResponseBody
  public ResultGeneric<String> getJavaClass(@RequestParam String tableName) {
    ResultGeneric<List<List<String>>> res = db.descTable(tableName);
    return processTemplate(res.getResult(), tableName);
  }

  private String getVariableName(String colName) {
    return CaseFormat.LOWER_UNDERSCORE.to(CaseFormat.UPPER_CAMEL, Strings.nullToEmpty(colName).toLowerCase());
  }

  private ResultGeneric<String> processTemplate(List<List<String>> res, String tableName) {
    var importList = new HashSet<String>();
    var prirow = getIdColumn(res);
    if (prirow == null) {
      return ResultGeneric.fail("Must have to have a Primary column for JPA");
    }
    TemplateProcessor tp = new TemplateProcessor(OnlyController.class, "java-template/TableClassDefinition");
    tp.setValue("PACKAGE_NAME", "write.the.correct.package.name");
    tp.setValue("TABLE_NAME", tableName);
    tp.setValue("CLASS_NAME", getVariableName(tableName));
    tp.setValue("ID_TYPE", db.getJavaVariableMap(prirow.get(1)));
    tp.setValue("ID", getVariableName(prirow.get(0)));
    int count = 0;
    String javaImport = db.getJavaImport(prirow.get(1));
    if (javaImport != null) importList.add(javaImport);
    for (var l : res) {
      count = processIndividualColumn(tp, l, count, importList);
    }
    for (var imp : importList) {
      tp.addRepeatBlock("additional", "additional" + count++).setValue("IMPORT", imp);
    }

    return ResultGeneric.success(tp.toString());
  }

  private int processIndividualColumn(TemplateProcessor tp, List<String> l, int count, Set<String> importList) {
    var varname = db.getJavaVariableMap(l.get(1));
    tp.addRepeatBlock("column", "column" + ++count).setValue("COLUMN_NAME", getVariableName(l.get(0))).setValue("TYPE",
        varname);
    String importv = db.getJavaImport(varname);
    if (importv != null) importList.add(importv);
    return count;
  }

  private Integer getIndex(List<String> col) {
    System.err.println(col);
    for (int i = 0; i < col.size(); i++) {
      if (col.get(i).toUpperCase().matches("KEY") || col.get(i).toUpperCase().matches("COLUMN_KEY")) return i;
    }
    return null;
  }

  private List<String> getIdColumn(List<List<String>> cols) {
    Integer keyIndex = getIndex(cols.get(0));
    cols.remove(0);
    int rowIndex = 0;
    for (; rowIndex < cols.size(); rowIndex++) {
      System.err.println(cols.get(rowIndex));
      if (cols.get(rowIndex).get(keyIndex).matches("PRI") || cols.get(rowIndex).get(keyIndex).matches("UNI")) {
        break;
      }
    }

    if (rowIndex >= cols.size()) return null;
    List<String> ret = cols.get(rowIndex);
    cols.remove(rowIndex);
    return ret;
  }
}
