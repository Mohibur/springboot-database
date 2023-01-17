/**
 * 
 */
package simple.mind.dbplayer;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Mohibur Rashid
 *
 */
class JavaImportMap {
  final static Map<String, String> importMap;
  static {
    importMap = new HashMap<String, String>();
    importMap.put("LocalDate", "java.time.LocalDate");
    importMap.put("LocalDateTime", "java.time.LocalDateTime");
    importMap.put("LocalTime", "java.time.LocalTime");
  }
}
