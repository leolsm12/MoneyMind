import FormularioFinanceiro from '@/components/FormularioFinanceiro';
import { ThemedView } from '@/components/ThemedView';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

export default function GastosScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [gastos, setGastos] = useState<{ valor: string; categoria: string; data: Date }[]>([]);
  const [metaGastos, setMetaGastos] = useState(3000);

  const totalGastos = gastos.reduce((acc, item) => acc + parseFloat(item.valor), 0);
  const progresso = (totalGastos / metaGastos) * 100;

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

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gastos Totais</Text>
        <TouchableOpacity onPress={() => setShowMetaModal(true)}>
          {/* Ícone de editar meta */}
          <MaterialIcons name="edit" size={22} color="#FED766" />
        </TouchableOpacity>
      </View>

      <Text style={styles.totalValue}>{formatarParaBRL(totalGastos)}</Text>

      <Text style={styles.metaLabel}>Meta: {formatarParaBRL(metaGastos)}</Text>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progress,
            { width: `${Math.min(progresso, 100)}%`, backgroundColor: progresso >= 100 ? '#e74c3c' : '#FED766' },
          ]}
        />
      </View>
      <Text style={styles.progressText}>Progresso: {progresso.toFixed(1)}%</Text>

      <FlatList
        data={gastos}
        style={styles.lista}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum gasto registrado ainda.</Text>}
        renderItem={({ item }) => (
          <View style={styles.gastoItem}>
            <View style={styles.itemHeader}>
              <Text style={styles.categoria}>{item.categoria}</Text>
              <Text style={styles.valor}>{formatarParaBRL(item.valor)}</Text>
            </View>
            <Text style={styles.data}>
              {item.data.toLocaleDateString()} - {item.data.toLocaleTimeString()}
            </Text>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <AntDesign name="pluscircle" size={50} color="#EE6C4D" />
      </TouchableOpacity>

      <FormularioFinanceiro
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveGasto}
        titulo="Registrar novo gasto"
        corBotao="#FED766"
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
        corBotao="#FED766"
        campos={[{ id: 'meta', tipo: 'input', placeholder: metaGastos.toString() }]}
      />
    </ThemedView>
  );
}
