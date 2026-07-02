import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '@/styles/metas';
import { Colors } from '@/constants/theme';

type Meta = {
  id: string;
  titulo: string;
  valorAtual: number;
  valorMeta: number;
  insight: string;
};

const mockMetas: Meta[] = [
  {
    id: '1',
    titulo: 'Viagem Fim de Ano',
    valorAtual: 2736,
    valorMeta: 4560,
    insight: 'Você economizou 15% a mais esta semana! Quer aplicar nessa meta?',
  },
  {
    id: '2',
    titulo: 'Reserva de Emergência',
    valorAtual: 1200,
    valorMeta: 5000,
    insight: 'Faltam R$ 3.800 para sua reserva. Que tal guardar R$ 150/mês?',
  },
];

function CircularProgress({ progresso }: { progresso: number }) {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressCircle}>
        <Text style={styles.progressText}>{Math.round(progresso)}%</Text>
      </View>
    </View>
  );
}

export default function MetasScreen() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <LinearGradient colors={[Colors.primary, '#2E6B8A']} style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Metas</Text>
        <Text style={styles.headerSubtitle}>Acompanhe seu progresso</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {mockMetas.map(meta => {
          const progresso = (meta.valorAtual / meta.valorMeta) * 100;
          return (
            <View key={meta.id} style={styles.metaCard}>

              <View style={styles.metaHeader}>
                <Text style={styles.metaTitulo}>{meta.titulo}</Text>
                <CircularProgress progresso={progresso} />
              </View>

              <View style={styles.metaValores}>
                <Text style={styles.metaAtual}>
                  R$ {meta.valorAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={styles.metaTotal}>
                  de R$ {meta.valorMeta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
              </View>

              {/* Barra de progresso */}
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min(progresso, 100)}%` }]} />
              </View>

              {/* Insight IA */}
              <LinearGradient colors={['#E8F4FD', '#D4EDF9']} style={styles.insightCard}>
                <View style={styles.insightHeader}>
                  <Ionicons name="sparkles" size={16} color={Colors.primary} />
                  <Text style={styles.insightTitle}>Insight da IA</Text>
                </View>
                <Text style={styles.insightText}>{meta.insight}</Text>
              </LinearGradient>

            </View>
          );
        })}

        {/* Botão nova meta */}
        <TouchableOpacity style={styles.novaMeta}>
          <Ionicons name="add" size={24} color={Colors.textLight} />
          <Text style={styles.novaMetaText}>Nova Meta</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}