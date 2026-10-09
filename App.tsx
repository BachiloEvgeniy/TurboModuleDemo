import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { getSystemVersion, multiply } from 'react-native-system-info';
export default function App() {
  const [systemVersion, setSystemVersion] = useState<string | null>(null);
  const [product, setProduct] = useState<number | null>(null);

  function handleReadSystemVersion() {
    const version = getSystemVersion();
    setSystemVersion(version);
  }

  function handleMultiply() {
    const result = multiply(6, 7);
    setProduct(result);
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
