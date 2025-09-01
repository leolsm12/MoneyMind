import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/usuarios/login`, {
        email,
        senha,
      });

      console.log('Login bem-sucedido:', response.data);

      // Aqui no futuro você guarda o token no AsyncStorage
      await AsyncStorage.setItem('token', response.data.token);

      router.replace('/(tabs)/home');
    } catch (error: any) {
      console.log('Erro ao logar:', error.response?.data || error.message);
      alert('Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#98c1d9', '#293241']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/MoneyMindLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.inputContainer}>
          <Icon name="mail" size={20} color="#293241" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#293241" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            value={senha}
            onChangeText={setSenha}
            keyboardType="numeric"
            secureTextEntry={!senhaVisivel}
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
            <Icon
              name={senhaVisivel ? 'eye' : 'eye-off'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {router.push('/recover');}}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => { router.push('/register'); }}
        >
          <Text style={styles.buttonRegisterText}>
          Não tem uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}


