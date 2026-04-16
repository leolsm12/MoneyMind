import { ThemedView } from '@/components/themed-view';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';


export default function PerfilScreen() {
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [email, setEmail] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [salario, setSalario] = useState<number>(0);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const buscarUsuario = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('Token:', token);
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/usuarios/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usuario = response.data;
      setUsuarioId(usuario.id);
      setNome(usuario.nome || '');
      setNovoNome(usuario.nome || '');
      setEmail(usuario.email || '');
      setNovoEmail(usuario.email || '');
      setTelefone(usuario.telefone || '');
      setNovoTelefone(usuario.telefone || '');
      setSalario(usuario.salario || 0);

      const uriSalva = await AsyncStorage.getItem('fotoPerfil');
      if (uriSalva) setImagemUri(uriSalva);
    } catch (error) {
      console.log('Erro ao buscar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  buscarUsuario();
}, []);

  // 🔹 NOVA FUNÇÃO: Enviar a foto direto pro Java
  const enviarFotoParaAPI = async (uri: string) => {
    if (!usuarioId) {
      Alert.alert('Erro', 'Usuário não identificado.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      name: 'foto_perfil.jpg',
      type: 'image/jpeg',
    } as any); // "as any" evita alertas chatos do TypeScript no FormData do React Native

    try {
      console.log('Enviando foto para a API...');
      
      // Mantivemos o fetch puro aqui porque ele lida melhor com FormData no React Native do que o Axios
      const response = await fetch(`${API_URL}/usuarios/${usuarioId}/foto`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      const responseText = await response.text();

      if (response.ok) {
        Alert.alert('Sucesso!', 'Sua foto de perfil foi atualizada.');
      } else {
        Alert.alert('Erro no Upload', responseText);
      }
    } catch (error) {
      console.error('Erro ao enviar foto:', error);
      Alert.alert('Erro de Conexão', 'Não foi possível enviar a foto para o servidor.');
    }
  };

  // 🔹 Escolher nova imagem (Atualizado)
  const escolherImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // Atualizado para a versão mais nova do Expo
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8, // 0.8 é um ótimo equilíbrio entre qualidade e velocidade de upload
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      
      // 1. Atualiza a tela instantaneamente
      setImagemUri(uri);
      
      // 2. Salva localmente como backup
      await AsyncStorage.setItem('fotoPerfil', uri);
      
      // 3. Dispara a requisição pro back-end na mesma hora!
      enviarFotoParaAPI(uri);
    }
  };

  // 🔹 Salvar edição no backend
const salvarEdicao = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      // Atualiza a tela para loading ou pelo menos avisa que tá indo
      console.log('Enviando dados para a API...');

      const response = await axios.put(
        `${API_URL}/usuarios/${usuarioId}`,
        {
          nome: novoNome,
          email: novoEmail,
          telefone: novoTelefone,
          salario: salario
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Resposta da API ao salvar:', response.data);

      // Atualiza os estados oficiais da tela com o que você digitou
      // (Fazemos isso caso a sua API não devolva o objeto do usuário na resposta)
      setNome(novoNome);
      setEmail(novoEmail);
      setTelefone(novoTelefone);

      setEditando(false);
      Alert.alert('Sucesso!', 'Seu perfil foi atualizado.');

    } catch (error: any) {
      console.log('Erro ao atualizar usuário:', error.response?.data || error.message);
      
      // Agora o app vai esfregar o erro na sua cara pra gente debugar kkkk
      Alert.alert(
        'Ops! Falha ao salvar', 
        `Erro: ${error.response?.status || 'Desconhecido'} - Verifique o console.`
      );
    }
  };

  if (loading) {
    return null;
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/login');
}

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Perfil</Text>
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons name="logout" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.fotoContainer}>
          <Image
            source={
              imagemUri
                ? { uri: imagemUri }
                : require('../../../assets/images/avatars/avatar1.jpg')
            }
            style={styles.foto}
          />
          {editando && (
            <TouchableOpacity style={styles.botaoAdicionar} onPress={escolherImagem}>
              <Ionicons name="camera" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoContainer}>
          {!editando ? (
            <>
              <Text style={styles.nome}>{nome || 'Usuário sem nome'}</Text>
              <View style={styles.infoRow}>
                <MaterialIcons name="email" size={20} color="#3D5A80" />
                <Text style={styles.infoText}>{email || 'Email não informado'}</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialIcons name="phone" size={20} color="#3D5A80" />
                <Text style={styles.infoText}>
                  {telefone ? telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1)$2 $3-$4') : 'Telefone não informado'}
                  </Text>
              </View>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                placeholderTextColor="#98C1D9"
                value={novoNome}
                onChangeText={setNovoNome}
                maxLength={30}
                autoFocus
              />
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                placeholderTextColor="#98C1D9"
                value={novoEmail}
                onChangeText={setNovoEmail}
                keyboardType="email-address"
                maxLength={40}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite seu telefone"
                placeholderTextColor="#98C1D9"
                value={novoTelefone}
                onChangeText={setNovoTelefone}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </>
          )}

          <TouchableOpacity
            style={[styles.botaoEditar, editando && styles.botaoSalvar]}
            onPress={() => {
              if (editando) {
                salvarEdicao();
              } else {
                setNovoNome(nome);
                setNovoEmail(email);
                setNovoTelefone(telefone);
                setEditando(true);
              }
            }}
          >
            <Text style={styles.textoBotao}>{editando ? 'Salvar alterações' : 'Editar perfil'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.extraContainer}>
          <TouchableOpacity style={styles.extraItem}>
            <Ionicons name="lock-closed" size={22} color="#3D5A80" />
            <Text style={styles.extraText}>Alterar senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraItem}>
            <Ionicons name="help-circle" size={22} color="#3D5A80" />
            <Text style={styles.extraText}>Ajuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraItem}>
            <Ionicons name="settings" size={22} color="#3D5A80" />
            <Text style={styles.extraText}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}


