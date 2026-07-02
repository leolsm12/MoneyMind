import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style';
import { Colors } from '@/constants/theme';

type Transacao = {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'RECEITA' | 'DESPESA';
  data: string;
  categoria: string;
};

const mockTransacoes: Transacao[] = [
  { id: '1', descricao: 'Salário', valor: 6200, tipo: 'RECEITA', data: '25/06/2026', categoria: 'salario' },
  { id: '2', descricao: 'Supermercado', valor: 350, tipo: 'DESPESA', data: '24/06/2026', categoria: 'mercado' },
  { id: '3', descricao: 'Netflix', valor: 45, tipo: 'DESPESA', data: '23/06/2026', categoria: 'lazer' },
  { id: '4', descricao: 'Freelance', valor: 800, tipo: 'RECEITA', data: '22/06/2026', categoria: 'freela' },
  { id: '5', descricao: 'Aluguel', valor: 1200, tipo: 'DESPESA', data: '20/06/2026', categoria: 'moradia' },
];

const getCategoriaIcon = (categoria: string): any => {
  const map: Record<string, string> = {
    salario: 'cash-outline',
    mercado: 'cart-outline',
    lazer: 'tv-outline',
    freela: 'briefcase-outline',
    moradia: 'home-outline',
  };
  return map[categoria] ?? 'ellipse-outline';
};

const getCategoriaColor = (categoria: string): string => {
  const map: Record<string, string> = {
    salario: '#6BCB77',
    mercado: '#4ECDC4',
    lazer: '#9B59B6',
    freela: '#3D5A80',
    moradia: '#E67E22',
  };
  return map[categoria] ?? '#8A9BB0';
};

export default function ExtratoScreen() {
  const [filtro, setFiltro] = useState<'TODOS' | 'RECEITA' | 'DESPESA'>('TODOS');

  const transacoesFiltradas = mockTransacoes.filter(t =>
    filtro === 'TODOS' ? true : t.tipo === filtro
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <LinearGradient colors={[Colors.primary, '#2E6B8A']} style={styles.header}>
        <Text style={styles.headerTitle}>Extrato</Text>
        <Text style={styles.headerSubtitle}>Junho 2026</Text>
      </LinearGradient>

      {/* Filtros */}
      <View style={styles.filtrosContainer}>
        {(['TODOS', 'RECEITA', 'DESPESA'] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filtroButton, filtro === f && styles.filtroButtonActive]}
            onPress={() => setFiltro(f)}
          >
            <Text style={[styles.filtroText, filtro === f && styles.filtroTextActive]}>
              {f === 'TODOS' ? 'Todos' : f === 'RECEITA' ? 'Receitas' : 'Despesas'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista */}
      <FlatList
        data={transacoesFiltradas}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={48} color={Colors.border} />
            <Text style={styles.emptyText}>Nenhuma transação encontrada</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.transacaoCard}>
            <View style={[styles.iconContainer, { backgroundColor: getCategoriaColor(item.categoria) + '20' }]}>
              <Ionicons name={getCategoriaIcon(item.categoria)} size={22} color={getCategoriaColor(item.categoria)} />
            </View>
            <View style={styles.transacaoInfo}>
              <Text style={styles.transacaoDescricao}>{item.descricao}</Text>
              <Text style={styles.transacaoData}>{item.data}</Text>
            </View>
            <Text style={[styles.transacaoValor, { color: item.tipo === 'RECEITA' ? Colors.success : Colors.accent }]}>
              {item.tipo === 'RECEITA' ? '+' : '-'} R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        )}
      />
    </View>
  );
}