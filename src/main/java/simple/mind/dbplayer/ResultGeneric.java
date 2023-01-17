package simple.mind.dbplayer;

import java.util.Date;

import com.google.gson.GsonBuilder;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
class ResultGeneric<T> {
  private boolean status;
  private T result;
  private Date time;

  public ResultGeneric(boolean status, T data) {
    this.status = status;
    this.result = data;
    this.time = new Date();
  }

  public ResultGeneric() {
    this.time = new Date();
  }

  @Override
  public String toString() {
    return new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create().toJson(this);
  }

  public static <T> ResultGeneric<T> fail(T res) {
    return new ResultGeneric<>(false, res);
  }

  public static <T> ResultGeneric<T> fail() {
    return new ResultGeneric<>(false, null);
  }

  public static <T> ResultGeneric<T> success(T res) {
    return new ResultGeneric<>(true, res);
  }
}
