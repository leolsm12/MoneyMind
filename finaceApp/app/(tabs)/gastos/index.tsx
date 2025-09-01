import FormularioFinanceiro from '@/components/FormularioFinanceiro';
import { ThemedView } from '@/components/ThemedView';
import { API_URL } from '@env';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';

export default function GastosScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [gastos, setGastos] = useState<{ valor: string; categoria: string; data: Date }[]>([]);
  const [metaGastos, setMetaGastos] = useState<number>(0);

  const progressoAnim = useRef(new Animated.Value(0)).current;
  const totalGastos = gastos.reduce((acc, item) => acc + parseFloat(item.valor), 0);
  const progresso = metaGastos > 0 ? (totalGastos / metaGastos) * 100 : 0;

  useEffect(() => {
    Animated.timing(progressoAnim, {
      toValue: Math.min(progresso, 100),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progresso]); 

  useFocusEffect(
    useCallback(() => {
      const fetchGastos = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
          const response = await axios.get(`${API_URL}/transacoes/todas?tipo=GASTO`, config);
          console.log(response.data);
          const dados = response.data.map((item: any) => ({
            id: item.id,
            valor: item.valor.toString(),
            categoria: item.descricao,
            data: new Date(item.data),
          }));
          console.log(dados);
          setGastos(dados);
        } catch (error) {
          console.error('Erro ao buscar gastos:', error);
        }
      };

      fetchGastos();
      fetchMetaGastos();
    }, [])
  );

  const formatarParaBRL = (valor: number | string) => {
    const numero = typeof valor === 'string' ? parseFloat(valor) : valor;
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleSaveGasto = async (data: Record<string, any>) => {
    const { descricao, valor } = data;
    const valorNumerico = parseFloat(valor);

    if (!descricao || isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Informe uma descrição válida e um valor maior que zero.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const novoGasto = {
      descricao,
      valor: valorNumerico,
      tipo: 'GASTO',
      data: new Date().toISOString(),
    };

    try {
      await axios.post(`${API_URL}/transacoes`, novoGasto, config);
      setGastos(prev => [
        {
          valor: valorNumerico.toString(),
          categoria: descricao,
          data: new Date(),
        },
        ...prev,
      ]);
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar gasto:', error);
      Alert.alert('Erro', 'Não foi possível salvar o gasto.');
    }
  };

  const fetchMetaGastos = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    const response = await axios.get(`${API_URL}/usuarios/meta-gastos`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Assume que o backend retorna um número ou string representando o valor
    const meta = typeof response.data === 'string' ? parseFloat(response.data) : response.data;
    
    if (!isNaN(meta)) {
      setMetaGastos(meta);
    } else {
      setMetaGastos(0);
    }
  } catch (error) {
    console.error('Erro ao carregar meta de gastos:', error);
    setMetaGastos(0);
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

    // Chamada PUT para atualizar a meta de gastos
    await axios.put(
      `${API_URL}/usuarios/meta-gastos`,
      parsedValue, // envia o valor no body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Atualiza o estado local
    setMetaGastos(parsedValue);
    setShowMetaModal(false);
    Alert.alert('Sucesso', 'Meta de gastos atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar meta:', error);
    Alert.alert('Erro', 'Não foi possível atualizar a meta.');
  }
};


  const handleDeleteGasto = async (id: number, index: number) => {
  Alert.alert(
    'Remover gasto',
    'Tem certeza que deseja remover este gasto?',
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
            setGastos(prev => prev.filter((_, i) => i !== index));
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
        <TouchableOpacity onPress={() => setShowMetaModal(true)} accessibilityLabel="Editar meta de gastos">
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
        <Text
          style={[
            styles.progressText,
            progresso >= 100 && { color: '#E60000', fontWeight: 'bold' },
          ]}
        >
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
                onPress={() => handleDeleteGasto(item.id, index)}
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




