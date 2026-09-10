import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '@/styles/login';

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

      // 1. Dispara o POST para o Spring Boot
       const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/usuarios/login`, {
        email,
        senha,
      });
      // 2. Salva o Token JWT no armazenamento do celular
      await AsyncStorage.setItem('token', response.data.token); 

      // 3. (Opcional) Salva os dados do usuário para usarmos na Home e no Perfil
      await AsyncStorage.setItem('usuario', JSON.stringify(response.data.usuario));

      // 4. Redireciona para o fluxo autenticado
      router.replace('/(tabs)/home');
    
    } catch (error: any) {
      // Imprime o erro detalhado no terminal do Expo para vermos
      console.log('STATUS DO ERRO:', error.response?.status);
      console.log('DADOS DO ERRO:', error.response?.data);
      console.log('MENSAGEM:', error.message);

      // Pega a mensagem de erro que o GlobalExceptionHandler do Spring enviou
      const mensagemBackend = error.response?.data?.erro;

      if (mensagemBackend) {
        alert(mensagemBackend);
      } else if (error.response) {
        alert('Não foi possível conectar ao servidor.');
      }else {
        alert('Não foi possível conectar ao servidor. Verifique se o backend está rodando e o IP do .env.');
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
        <Image
          source={require('@/assets/MoneyLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
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