/**
 * 
 */
package simple.mind.dbplayer;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.sql.DataSource;

import lombok.extern.log4j.Log4j2;

/**
 * @author Mohibur Rashid
 *
 */
@Log4j2
final class H2DBOperation implements DatabaseOperation {

  private DataSource datasource;

  private Connection conn;

  private Map<String, String> variableMap;
  private Map<String, String> importMap;

  public H2DBOperation(DataSource datasource) {
    try {
      this.datasource = datasource;
      conn = this.datasource.getConnection();
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }

    variableMap = new HashMap<String, String>();
    variableMap.put("INTEGER", "Integer");
    variableMap.put("BIGINT", "Long");
    variableMap.put("DATE", "LocalDate");
    variableMap.put("DATETIME", "LocalDateTime");
    variableMap.put("TIMESTAMP", "LocalDateTime");
    variableMap.put("TIME", "LocalTime");

  }

  public List<String> tableList() {
    try {
      List<String> l = new ArrayList<String>();
      DatabaseMetaData md = conn.getMetaData();
      ResultSet rs = md.getTables(null, null, "%", null);
      while (rs.next()) {
        if (rs.getString(2).matches("PUBLIC")) l.add(rs.getString(3));
      }
      rs.close();
      return l;
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  private String DescTableQuery(String tableName) {
    return "SHOW COLUMNS FROM " + tableName;
  }

  private List<String> getColumnNames(ResultSetMetaData meta, boolean isCatalog) {
    List<String> cols = new ArrayList<String>();
    try {

      int colCount = meta.getColumnCount();
      for (int i = 1; i <= colCount; i++) {
        if (isCatalog)
          cols.add(meta.getCatalogName(i));
        else
          cols.add(meta.getColumnName(i));
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return cols;
  }

  private static Map<String, String> getMapMsg(String msg) {
    Map<String, String> res = new HashMap<String, String>();
    res.put("result", msg);
    return res;
  }

  public ResultGeneric<Map<String, String>> createTable(String query) {

    try {
      Statement stmt = conn.createStatement();
      stmt.executeUpdate(query);
      stmt.getResultSet();
      stmt.close();
      return ResultGeneric.success(getMapMsg("Table creation is successful"));
    } catch (Exception e) {
      return ResultGeneric.fail(getMapMsg(e.getMessage()));
    }
  }

  private ResultGeneric<Map<String, String>> executeDrop(String query) {
    try {
      Statement stmt = conn.createStatement();
      stmt.executeUpdate(query);
      stmt.close();
      return ResultGeneric.success(getMapMsg("Table drop is successful"));
    } catch (Exception e) {
      return ResultGeneric.fail(getMapMsg(e.getMessage()));
    }
  }

  public ResultGeneric<Map<String, String>> otherQueries(String query) {
    log.info("query: " + query);
    String query1 = query.trim().toLowerCase();
    if (query1.startsWith("create table ")) {
      return createTable(query);
    } else if (query1.startsWith("insert ")) {
      return insertIntoTable(query);
    } else if (query1.startsWith("update ")) {
      return updateColumnTable(query);
    } else if (query1.startsWith("drop ")) {
      return executeDrop(query);
    } else if (query1.startsWith("alter table ")) {
      return alterTable(query);
    } else if (query1.startsWith("truncate table ")) {
      return truncateTable(query);
    }
    return ResultGeneric.fail(getMapMsg("Method not implemented"));
  }

  /**
   * @param query
   * @return
   */
  private ResultGeneric<Map<String, String>> truncateTable(String query) {
    try {
      Statement stmt = conn.createStatement();
      stmt.executeUpdate(query);
      stmt.close();
      return ResultGeneric.success(getMapMsg("Truncating table is successful"));
    } catch (Exception e) {
      return ResultGeneric.fail(getMapMsg(e.getMessage()));
    }
  }

  private ResultGeneric<Map<String, String>> alterTable(String query) {
    return null;
  }

  public List<List<String>> selectQuery(String query) {
    try {
      List<List<String>> list = new ArrayList<>();
      PreparedStatement stmt = conn.prepareStatement(query);
      stmt.execute();
      ResultSet rs = stmt.getResultSet();
      ResultSetMetaData meta = rs.getMetaData();
      int colCount = meta.getColumnCount();
      list.add(getColumnNames(meta, false));
      while (rs.next()) {
        ArrayList<String> l = new ArrayList<>();
        for (int i = 1; i <= colCount; i++) {
          l.add(rs.getString(i));
        }
        list.add(l);
      }
      rs.close();
      stmt.close();
      return list;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private ResultGeneric<Map<String, String>> updateColumnTable(String query) {
    return null;
  }

  private ResultGeneric<Map<String, String>> insertIntoTable(String query) {

    try {
      Statement stmt = conn.createStatement();
      stmt.executeUpdate(query);
      ResultSet rs = stmt.getGeneratedKeys();

      Long key = -1l;
      if (rs.next()) {
        key = rs.getLong(1);
      }
      rs.close();
      stmt.close();
      String msg = "Insertion is successful.";
      log.info("Key: " + key);
      if (key > 0) msg += " Inserted Key: " + key;
      return ResultGeneric.success(getMapMsg(msg));
    } catch (Exception e) {
      return ResultGeneric.fail(getMapMsg(e.getMessage()));
    }
  }

  @SuppressWarnings("unused")
  private String getTableName(String query) {
    Pattern pattern = Pattern.compile("^(insert)\\s+(into)\\s+(table)?\\s(.*?)[\s(]", Pattern.CASE_INSENSITIVE);
    Matcher matcher = pattern.matcher(query.trim());
    if (matcher.find()) {
      if (!matcher.group(1).toLowerCase().matches("insert")) return "";
      if (!matcher.group(2).toLowerCase().matches("into")) return "";
      if (matcher.group(3) != null && !matcher.group(3).toLowerCase().matches("table")) return "";
      return matcher.group(4);
    }
    return "";
  }

  public String getJavaVariableMap(String name) {
    String ret = variableMap.get(name.toUpperCase());
    return ret == null ? "String" : ret;
  }

  public String getJavaImport(String vname) {
    return importMap.get(vname);
  }

  @Override
  public ResultGeneric<List<List<String>>> descTable(String tableName) {
    try {
      return ResultGeneric.success(selectQuery(DescTableQuery(tableName)));
    } catch (Exception e) {
      return ResultGeneric.fail();
    }
  }
}
