
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './_Perfil_style';


export default function PerfilScreen (){
  const router = useRouter();


  const nome = "João da Silva";
  const email = "joao@email.com";

  const handleLogout = () => {
    router.replace('/Login/Login_Index');
     // Chame a função para atualizar o estado de login
  };

  const handleEditar = () => {
    Alert.alert("Editar Perfil", "Funcionalidade em desenvolvimento.");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/MoneyMindIcone.png')} // substitua por um ícone ou URL se tiver
        style={styles.avatar}
      />
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.email}>{email}</Text>

      <TouchableOpacity style={styles.botao} onPress={handleEditar}>
        <Text style={styles.textoBotao}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, styles.sair]} onPress={handleLogout}>
        <Text style={styles.textoBotao}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};




