import BarChartResumo from '@/components/BarChartResumo';
import BarChartResumoSimples from '@/components/BarChartResumoSimples';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from 'expo-router';
import { styles } from './_Home_style';

export default function HomeScreen() {
  const navigation = useNavigation();

  const ganhos = 2500;
  const gastos = 3200;
  const saldo = ganhos - gastos;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        MoneyMind
      </ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText style={styles.label}>Ganhos:</ThemedText>
        <ThemedText style={styles.valorPositivo}>R$ {ganhos.toFixed(2)}</ThemedText>

        <ThemedText style={styles.label}>Gastos:</ThemedText>
        <ThemedText style={styles.valorNegativo}>R$ {gastos.toFixed(2)}</ThemedText>

        <ThemedText style={styles.label}>Saldo Atual:</ThemedText>
        <ThemedText
          style={[
            styles.saldo,
            { color: saldo >= 0 ? '#2ecc71' : '#e74c3c' },
          ]}>
          R$ {saldo.toFixed(2)}
        </ThemedText>
        <BarChartResumoSimples ganhos={ganhos} gastos={gastos}  />
      </ThemedView>
      <BarChartResumo/>        
    </ThemedView>
  );
}
