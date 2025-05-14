import BarChartResumoSimples from '@/components/BarChartResumoSimples'; // Importando o gráfico de resumo
import CustomButton from '@/components/CustomButton'; // Importando o botão customizado
import FormularioFinanceiro from '@/components/FormularioFinanceiro'; // Importando o FormulárioFinanceiro
import React, { useState } from 'react';
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './_Gastos_style'; // Importando o estilo

export default function GastosScreen() {
  const [showOptions, setShowOptions] = useState(false); // Para controlar a visibilidade do modal de opções
  const [showModal, setShowModal] = useState(false); // Para controlar a visibilidade do modal de adicionar gasto
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [gastos, setGastos] = useState<{ valor: string; categoria: string; data: Date }[]>([]); // Para armazenar os gastos cadastrados
  const [metaGastos, setMetaGastos] = useState(3000); // Meta de gastos inicial
  const [novoValorMeta, setNovoValorMeta] = useState(metaGastos.toString()); // Novo valor da meta de gastos

  // Calcular o total de gastos
  const totalGastos = gastos.reduce((acc, item) => acc + parseFloat(item.valor), 0);
  const progresso = (totalGastos / metaGastos) * 100;

  // Função de adicionar gasto manual
  const handleSaveGasto = (data: Record<string, any>) => {
    if (typeof data.descricao === 'string' && typeof data.valor === 'number') {
      const Gasto = {
        valor: data.valor.toString(),
        categoria: data.descricao,
        data: new Date(),
      };
      setGastos([...gastos, Gasto]);
    } else {
      Alert.alert('Erro', 'Dados inválidos fornecidos.');
    }
    setShowModal(false); // Fechar o modal
    setShowOptions(false);
  };

  // Função de lidar com a opção de escanear QR Code
  const handleQRCode = () => {
    setShowOptions(false);
    Alert.alert('Em breve', 'Função de escanear QR Code será implementada.');
  };

  // Função de salvar a meta de gastos
  const handleSaveMeta = () => {
    const parsedValue = parseFloat(novoValorMeta);
    if (!isNaN(parsedValue)) {
      setMetaGastos(parsedValue);
    }
    setShowMetaModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total de Gastos</Text>

      {/* Gráfico de Barra com Gastos */}
      <BarChartResumoSimples ganhos={0} gastos={totalGastos} />

      {/* Barra de Progresso com a Meta */}
      <View style={styles.progressoContainer}>
        <Text style={styles.progressoText}>Meta de Gastos</Text>
        <TouchableOpacity onPress={() => setShowMetaModal(true)}>
          <Text style={styles.metaValue}>R$ {metaGastos}</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View
            style={[styles.progress, { width: `${progresso}%`, backgroundColor: progresso >= 100 ? '#2ecc71' : '#f39c12' }]}
          />
        </View>
        <Text style={styles.progressoText}>Progresso: {progresso.toFixed(2)}%</Text>
      </View>

      {/* Lista de Gastos Cadastrados */}
      <FlatList
        data={gastos}
        renderItem={({ item }) => (
          <View style={styles.gastoItem}>
            <Text>{item.categoria} - R$ {item.valor}</Text>
            <Text>{item.data.toLocaleDateString()} - {item.data.toLocaleTimeString()}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Botão para Adicionar Gasto */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowOptions(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal de Opções - Escanear QR Code ou Adicionar Manualmente */}
      <FormularioFinanceiro
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        onSave={(dados) => console.log(dados)}
        titulo="Registrar Transação"
        corBotao="#009FB7"
        campos={[
          {
            id: 'QRCode',
            tipo: 'button',
            textoBotao: 'Escanear QR Code',
            onPress: () =>  handleQRCode(),
          },
          {
            id: 'Manual',
            tipo: 'button',
            textoBotao: 'Adicionar Manualmente',
            onPress: () => setShowModal(true),
          },
        ]}
      />

      {/* Modal para Adicionar Gasto com o FormulárioFinanceiro */}
          {/* Usando o componente FormularioFinanceiro */}
          <FormularioFinanceiro
            visible={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleSaveGasto}
            titulo="Registrar Novo Gasto"
            corBotao="#009FB7"
            campos={[
              { id: 'descricao', tipo: 'input', placeholder: 'Descrição' },
              { id: 'valor', tipo: 'input', placeholder: 'Valor (R$)' },
            ]}   
         />

      {/* Modal de Meta */}
      <Modal visible={showMetaModal} animationType="slide" onRequestClose={() => setShowMetaModal(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Defina sua Meta de Gastos</Text>
          <TextInput
            style={styles.input}
            placeholder="Meta de Ganhos"
            keyboardType="numeric"
            value={novoValorMeta}
            onChangeText={setNovoValorMeta}
          />
          <View style={styles.buttonContainer}>
            <CustomButton title="Cancelar" color="#e74c3c" onPress={() => setShowMetaModal(false)} />
            <CustomButton title="Salvar" color="#2ecc71" onPress={handleSaveMeta} />
          </View>
        </View>
      </Modal>
    </View>
  );

  
}
