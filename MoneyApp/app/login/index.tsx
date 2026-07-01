import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/usuarios/login`, {
        email,
        senha,
      });
      await AsyncStorage.setItem('token', response.data.token);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      if (error.response) {
        alert('Email ou senha inválidos.');
      } else {
        alert('Não foi possível conectar ao servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1B3A4B', '#4ECDC4']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.card}>

        <Text style={styles.logo}>💰 MoneyMind</Text>
        <Text style={styles.subtitle}>Sua vida financeira inteligente</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#8A9BB0" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            placeholderTextColor="#8A9BB0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#8A9BB0" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#8A9BB0"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
            <Ionicons
              name={senhaVisivel ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#8A9BB0"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/recover')}>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>Entrar</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.registerText}>Não tem uma conta? <Text style={styles.registerLink}>Cadastre-se</Text></Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}