import Foundation
import Dispatch

@objc(SystemInfoImpl)
public final class SystemInfoImpl: NSObject {

    @objc public func getSystemVersion() -> String {
        let version = ProcessInfo.processInfo.operatingSystemVersion

        return "\(version.majorVersion).\(version.minorVersion).\(version.patchVersion)"
    }

    @objc public func multiply(_ a: Double, b: Double) -> Double {
        return a * b
    }

    @objc(getFreeDiskSpace:)
    public func getFreeDiskSpace(
        _ completion: @escaping @Sendable (NSNumber?, NSError?) -> Void
    ) {
        DispatchQueue.global(qos: .utility).async {
            do {
                let attributes = try FileManager().attributesOfFileSystem(
                    forPath: NSHomeDirectory()
                )

                guard let bytes = attributes[.systemFreeSize] as? NSNumber else {
                    throw NSError(
                        domain: "SystemInfo",
                        code: 1,
                        userInfo: [
                            NSLocalizedDescriptionKey: "Unable to read free disk space"
                        ]
                    )
                }

                completion(bytes, nil)
            } catch {
                completion(nil, error as NSError)
            }
        }
    }
}
