import FormularioFinanceiro from '@/components/FormularioFinanceiro';
import { ThemedView } from '@/components/ThemedView';
import { API_URL } from '@env';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';



export default function GanhosScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [ganhos, setGanhos] = useState<{ valor: string; categoria: string; data: Date }[]>([]);
  const [metaGanhos, setMetaGanhos] = useState<number>(0);

  // Animação do progresso
  const progressoAnim = useRef(new Animated.Value(0)).current;
  const totalGanhos = ganhos.reduce((acc, item) => acc + parseFloat(item.valor), 0);
  const progresso = metaGanhos > 0 ? (totalGanhos / metaGanhos) * 100 : 0;

  useEffect(() => {
    Animated.timing(progressoAnim, {
      toValue: Math.min(progresso, 100),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progresso]);

  useFocusEffect(
    useCallback(() => {
      const fetchGanhos = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
          const response = await axios.get(`${API_URL}/transacoes/todas?tipo=GANHO`, config);
          const dados = response.data.map((item: any) => ({
            id: item.id,
            valor: item.valor.toString(),
            categoria: item.descricao,
            data: new Date(item.data),
          }));
          console.log(dados);
          setGanhos(dados);
        } catch (error) {
          console.error('Erro ao buscar gastos:', error);
        }
      };

      fetchGanhos();
      fetchMetaGanhos();
    }, [])
  );

  const formatarParaBRL = (valor: number | string) => {
    const numero = typeof valor === 'string' ? parseFloat(valor) : valor;
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleSaveGanho = async (data: Record<string, any>) => {
    const { descricao, valor } = data;
    const valorNumerico = parseFloat(valor);

    if (!descricao || isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Informe uma descrição válida e um valor maior que zero.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const novoGanho = {
      descricao,
      valor: valorNumerico,
      tipo: 'GANHO',
      data: new Date().toISOString(),
    };

    try {
      await axios.post(`${API_URL}/transacoes`, novoGanho, config);
      setGanhos(prev => [
        {
          valor: valorNumerico.toString(),
          categoria: descricao,
          data: new Date(),
        },
        ...prev,
      ]);
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar ganho:', error);
      Alert.alert('Erro', 'Não foi possível salvar o ganho.');
    }
  };

  const fetchMetaGanhos = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    const response = await axios.get(`${API_URL}/usuarios/meta-ganhos`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Assume que o backend retorna um número ou string representando o valor
    const meta = typeof response.data === 'string' ? parseFloat(response.data) : response.data;
    
    if (!isNaN(meta)) {
      setMetaGanhos(meta);
    } else {
      setMetaGanhos(0);
    }
  } catch (error) {
    console.error('Erro ao carregar meta de ganhos:', error);
    setMetaGanhos(0);
  }
};

  const handleSaveMeta = async (dados: Record<string, string | number>) => {
    const valor = dados.meta;
    const parsedValue = typeof valor === 'string' ? parseFloat(valor) : valor;

    if (isNaN(parsedValue) || parsedValue < 0) {
    Alert.alert('Erro', 'Informe um valor de meta válido e maior ou igual a que zero.');
    return;
  }

  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    // Chamada PUT para atualizar a meta de ganhos
    await axios.put(
      `${API_URL}/usuarios/meta-ganhos`,
      parsedValue, // envia o valor no body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Atualiza o estado local
    setMetaGanhos(parsedValue);
    setShowMetaModal(false);
    Alert.alert('Sucesso', 'Meta de gastos atualizada com sucesso!');
    console.error('atualizar meta:');
  } catch (error) {
    console.error('Erro ao atualizar meta:', error);
    Alert.alert('Erro', 'Não foi possível atualizar a meta.');
  }
};

  const handleDeleteGanho = async (id: number, index: number) => {
  Alert.alert(
    'Remover ganho',
    'Tem certeza que deseja remover este ganho?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
              console.error('Token não encontrado');
              return;
            }

            // Chamada DELETE para o backend
            await axios.delete(`${API_URL}/transacoes/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            // Atualiza o estado local
            setGanhos(prev => prev.filter((_, i) => i !== index));
            console.log('Gasto deletado com sucesso');
          } catch (error) {
            console.error('Erro ao deletar gasto:', error);
            Alert.alert('Erro', 'Não foi possível deletar o gasto.');
          }
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
                onPress={() => handleDeleteGanho(item.id, index)}
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


