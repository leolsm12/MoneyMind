import { ThemedView } from '@/components/themed-view';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, Animated, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';

interface Transacao {
  id: number;
  valor: string;
  categoria: string;
  data: Date;
  tipo: 'GASTO' | 'GANHO';
}

export default function ResumoMensalScreen() {
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1);
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [showModal, setShowModal] = useState(false);

  const progressoAnim = useRef(new Animated.Value(0)).current;

  const API_URL = process.env.EXPO_PUBLIC_API_URL;


  const totalGastos = transacoes
    .filter(t => t.tipo === 'GASTO')
    .reduce((acc, item) => acc + parseFloat(item.valor), 0);

  const totalReceitas = transacoes
    .filter(t => t.tipo === 'GANHO')
    .reduce((acc, item) => acc + parseFloat(item.valor), 0);

  const saldo = totalReceitas - totalGastos;
  console.log('Saldo calculado:', saldo);
  console.log('Total Receitas:', totalReceitas);
  console.log('Total Gastos:', totalGastos);
  useFocusEffect(
    useCallback(() => {
      fetchTransacoes();
    }, [mesSelecionado, anoSelecionado])
  );

  const fetchTransacoes = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log(anoSelecionado, mesSelecionado);
    try {
      const response = await axios.get(`${API_URL}/transacoes/mensal?ano=${anoSelecionado}&mes=${mesSelecionado}`,config);      
      console.log('Transações recebidas:', response.data);
      const dados = response.data.transacoes.map((item: any) => ({
        id: item.id,
        valor: item.valor.toString(),
        categoria: item.descricao,
        data: new Date(item.data),
        tipo: item.tipo,
      }));

      setTransacoes(dados);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      Alert.alert('Erro', 'Não foi possível carregar as transações.');
    }
  };

  const formatarParaBRL = (valor: number | string) => {
    const numero = typeof valor === 'string' ? parseFloat(valor) : valor;
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getCategoriaIcon = (categoria: string) => {
    if (/supermercado|mercado/i.test(categoria)) return <Feather name="shopping-cart" size={24} color="#3D5A80" />;
    if (/transporte|uber|ônibus/i.test(categoria)) return <Feather name="truck" size={24} color="#3D5A80" />;
    if (/lazer|cinema|bar/i.test(categoria)) return <Feather name="smile" size={24} color="#3D5A80" />;
    if (/salário|emprego|salario/i.test(categoria)) return <Feather name="dollar-sign" size={24} color="#3D5A80" />;
    if (/freelance|autônomo/i.test(categoria)) return <Feather name="briefcase" size={24} color="#3D5A80" />;
    if (/outros|extra/i.test(categoria)) return <Feather name="plus" size={24} color="#3D5A80" />;   
    return <Feather name="star" size={24} color="#3D5A80" />;
  };
  
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Resumo Mensal</Text>
          <Text style={styles.subtitle}>Escolha o mês para visualizar</Text>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <MaterialIcons name="search" size={28} color="#3D5A80" />
        </TouchableOpacity>
      </View>

      {/* Picker de mês/ano */}
      <View style={styles.mesAnoContainer}>
        <TextInput
            style={styles.inputMesAno}
            placeholder="Mês (1-12)"
            keyboardType="numeric"
            value={mesSelecionado.toString()}
            onChangeText={(text) => setMesSelecionado(Number(text))}
        />
        <TextInput
            style={styles.inputMesAno}
            placeholder="Ano"
            keyboardType="numeric"
            value={anoSelecionado.toString()}
            onChangeText={(text) => setAnoSelecionado(Number(text))}
        />
        <TouchableOpacity
            style={styles.botaoBuscar}
            onPress={fetchTransacoes}
        >
            <Text style={styles.textoBotao}>Buscar</Text>
        </TouchableOpacity>
        </View>

      {/* Cards resumo */}
      <View style={styles.cardsRow}>
        <View style={[styles.card, styles.halfCard]}>
          <Text style={[styles.cardLabel, styles.halfCardLabel]}>Ganhos</Text>
          <Text style={[styles.cardValue, styles.halfCardValue, { color: '#28A745' }]}>{formatarParaBRL(totalReceitas)}</Text>
        </View>

        <View style={[styles.card, styles.halfCard]}>
          <Text style={[styles.cardLabel, styles.halfCardLabel]}>Gastos</Text>
          <Text style={[styles.cardValue, styles.halfCardValue, { color: '#E60000' }]}>{formatarParaBRL(totalGastos)}</Text>
        </View>
      </View>

      <View style={[styles.card, styles.saldoCard]}>
        <Text style={styles.cardLabel}>Saldo</Text>
        <Text style={[styles.cardValue, { color: saldo >= 0 ? '#3D5A80' : '#E60000' }]}>{formatarParaBRL(saldo)}</Text>
      </View>

      {/* Lista de transações */}
      <Text style={styles.sectionTitle}>Transações</Text>
      <FlatList
        data={transacoes}
        style={styles.lista}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma transação encontrada neste mês.</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <View style={styles.gastoItem}>
            <View style={styles.itemHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {getCategoriaIcon(item.categoria)}
                <Text style={styles.categoria}>{item.categoria}</Text>
              </View>
              <Text
                style={[
                  styles.valor,
                  { color: item.tipo === 'GASTO' ? '#E60000' : '#28A745' },
                ]}
              >
                {formatarParaBRL(item.valor)}
              </Text>
            </View>
            <Text style={styles.data}>
              {item.data.toLocaleDateString()} - {item.data.toLocaleTimeString()}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ThemedView>
  );
}
