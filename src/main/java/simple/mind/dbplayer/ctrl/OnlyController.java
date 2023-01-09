/**
 * 
 */
package simple.mind.dbplayer.ctrl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j2;

/**
 * @author Mohibur Rashid
 *
 */
@Controller
@Log4j2
public class OnlyController {
  public static final String BASE = "/database";
  public static final String TABLE = BASE + "/table";
  public static final String EXECUTE = BASE + "/execute";
  public static final String TABLE_LIST = BASE + "/table-list";
  public static final String SELECT_QUERY = BASE + "/select-query";

  private DatabaseOperation db;

  @Autowired
  public OnlyController(DataSource datasource) {
    db = new DatabaseOperation(datasource);
  }

  @GetMapping({ BASE, BASE + "/" })
  public String index(Model model) {
    model.addAttribute("tables", db.getTableList());
    model.addAttribute("path", OnlyController.class);
    return "zznotforproductiondatabase/index";
  }

  @PostMapping( //
      value = { TABLE, TABLE + "/" }, //
      produces = MediaType.APPLICATION_JSON_VALUE, //
      consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public ResultGeneric<List<List<String>>> executeQuery( //
      @RequestBody Map<String, String> data, Model model) {
    List<List<String>> res = db.executeQuery(db.showTableString(data.get("tableName")));
    return ResultGeneric.success(res);
  }

  @PutMapping( //
      value = { EXECUTE, EXECUTE + "/" }, //
      produces = MediaType.APPLICATION_JSON_VALUE, //
      consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public ResultGeneric<Map<String, String>> execteQuery(@RequestBody Map<String, String> data, Model model) {
    log.info("execteQuery: " + data.get("query"));
    return db.execute(data.get("query"));
  }

  @RequestMapping({ TABLE_LIST, TABLE_LIST + "/" })
  @ResponseBody
  public ResultGeneric<List<String>> getTableList() {
    log.info("getTableList");
    return ResultGeneric.success(db.getTableList());
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
      v.setResult(db.executeQuery(data.get("query")));
      return v;
    } catch (Exception e) {
      List<List<String>> l = new ArrayList<>();
      l.add(Arrays.asList(new String[] { e.getMessage() }));
      v.setStatus(false);
      v.setResult(l);
      return v;
    }
  }
}
