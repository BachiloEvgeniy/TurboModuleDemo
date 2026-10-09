package com.systeminfo

import com.facebook.react.bridge.ReactApplicationContext

class SystemInfoModule(reactContext: ReactApplicationContext) :
  NativeSystemInfoSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeSystemInfoSpec.NAME
  }
}
