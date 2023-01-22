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
final class H2DBOperation extends DatabaseOperation {
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

  public H2DBOperation(DataSource datasource) {
    try {
      this.datasource = datasource;
      conn = this.datasource.getConnection();
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
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

  public String getJavaVariableMap(String name) {
    String ret = variableMap.get(name.toUpperCase());
    return ret == null ? "String" : ret;
  }

  public ResultGeneric<List<List<String>>> descTable(String tableName) {
    try {
      String query = "SHOW COLUMNS FROM " + tableName;
      return ResultGeneric.success(selectQuery(query));
    } catch (Exception e) {
      return ResultGeneric.fail();
    }
  }
}
