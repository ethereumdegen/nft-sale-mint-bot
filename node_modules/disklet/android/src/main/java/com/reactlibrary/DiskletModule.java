package com.reactlibrary;

import android.util.Base64;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

public class DiskletModule extends ReactContextBaseJavaModule {
  private final File basePath;

  public DiskletModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.basePath = reactContext.getFilesDir();
  }

  @Override
  public String getName() {
    return "Disklet";
  }

  // helpers -----------------------------------------------------------

  private void handleError(Promise promise, File file, Throwable e) {
    if (e instanceof FileNotFoundException) {
      promise.reject("ENOENT", "Cannot read '" + file.getAbsolutePath() + "'");
    } else {
      promise.reject(null, e);
    }
  }

  private void deepDelete(File file) {
    if (file.isDirectory()) {
      for (File child : file.listFiles()) deepDelete(child);
    }
    file.delete();
  }

  private byte[] readFile(File file) throws IOException {
    FileInputStream stream = new FileInputStream(file);
    try {
      ByteArrayOutputStream out = new ByteArrayOutputStream();

      int size;
      byte[] data = new byte[4096];
      while ((size = stream.read(data)) > 0) {
        out.write(data, 0, size);
      }

      return out.toByteArray();
    } finally {
      stream.close();
    }
  }

  private void writeFile(File file, byte[] data) throws IOException {
    File parent = file.getParentFile();
    if (!parent.exists()) parent.mkdirs();

    FileOutputStream stream = new FileOutputStream(file);
    try {
      stream.write(data);
    } finally {
      stream.close();
    }
  }

  // disklet -----------------------------------------------------------

  @ReactMethod
  public void delete(String path, Promise promise) {
    File file = new File(basePath, path);
    try {
      deepDelete(file);
      promise.resolve(null);
    } catch (Exception e) {
      handleError(promise, file, e);
    }
  }

  @ReactMethod
  public void getData(String path, Promise promise) {
    File file = new File(basePath, path);
    try {
      byte[] data = readFile(file);
      promise.resolve(Base64.encodeToString(data, Base64.NO_WRAP));
    } catch (Throwable e) {
      handleError(promise, file, e);
    }
  }

  @ReactMethod
  public void getText(String path, Promise promise) {
    File file = new File(basePath, path);
    try {
      byte[] data = readFile(file);
      promise.resolve(new String(data, StandardCharsets.UTF_8));
    } catch (Throwable e) {
      handleError(promise, file, e);
    }
  }

  @ReactMethod
  public void list(String path, Promise promise) {
    File file = new File(basePath, path);
    try {
      HashMap<String, Object> out = new HashMap<String, Object>();

      if (file.exists()) {
        if (file.isDirectory()) {
          String prefix = "".equals(path) ? path : path + "/";
          File[] files = file.listFiles();
          for (File child : files) {
            out.put(prefix + child.getName(), child.isDirectory() ? "folder" : "file");
          }
        } else {
          out.put(path, "file");
        }
      }

      promise.resolve(Arguments.makeNativeMap(out));
    } catch (Throwable e) {
      handleError(promise, file, e);
    }
  }

  @ReactMethod
  public void setData(String path, String base64, Promise promise) {
    File file = new File(basePath, path);
    try {
      byte[] data = Base64.decode(base64, Base64.DEFAULT);
      writeFile(file, data);
      promise.resolve(null);
    } catch (Throwable e) {
      handleError(promise, file, e);
    }
  }

  @ReactMethod
  public void setText(String path, String text, Promise promise) {
    File file = new File(basePath, path);
    try {
      byte[] data = text.getBytes(StandardCharsets.UTF_8);
      writeFile(file, data);
      promise.resolve(null);
    } catch (Throwable e) {
      handleError(promise, file, e);
    }
  }
}
