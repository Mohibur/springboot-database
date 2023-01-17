/**
 * 
 */
package simple.mind.dbplayer;

import java.util.List;
import java.util.Map;

/**
 * @author Mohibur Rashid
 *
 */
interface DatabaseOperation {

  List<String> tableList();

  /**
   * Select queries
   * 
   * @param query
   * @return
   */
  List<List<String>> selectQuery(String query);

  /**
   * CREATE, UPDATE, ALTER, INSERT
   * 
   * @param query
   * @return
   */
  ResultGeneric<Map<String, String>> otherQueries(String query);

  /**
   * DESC query
   * 
   * @param query
   * @return
   */
  ResultGeneric<List<List<String>>> descTable(String query);

  /**
   * To map with DB type and java type
   * 
   * @param name
   * @return
   */
  String getJavaVariableMap(String name);

  /**
   * 
   * @param vname
   * @return
   */
  default String getJavaImport(String vname) {
    return JavaImportMap.importMap.get(vname);
  }
}
