import FormularioFinanceiro from '@/components/FormularioFinanceiro';
import { ThemedView } from '@/components/ThemedView';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

export default function GanhosScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [ganhos, setGanhos] = useState<{ valor: string; categoria: string; data: Date }[]>([]);
  const [metaGanhos, setMetaGanhos] = useState(5000);

  const totalGanhos = ganhos.reduce((acc, item) => acc + parseFloat(item.valor), 0);
  const progresso = (totalGanhos / metaGanhos) * 100;

  const handleSaveGanho = (data: Record<string, any>) => {
    if (typeof data.descricao === 'string' && typeof data.valor === 'number') {
      const ganho = {
        valor: data.valor.toString(),
        categoria: data.descricao,
        data: new Date(),
      };
      setGanhos([ganho, ...ganhos]); // mais recente primeiro
    }
    setShowModal(false);
  };

  const handleSaveMeta = (dados: Record<string, string | number>) => {
    const valor = dados.meta;
    const parsedValue = typeof valor === 'string' ? parseFloat(valor) : valor;
    if (!isNaN(parsedValue)) {
      setMetaGanhos(parsedValue);
    }
    setShowMetaModal(false);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ganhos Totais</Text>
        <TouchableOpacity onPress={() => setShowMetaModal(true)}>
          <MaterialIcons name="edit" size={22} color="#FED766" />
        </TouchableOpacity>
      </View>

      <Text style={styles.totalValue}>
        {totalGanhos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Text>

      <Text style={styles.metaLabel}>Meta: {metaGanhos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progress,
            { width: `${Math.min(progresso, 100)}%`, backgroundColor: progresso >= 100 ? '#2ecc71' : '#009FB7' },
          ]}
        />
      </View>
      <Text style={styles.progressText}>Progresso: {progresso.toFixed(1)}%</Text>

      <FlatList
        data={ganhos}
        style={styles.lista}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum ganho registrado ainda.</Text>}
        renderItem={({ item }) => (
          <View style={styles.ganhoItem}>
            <View style={styles.itemHeader}>
              <Text style={styles.categoria}>{item.categoria}</Text>
              <Text style={styles.valor}>
                {Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Text>
            </View>
            <Text style={styles.data}>
              {item.data.toLocaleDateString()} - {item.data.toLocaleTimeString()}
            </Text>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <AntDesign name="pluscircle" size={50} color="#009FB7" />
      </TouchableOpacity>

      <FormularioFinanceiro
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveGanho}
        titulo="Registrar novo ganho"
        corBotao="#009FB7"
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
        corBotao="#009FB7"
        campos={[{ id: 'meta', tipo: 'input', placeholder: metaGanhos.toString() }]}
      />
    </ThemedView>
  );
}
