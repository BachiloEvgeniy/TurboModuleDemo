import Foundation

@objc(SystemInfoImpl)
public final class SystemInfoImpl: NSObject {

    @objc public func getSystemVersion() -> String {
        let version = ProcessInfo.processInfo.operatingSystemVersion

        return "\(version.majorVersion).\(version.minorVersion).\(version.patchVersion)"
    }

    @objc public func multiply(_ a: Double, b: Double) -> Double {
        return a * b
    }
}
