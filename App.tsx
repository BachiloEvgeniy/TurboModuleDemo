import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import {
  getSystemVersion,
  multiply,
  getFreeDiskSpace,
} from 'react-native-system-info';
export default function App() {
  const [systemVersion, setSystemVersion] = useState<string | null>(null);
  const [product, setProduct] = useState<number | null>(null);
  const [freeDiskSpace, setFreeDiskSpace] = useState<number | null>(null);
  const [isDiskLoading, setIsDiskLoading] = useState(false);
  const [diskError, setDiskError] = useState<string | null>(null);

  function handleReadSystemVersion() {
    const version = getSystemVersion();
    setSystemVersion(version);
  }

  function handleMultiply() {
    const result = multiply(6, 7);
    setProduct(result);
  }

  async function handleReadDiskSpace() {
    setIsDiskLoading(true);
    setDiskError(null);
    setFreeDiskSpace(null);

    try {
      const bytes = await getFreeDiskSpace();
      setFreeDiskSpace(bytes);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      setDiskError(message);
    } finally {
      setIsDiskLoading(false);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View style={styles.content}>
          <Text style={styles.title}>Наш первый TurboModule</Text>

          <Text style={styles.result}>
            {systemVersion === null
              ? 'Нажми кнопку, чтобы узнать версию iOS'
              : `Версия iOS: ${systemVersion}`}
          </Text>

          <Button
            title="Получить версию iOS"
            onPress={handleReadSystemVersion}
          />
          <Text style={styles.result}>
            {product === null
              ? 'Результат умножения появится здесь'
              : `6 × 7 = ${product}`}
          </Text>

          <Button title="Умножить 6 × 7" onPress={handleMultiply} />
          <Text style={styles.result}>
            {diskError !== null
              ? `Ошибка: ${diskError}`
              : freeDiskSpace === null
              ? 'Свободное место ещё не прочитано'
              : `Свободно: ${(freeDiskSpace / 1000000000).toFixed(2)} ГБ`}
          </Text>

          <Button
            title={isDiskLoading ? 'Читаем…' : 'Получить свободное место'}
            onPress={handleReadDiskSpace}
            disabled={isDiskLoading}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    color: '#374151',
  },
});
