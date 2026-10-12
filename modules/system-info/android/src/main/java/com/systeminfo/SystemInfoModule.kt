package com.systeminfo

import android.os.Build
import android.os.StatFs
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import java.util.concurrent.Executors
import java.util.concurrent.RejectedExecutionException

class SystemInfoModule(reactContext: ReactApplicationContext) :
  NativeSystemInfoSpec(reactContext) {

  private val diskExecutor = Executors.newSingleThreadExecutor()

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  override fun getSystemVersion(): String {
    return Build.VERSION.RELEASE
  }

  override fun getFreeDiskSpace(promise: Promise) {
    try {
      diskExecutor.execute {
        try {
          val path = reactApplicationContext.filesDir.absolutePath
          val bytes = StatFs(path).availableBytes

          promise.resolve(bytes.toDouble())
        } catch (error: Exception) {
          promise.reject(
            "E_DISK_SPACE",
            error.message,
            error
          )
        }
      }
    } catch (error: RejectedExecutionException) {
      promise.reject(
        "E_MODULE_INVALIDATED",
        "SystemInfo module has been invalidated",
        error
      )
    }
  }

  override fun invalidate() {
    diskExecutor.shutdown()
    super.invalidate()
  }

  companion object {
    const val NAME = NativeSystemInfoSpec.NAME
  }
}
