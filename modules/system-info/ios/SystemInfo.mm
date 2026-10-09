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
