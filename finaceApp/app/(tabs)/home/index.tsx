import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const transacoesRecentes = [
  { id: '1', tipo: 'Receita', valor: 500, descricao: 'Salário' },
  { id: '2', tipo: 'Despesa', valor: -120, descricao: 'Supermercado' },
  { id: '3', tipo: 'Despesa', valor: -80, descricao: 'Transporte' },
];
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [ganhos, setGanhos] = useState<number | null>(null);
  const [gastos, setGastos] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
 

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
      <LinearGradient colors={['#FFF7E6', '#F7F7F7']} style={modernStyles.container}>
        <ActivityIndicator size="large" color="#FF8300" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#FFF7E6', '#F7F7F7']} style={modernStyles.container}>
      {/* Header estilo Itaú */}
      <View style={modernStyles.header}>
        <View>
          <ThemedText style={modernStyles.greeting}>Olá, João!</ThemedText>
          <ThemedText style={modernStyles.date}>{new Date().toLocaleDateString('pt-BR')}</ThemedText>
        </View>
        <Image
          source={require('@/assets/images/MoneyMindLogo.png')}
          style={modernStyles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={modernStyles.profileButton}>
          <Image
            source={require('@/assets/images/avatars/avatar1.jpg')}
            style={modernStyles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Card principal com saldo, estilo Itaú */}
      <ThemedView style={modernStyles.mainCard}>
        <ThemedText style={modernStyles.saldoLabel}>Saldo disponível</ThemedText>
        <ThemedText
          style={[
            modernStyles.saldoValor,
            { color: saldo >= 0 ? '#FF8300' : '#EE6C4D' },
          ]}
        >
          {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </ThemedText>
        {/* Gráfico simples de saldo */}
        <View style={modernStyles.saldoBarContainer}>
          <View style={[modernStyles.saldoBar, { width: `${Math.min(100, (saldo / ganhos) * 100)}%` }]} />
        </View>
      </ThemedView>

      {/* Cards de ganhos e gastos */}
      <View style={modernStyles.row}>
        <ThemedView style={modernStyles.infoCard}>
          <ThemedText style={modernStyles.label}>Ganhos</ThemedText>
          <ThemedText style={modernStyles.valorPositivo}>
            {ganhos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </ThemedText>
        </ThemedView>
        <ThemedView style={modernStyles.infoCard}>
          <ThemedText style={modernStyles.label}>Gastos</ThemedText>
          <ThemedText style={modernStyles.valorNegativo}>
            {gastos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </ThemedText>
        </ThemedView>
      </View>

      {/* Transações recentes */}
      <View style={modernStyles.recentContainer}>
        <ThemedText style={modernStyles.recentTitle}>Transações Recentes</ThemedText>
        <FlatList
          data={transacoesRecentes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={modernStyles.transacaoItem}>
              <ThemedText style={modernStyles.transacaoDescricao}>{item.descricao}</ThemedText>
              <ThemedText style={[
                modernStyles.transacaoValor,
                { color: item.valor >= 0 ? '#FF8300' : '#EE6C4D' }
              ]}>
                {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </ThemedText>
            </View>
          )}
        />
      </View>

      {/* Botão de ação moderno */}
      <TouchableOpacity style={modernStyles.actionButton} activeOpacity={0.8}>
        <ThemedText style={modernStyles.actionButtonText}>Nova Transação</ThemedText>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const modernStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 0,
    paddingBottom: 35,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8300',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  logo: {
    width: 120,
    height: 40,
  },
  profileButton: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  profileIcon: {
    width: 32,
    height: 32,
  },
  mainCard: {
    width: width * 0.92,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 28,
    elevation: 4,
    shadowColor: '#FF8300',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  saldoLabel: {
    fontSize: 18,
    color: '#888',
    fontWeight: '500',
    marginBottom: 8,
  },
  saldoValor: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  saldoBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginTop: 12,
    overflow: 'hidden',
  },
  saldoBar: {
    height: 8,
    backgroundColor: '#FF8300',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.92,
    marginBottom: 32,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 6,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#FF8300',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
    marginBottom: 6,
  },
  valorPositivo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF8300',
  },
  valorNegativo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EE6C4D',
  },
  recentContainer: {
    width: width * 0.92,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#FF8300',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8300',
    marginBottom: 8,
  },
  transacaoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  transacaoDescricao: {
    fontSize: 15,
    color: '#333',
  },
  transacaoValor: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  actionButton: {
    width: width * 0.92,
    backgroundColor: '#FF8300',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 32,
    elevation: 3,
    shadowColor: '#FF8300',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
