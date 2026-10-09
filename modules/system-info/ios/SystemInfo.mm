#import "SystemInfo.h"

#if __has_include("SystemInfo/SystemInfo-Swift.h")
#import "SystemInfo/SystemInfo-Swift.h"
#else
#import "SystemInfo-Swift.h"
#endif

@implementation SystemInfo {
  SystemInfoImpl *_implementation;
}

- (instancetype)init
{
  self = [super init];

  if (self) {
    _implementation = [SystemInfoImpl new];
  }

  return self;
}

- (NSString *)getSystemVersion
{
  return [_implementation getSystemVersion];
}

- (NSNumber *)multiply:(double)a b:(double)b
{
  double result = [_implementation multiply:a b:b];
  return @(result);
}
- (void)getFreeDiskSpace:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject
{
  [_implementation getFreeDiskSpace:^(NSNumber * _Nullable bytes,
                                     NSError * _Nullable error) {
    if (error != nil) {
      reject(
        @"E_DISK_SPACE",
        error.localizedDescription,
        error
      );
      return;
    }

    resolve(bytes);
  }];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<
      facebook::react::NativeSystemInfoSpecJSI
  >(params);
}

+ (NSString *)moduleName
{
  return @"SystemInfo";
}

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
