import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';
import modernStyles from './style';

type Transacao = {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'GANHO' | 'GASTO';
};


export default function HomeScreen() {
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [ganhos, setGanhos] = useState<number | null>(null);
  const [gastos, setGastos] = useState<number | null>(null);
  const [transacoesRecentes, setTransacoesRecentes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
 

  const saldo = ganhos !== null && gastos !== null ? ganhos - gastos : 0;
  useFocusEffect(
    useCallback(() => {
      const fetchDados = async () => {
      try {
      const saldoData = await fetchSaldo();
        if (saldoData) {
          setGanhos(saldoData.ganhos);
          setGastos(saldoData.gastos);
        } else {
          setGanhos(0);
          setGastos(0);
        }

        const transacoes = await fetchTransacoesRecentes();
        setTransacoesRecentes(transacoes);

        const nome = await fetchNomeUsuario();
        setNomeUsuario(nome);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [])
);

  const fetchNomeUsuario = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return null;

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const response = await axios.get(`${API_URL}/usuarios/me`, config);
      const nomeCompleto = response.data.nome;
      const primeiroNome = nomeCompleto.split(' ')[0]; // pega só o primeiro nome
      return primeiroNome;
    } catch (error) {
      console.error('Erro ao buscar nome do usuário:', error);
      return null;
    }
  };


  const fetchSaldo = async () => {
    const token = await AsyncStorage.getItem('token');

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const ganhosResponse = await axios.get(`${API_URL}/transacoes/total?tipo=GANHO`, config);
    const gastosResponse = await axios.get(`${API_URL}/transacoes/total?tipo=GASTO`, config);

    console.log('Ganhos response:', ganhosResponse.data);
    console.log('Gastos response:', gastosResponse.data); 

    return {
      ganhos: ganhosResponse.data ?? 0,
      gastos: gastosResponse.data ?? 0,
      
    };
    
  };

  const fetchTransacoesRecentes = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) return [];

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const response = await axios.get(`${API_URL}/transacoes/recentes`, config);
  return response.data; // array de transações
  };





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
          <ThemedText style={modernStyles.greeting}>Olá, {nomeUsuario ?? 'usuário'} !</ThemedText>
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
          renderItem={({ item }) => {
            const isGasto = item.tipo === 'GASTO';
            const sinal = isGasto ? '-' : '+';
            const cor = isGasto ? modernStyles.valorGasto : modernStyles.valorGanho;

            return (
              <View style={modernStyles.transacaoItem}>
                <ThemedText style={modernStyles.transacaoDescricao}>{item.descricao}</ThemedText>
                <ThemedText style={[modernStyles.transacaoValor, cor]}>
                  {sinal} {Math.abs(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </ThemedText>
              </View>
            );
          }}
        />
      </View>

      {/* Botão de ação moderno */}
      <TouchableOpacity style={modernStyles.actionButton} activeOpacity={0.8}>
        <ThemedText style={modernStyles.actionButtonText}>Nova Transação</ThemedText>
      </TouchableOpacity>
    </LinearGradient>
  );
}


