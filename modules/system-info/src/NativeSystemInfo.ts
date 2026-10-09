import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
  getSystemVersion(): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SystemInfo');
