/**
 * 
 */
package simple.mind.dbplayer;

import java.lang.reflect.Constructor;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

import javax.sql.DataSource;

/**
 * @author Mohibur Rashid
 *
 */
class SupportedDB {
  private static Map<String, Class<?>> supportedDBMap;
  static {
    supportedDBMap = new HashMap<>();
    supportedDBMap.put("h2db", H2DBOperation.class);
    supportedDBMap.put("mariadb", MariaDBOperation.class);
  }

  public static boolean contains(String db) {
    return supportedDBMap.keySet().contains(db.toLowerCase());
  }

  public static String availables() {
    StringBuilder sb = new StringBuilder().append("[ ");
    final StringJoiner js = new StringJoiner(", ");
    supportedDBMap.forEach((k, v) -> {
      js.add(k);
    });
    sb.append(js.toString()).append(" ]");
    return sb.toString();
  }

  public static DatabaseOperation getDBOperation(String db, DataSource ds) {
    if (!SupportedDB.contains(db)) throw new RuntimeException(db + " does not exists. Supported ones are : "
        + availables() + ". Example configuration:\nsimple.mind.dbplayer=h2db");
    Constructor<?> b = null;
    try {

      b = supportedDBMap.get(db).getConstructor(DataSource.class);
      return (DatabaseOperation) b.newInstance(ds);
    } catch (Exception e) {
      throw new RuntimeException(e);
    } finally {
    }
  }

}
