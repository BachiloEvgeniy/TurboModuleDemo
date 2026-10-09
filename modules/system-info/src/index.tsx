import NativeSystemInfo from './NativeSystemInfo';

export { multiply } from './multiply';

export function getSystemVersion(): string {
  return NativeSystemInfo.getSystemVersion();
}
