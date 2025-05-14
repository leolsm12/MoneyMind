import BarChartResumo from '@/components/BarChartResumo';
import BarChartResumoSimples from '@/components/BarChartResumoSimples';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { styles } from '../../styles/_Home_style';


export default function HomeScreen() {
  const [ganhos, setGanhos] = useState<number | null>(null);
  const [gastos, setGastos] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const data = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  datasets: [
    {
      data: [3500, 1200, 1800, 2000, -1500, -2500, 3000]
    }
  ]
};

  const saldo = ganhos !== null && gastos !== null ? ganhos - gastos : 0;

  useEffect(() => {
    // Simulação de chamada à API
    const fetchDados = async () => {
      try {
        // Aqui você vai colocar o fetch real depois
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({ ganhos: 2500, gastos: 3000 });
        }, 1000));

        const { ganhos, gastos } = response as any;
        setGanhos(ganhos);
        setGastos(gastos);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, []);

  if (loading || ganhos === null || gastos === null) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#009FB7" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Logo canto superior esquerdo */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('@/assets/images/MoneyMindLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Card Moderno */}
      <ThemedView style={styles.card}>
        <ThemedText style={styles.label}>Ganhos</ThemedText>
        <ThemedText style={styles.valorPositivo}>R$ {ganhos.toFixed(2)}</ThemedText>

        <ThemedText style={styles.label}>Gastos</ThemedText>
        <ThemedText style={styles.valorNegativo}>R$ {gastos.toFixed(2)}</ThemedText>

        <ThemedText style={styles.label}>Saldo Atual</ThemedText>
        <ThemedText style={[styles.saldo, { color: saldo >= 0 ? '#2ecc71' : '#e74c3c' }]}>
          R$ {saldo.toFixed(2)}
        </ThemedText>

        <BarChartResumoSimples ganhos={ganhos} gastos={gastos} />
        
      </ThemedView>

      <BarChartResumo data={data}/>
    </ThemedView>
  );
}
