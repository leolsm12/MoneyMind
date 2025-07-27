import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import styles from './style';

export default function HomeScreen() {
  const [ganhos, setGanhos] = useState<number | null>(null);
  const [gastos, setGastos] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const data = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    datasets: [
      {
        data: [3500, 1200, 1800, 2000, -1500, -2500, 3000],
      },
    ],
  };

  const saldo = ganhos !== null && gastos !== null ? ganhos - gastos : 0;

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({ ganhos: 3000, gastos: 2500 });
          }, 1000)
        );

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
        <ActivityIndicator size="large" color="#3D5A80" />
      </ThemedView>
    );
  }

  function formatarParaBRL(valor: any) {
    throw new Error('Function not implemented.');
  }

  return (
    <ThemedView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('@/assets/images/MoneyMindLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Card com informações */}
      <ThemedView style={styles.card}>
        <ThemedText style={styles.label}>Ganhos</ThemedText>
        <ThemedText style={styles.valorPositivo}>
          {ganhos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </ThemedText>

        <ThemedText style={styles.label}>Gastos</ThemedText>
        <ThemedText style={styles.valorNegativo}>
          {gastos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </ThemedText>

        <ThemedText style={styles.label}>Saldo Atual</ThemedText>
        <ThemedText
          style={[
            styles.saldo,
            { color: saldo >= 0 ? '#3D5A80' : '#EE6C4D' },
          ]}
        >
          {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </ThemedText>

        {/* Gráfico simples embutido no card */}
        
      </ThemedView>
      
      {/* Gráfico completo separado */}
     
    </ThemedView>
  );
}
