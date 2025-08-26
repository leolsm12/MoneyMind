import FormularioFinanceiro from '@/components/FormularioFinanceiro';
import { ThemedView } from '@/components/ThemedView';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function GanhosScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [ganhos, setGanhos] = useState<{ valor: string; categoria: string; data: Date }[]>([]);
  const [metaGanhos, setMetaGanhos] = useState(5000);

  // Animação do progresso
  const progressoAnim = useRef(new Animated.Value(0)).current;
  const totalGanhos = ganhos.reduce((acc, item) => acc + parseFloat(item.valor), 0);
  const progresso = (totalGanhos / metaGanhos) * 100;

  useEffect(() => {
    Animated.timing(progressoAnim, {
      toValue: Math.min(progresso, 100),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progresso]);

  const formatarParaBRL = (valor: number | string) => {
    const numero = typeof valor === 'string' ? parseFloat(valor) : valor;
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleSaveGanho = (data: Record<string, any>) => {
    const { descricao, valor } = data;
    const valorNumerico = parseFloat(valor);

    if (!descricao || isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Informe uma descrição válida e um valor maior que zero.');
      return;
    }

    const novoGanho = {
      valor: valorNumerico.toString(),
      categoria: descricao,
      data: new Date(),
    };

    setGanhos(prev => [novoGanho, ...prev]);
    setShowModal(false);
  };

  const handleSaveMeta = (dados: Record<string, string | number>) => {
    const valor = dados.meta;
    const parsedValue = typeof valor === 'string' ? parseFloat(valor) : valor;

    if (!isNaN(parsedValue) && parsedValue > 0) {
      setMetaGanhos(parsedValue);
    } else {
      Alert.alert('Erro', 'Informe um valor de meta válido e maior que zero.');
    }
    setShowMetaModal(false);
  };

  const handleDeleteGanho = (index: number) => {
    Alert.alert(
      'Remover ganho',
      'Tem certeza que deseja remover este ganho?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setGanhos(prev => prev.filter((_, i) => i !== index));
          },
        },
      ]
    );
  };

  // Ícone por categoria (exemplo simples)
  const getCategoriaIcon = (categoria: string) => {
    if (/salário|emprego/i.test(categoria)) return <Feather name="dollar-sign" size={24} color="#FF8200" />;
    if (/freelance|autônomo/i.test(categoria)) return <Feather name="briefcase" size={24} color="#FF8200" />;
    if (/outros|extra/i.test(categoria)) return <Feather name="plus" size={24} color="#FF8200" />;
    return <Feather name="star" size={24} color="#FF8200" />;
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Meus Ganhos</Text>
          <Text style={styles.subtitle}>Acompanhe seu mês</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowMetaModal(true)}
          accessibilityLabel="Editar meta de ganhos"
        >
          <MaterialIcons name="edit" size={28} color="#FF8200" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total ganho</Text>
        <Text style={styles.cardValue}>{formatarParaBRL(totalGanhos)}</Text>
        <Text style={styles.cardMeta}>Meta: {formatarParaBRL(metaGanhos)}</Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progress,
              {
                width: progressoAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: progresso >= 100 ? '#2ecc71' : '#FF8200',
              },
            ]}
          />
        </View>
        <Text style={[
          styles.progressText,
          progresso >= 100 && { color: '#2ecc71', fontWeight: 'bold' }
        ]}>
          Progresso: {progresso.toFixed(1)}%
          {progresso >= 100 ? ' (Meta atingida!)' : ''}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Últimos ganhos</Text>
      <FlatList
        data={ganhos}
        style={styles.lista}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum ganho registrado ainda.</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item, index }) => (
          <View style={styles.ganhoItem}>
            <View style={styles.itemHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {getCategoriaIcon(item.categoria)}
                <Text style={styles.categoria}>{item.categoria}</Text>
              </View>
              <Text style={styles.valor}>{formatarParaBRL(item.valor)}</Text>
              <TouchableOpacity
                onPress={() => handleDeleteGanho(index)}
                accessibilityLabel="Remover ganho"
                style={{ marginLeft: 8 }}
              >
                <AntDesign name="delete" size={22} color="#888" />
              </TouchableOpacity>
            </View>
            <Text style={styles.data}>
              {item.data.toLocaleDateString()} - {item.data.toLocaleTimeString()}
            </Text>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowModal(true)}
        accessibilityLabel="Adicionar novo ganho"
      >
        <AntDesign name="pluscircle" size={60} color="#FF8200" />
      </TouchableOpacity>

      <FormularioFinanceiro
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveGanho}
        titulo="Registrar novo ganho"
        corBotao="#FF8200"
        campos={[
          { id: 'descricao', tipo: 'input', placeholder: 'Descrição' },
          { id: 'valor', tipo: 'input', placeholder: 'Valor (R$)' },
        ]}
      />

      <FormularioFinanceiro
        visible={showMetaModal}
        onClose={() => setShowMetaModal(false)}
        onSave={handleSaveMeta}
        titulo="Nova Meta de Ganhos"
        corBotao="#FF8200"
        campos={[{ id: 'meta', tipo: 'input', placeholder: metaGanhos.toString() }]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFF5E6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#FF8200',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 16,
    color: '#FF8200',
    marginBottom: 12,
  },
  progressBar: {
    height: 16,
    backgroundColor: '#FFE0B2',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    width: '100%',
  },
  progress: {
    height: 16,
    borderRadius: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#222',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    marginTop: 8,
  },
  lista: {
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 24,
  },
  ganhoItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#FF8200',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoria: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginLeft: 8,
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 8,
  },
  data: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 65,
    zIndex: 10,
  },
});
