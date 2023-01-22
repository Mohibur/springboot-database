/**
 * 
 */
package simple.mind.dbplayer;

import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

/**
 * @author Mohibur Rashid
 *
 */
final class MariaDBOperation extends DatabaseOperation {
  private static Map<String, String> variableMap;

  static {
    variableMap = new HashMap<String, String>();
    variableMap.put("INTEGER", "Integer");
    variableMap.put("BIGINT", "Long");
    variableMap.put("DATE", "LocalDate");
    variableMap.put("DATETIME", "LocalDateTime");
    variableMap.put("TIMESTAMP", "LocalDateTime");
    variableMap.put("TIME", "LocalTime");
  }

  public MariaDBOperation(DataSource datasource) {
    try {
      this.datasource = datasource;
      conn = this.datasource.getConnection();
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  public List<String> tableList() {
    try {
      DatabaseMetaData dbMeta = conn.getMetaData();
      // con.getCatalog() returns database name
      ResultSet rs = dbMeta.getTables(conn.getCatalog(), "", null, new String[] { "TABLE" });
      ArrayList<String> tables = new ArrayList<String>();
      while (rs.next()) {
        String tableName = rs.getString("TABLE_NAME");
        tables.add(tableName);
      }
      return tables;
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  ResultGeneric<List<List<String>>> descTable(String tableName) {
    String query = "SHOW COLUMNS FROM " + tableName;
    try {
      return ResultGeneric.success(selectQuery(query));
    } catch (Exception e) {
      return ResultGeneric.fail();
    }
  }

  @Override
  String getJavaVariableMap(String name) {
    String ret = variableMap.get(name.toUpperCase());
    return ret == null ? "String" : ret;
  }
}
