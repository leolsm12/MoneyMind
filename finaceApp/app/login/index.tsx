import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Expo já tem esse pacote
import styles from './style';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // Lógica real vai depois
    router.replace('/(tabs)/home');
  };

  return (
  <View style={styles.container}>
    {/* Container do logo */}
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/images/MoneyMindLogo.png')} // ajuste o caminho se necessário
        style={styles.logo}
        resizeMode="contain"
      />
    </View>

    {/* Container dos campos de login */}
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.senhaContainer}>
        <TextInput
          style={styles.inputSenha}
          placeholder="Senha"
          placeholderTextColor="#999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!senhaVisivel}
        />
        <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
          <Icon
            name={senhaVisivel ? 'eye' : 'eye-off'}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

}

