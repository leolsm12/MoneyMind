import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '@/styles/home';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <LinearGradient
        colors={[Colors.primary, '#2E6B8A']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/MoneyIcon.png')}
                style={styles.logoIcon}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>MoneyMind</Text>
            </View>
            <Text style={styles.greeting}>Olá, Leo!</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/perfil')}
            style={styles.avatarContainer}
          >
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={28} color={Colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Card Saldo */}
        <View style={styles.saldoCard}>
          <Text style={styles.saldoLabel}>Saldo Atual</Text>
          <Text style={styles.saldoValor}>R$ 4.560,00</Text>

          <View style={styles.saldoRow}>
            <TouchableOpacity style={styles.receitaCard}>
              <Text style={styles.receitaLabel}>Receitas (Mês)</Text>
              <Text style={styles.receitaValor}>R$ 6.200,00</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.success} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.despesaCard}>
              <Text style={styles.despesaLabel}>Despesas (Mês)</Text>
              <Text style={styles.despesaValor}>R$ 1.640,00</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.accent} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Botões de ação rápida */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButtonReceita}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Nova Receita</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonDespesa}>
            <Ionicons name="remove" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Nova Despesa</Text>
          </TouchableOpacity>
        </View>

        {/* Card Insight IA */}
        <LinearGradient
          colors={['#E8F4FD', '#D4EDF9']}
          style={styles.insightCard}
        >
          <View style={styles.insightHeader}>
            <View style={styles.insightIconContainer}>
              <Ionicons name="sparkles" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.insightTitle}>Insight da IA</Text>
          </View>
          <Text style={styles.insightText}>
            Você economizou 15% a mais esta semana em alimentação! Quer aplicar na sua meta? 🎯
          </Text>
        </LinearGradient>

      </ScrollView>
    </View>
  );
}