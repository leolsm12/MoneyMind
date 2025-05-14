import BarChartResumoSimples from '@/components/BarChartResumoSimples';
import FormularioFinanceiro from '@/components/FormularioFinanceiro';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './_Ganhos_style';

export default function GanhosScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [ganhos, setGanhos] = useState<{ valor: string; categoria: string; data: Date }[]>([]);
  const [metaGanhos, setMetaGanhos] = useState(5000);
  const [novoValorMeta, setNovoValorMeta] = useState(metaGanhos.toString());

  const totalGanhos = ganhos.reduce((acc, item) => acc + parseFloat(item.valor), 0);
  const progresso = (totalGanhos / metaGanhos) * 100;

  const handleSaveGanho = (data: Record<string, any>) => {
    if (typeof data.descricao === 'string' && typeof data.valor === 'number') {
      const ganho = {
        valor: data.valor.toString(),
        categoria: data.descricao,
        data: new Date(),
      };
      setGanhos([...ganhos, ganho]);
      console.log('Ganho adicionado:', ganho);
    }
    setShowModal(false);
  };

  const handleSaveMeta = (dados: Record<string, string | number>) => {
    const valor = dados.meta;
    const parsedValue = typeof valor === 'string' ? parseFloat(valor) : valor;
  
    if (!isNaN(parsedValue)) {
      setMetaGanhos(parsedValue);
      console.log('Meta de ganhos atualizada:', parsedValue);
    }
  
    setShowMetaModal(false);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total de Ganhos</Text>

      <BarChartResumoSimples ganhos={totalGanhos} gastos={0} />

      <View style={styles.progressoContainer}>
        <Text style={styles.progressoText}>Meta de Ganhos</Text>
        <TouchableOpacity onPress={() => setShowMetaModal(true)}>
          <Text style={styles.metaValue}>R$ {metaGanhos}</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              { width: `${progresso}%`, backgroundColor: progresso >= 100 ? '#2ecc71' : '#f39c12' },
            ]}
          />
        </View>
        <Text style={styles.progressoText}>Progresso: {progresso.toFixed(2)}%</Text>
      </View>

       {/* Lista de Ganhos Cadastrados */}     
      <FlatList
        data={ganhos}
        renderItem={({ item }) => (
          <View style={styles.ganhoItem}>
            <Text>{item.categoria} - R$ {item.valor}</Text>
            <Text>{item.data.toLocaleDateString()} - {item.data.toLocaleTimeString()}</Text>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Formulário reutilizável */}
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

      {/* Modal de Meta */}
      <FormularioFinanceiro
        visible={showMetaModal}
        onClose={() => setShowMetaModal(false)}
        onSave={handleSaveMeta}
        titulo="Nova Meta de Ganhos"
        corBotao="#009FB7"
        campos={[
          { id: 'meta', tipo: 'input', placeholder: metaGanhos.toString() },
        ]}
      />
    </View>
  );
}
