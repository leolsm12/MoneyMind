import FormularioFinanceiro from '@/components/FormularioFinanceiro';
import { ThemedView } from '@/components/ThemedView';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Animated, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function GastosScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [gastos, setGastos] = useState<{ valor: string; categoria: string; data: Date }[]>([]);
  const [metaGastos, setMetaGastos] = useState(3000);

  // Animação do progresso
  const progressoAnim = React.useRef(new Animated.Value(0)).current;
  const totalGastos = gastos.reduce((acc, item) => acc + parseFloat(item.valor), 0);
  const progresso = (totalGastos / metaGastos) * 100;

  React.useEffect(() => {
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

  const handleSaveGasto = (data: Record<string, any>) => {
    const { descricao, valor } = data;
    const valorNumerico = parseFloat(valor);

    if (!descricao || isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Informe uma descrição válida e um valor maior que zero.');
      return;
    }

    const novoGasto = {
      valor: valorNumerico.toString(),
      categoria: descricao,
      data: new Date(),
    };

    setGastos(prev => [novoGasto, ...prev]);
    setShowModal(false);
  };

  const handleSaveMeta = (dados: Record<string, string | number>) => {
    const valor = dados.meta;
    const parsedValue = typeof valor === 'string' ? parseFloat(valor) : valor;

    if (!isNaN(parsedValue) && parsedValue > 0) {
      setMetaGastos(parsedValue);
    } else {
      Alert.alert('Erro', 'Informe um valor de meta válido e maior que zero.');
    }
    setShowMetaModal(false);
  };

  const handleDeleteGasto = (index: number) => {
    Alert.alert(
      'Remover gasto',
      'Tem certeza que deseja remover este gasto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setGastos(prev => prev.filter((_, i) => i !== index));
          },
        },
      ]
    );
  };

  // Ícone por categoria (exemplo simples)
  const getCategoriaIcon = (categoria: string) => {
    if (/supermercado|mercado/i.test(categoria)) return <Feather name="shopping-cart" size={24} color="#FF8300" />;
    if (/transporte|uber|ônibus/i.test(categoria)) return <Feather name="truck" size={24} color="#FF8300" />;
    if (/lazer|cinema|bar/i.test(categoria)) return <Feather name="smile" size={24} color="#FF8300" />;
    return <Feather name="tag" size={24} color="#FF8300" />;
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Meus Gastos</Text>
          <Text style={styles.subtitle}>Acompanhe seu mês</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowMetaModal(true)}
          accessibilityLabel="Editar meta de gastos"
        >
          <MaterialIcons name="edit" size={28} color="#FF8300" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total gasto</Text>
        <Text style={styles.cardValue}>{formatarParaBRL(totalGastos)}</Text>
        <Text style={styles.cardMeta}>Meta: {formatarParaBRL(metaGastos)}</Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progress,
              {
                width: progressoAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: progresso >= 100 ? '#E60000' : '#FF8300',
              },
            ]}
          />
        </View>
        <Text style={[
          styles.progressText,
          progresso >= 100 && { color: '#E60000', fontWeight: 'bold' }
        ]}>
          Progresso: {progresso.toFixed(1)}%
          {progresso >= 100 ? ' (Meta atingida!)' : ''}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Últimos gastos</Text>
      <FlatList
        data={gastos}
        style={styles.lista}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum gasto registrado ainda.</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item, index }) => (
          <View style={styles.gastoItem}>
            <View style={styles.itemHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {getCategoriaIcon(item.categoria)}
                <Text style={styles.categoria}>{item.categoria}</Text>
              </View>
              <Text style={styles.valor}>{formatarParaBRL(item.valor)}</Text>
              <TouchableOpacity
                onPress={() => handleDeleteGasto(index)}
                accessibilityLabel="Remover gasto"
                style={{ marginLeft: 8 }}
              >
                <AntDesign name="delete" size={22} color="#E60000" />
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
        accessibilityLabel="Adicionar novo gasto"
      >
        <AntDesign name="pluscircle" size={60} color="#FF8300" />
      </TouchableOpacity>

      <FormularioFinanceiro
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveGasto}
        titulo="Registrar novo gasto"
        corBotao="#FF8300"
        campos={[
          { id: 'descricao', tipo: 'input', placeholder: 'Descrição' },
          { id: 'valor', tipo: 'input', placeholder: 'Valor (R$)' },
        ]}
      />

      <FormularioFinanceiro
        visible={showMetaModal}
        onClose={() => setShowMetaModal(false)}
        onSave={handleSaveMeta}
        titulo="Nova Meta de Gastos"
        corBotao="#FF8300"
        campos={[{ id: 'meta', tipo: 'input', placeholder: metaGastos.toString() }]}
      />
    </ThemedView>
  );
}

import { StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 35,
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
    shadowColor: '#FF8300',
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
    color: '#FF8300',
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
  gastoItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#FF8300',
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
    marginLeft: 8, // espaço para ícone
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
