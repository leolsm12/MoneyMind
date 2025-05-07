import CustomButton from '@/components/CustomButton'; // Importe o botão
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function GanhosScreen() {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Comprar Agora"
        color="#3498db" // Cor azul
        onPress={() => alert('Compra realizada!')}
      />
      <CustomButton
        title="Sair"
        color="#e74c3c" // Cor vermelha
        onPress={() => alert('Saindo...')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});






