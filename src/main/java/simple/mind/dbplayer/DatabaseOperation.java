/**
 * 
 */
package simple.mind.dbplayer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

/**
 * @author Mohibur Rashid
 *
 */
abstract class DatabaseOperation {

  final static Map<String, String> importMap;
  static {
    importMap = new HashMap<String, String>();
    importMap.put("LocalDate", "java.time.LocalDate");
    importMap.put("LocalDateTime", "java.time.LocalDateTime");
    importMap.put("LocalTime", "java.time.LocalTime");
  }

  protected DataSource datasource;

  protected Connection conn;

  abstract List<String> tableList();

  /**
   * Select queries
   * 
   * @param query
   * @return
   */
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

  /**
   * CREATE, UPDATE, ALTER, INSERT
   * 
   * @param query
   * @return
   */
  public ResultGeneric<Map<String, String>> otherQueries(String query) {
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

  private ResultGeneric<Map<String, String>> alterTable(String query) {
    return null;
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
      if (key > 0) msg += " Inserted Key: " + key;
      return ResultGeneric.success(getMapMsg(msg));
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

  private static Map<String, String> getMapMsg(String msg) {
    Map<String, String> res = new HashMap<String, String>();
    res.put("result", msg);
    return res;
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

  /**
   * DESC query
   * 
   * @param query
   * @return
   */
  abstract ResultGeneric<List<List<String>>> descTable(String query);

  /**
   * To map with DB type and java type
   * 
   * @param name
   * @return
   */
  abstract String getJavaVariableMap(String name);

  /**
   * 
   * @param vname
   * @return
   */
  final String getJavaImport(String vname) {
    return importMap.get(vname);
  }
}
