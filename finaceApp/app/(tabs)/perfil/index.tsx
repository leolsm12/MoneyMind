import { ThemedView } from '@/components/ThemedView';
import { API_URL } from '@env';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './_styles';


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
      setNome(usuario.nome || '');
      setNovoNome(usuario.nome || '');
      setEmail(usuario.email || '');
      setNovoEmail(usuario.email || '');
      setTelefone(usuario.telefone || '');
      setNovoTelefone(usuario.telefone || '');

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

  // 🔹 Escolher nova imagem
  const escolherImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImagemUri(uri);
      await AsyncStorage.setItem('fotoPerfil', uri);
    }
  };

  // 🔹 Salvar edição no backend
  const salvarEdicao = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.put(
        `${API_URL}/usuarios/me`,
        {
          nome: novoNome,
          email: novoEmail,
          telefone: novoTelefone,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const usuarioAtualizado = response.data;
      setNome(usuarioAtualizado.nome);
      setEmail(usuarioAtualizado.email);
      setTelefone(usuarioAtualizado.telefone);

      setEditando(false);
    } catch (error) {
      console.log('Erro ao atualizar usuário:', error);
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
                <MaterialIcons name="email" size={20} color="#FF6F00" />
                <Text style={styles.infoText}>{email || 'Email não informado'}</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialIcons name="phone" size={20} color="#FF6F00" />
                <Text style={styles.infoText}>{telefone || 'Telefone não informado'}</Text>
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
            <Ionicons name="lock-closed" size={22} color="#FF6F00" />
            <Text style={styles.extraText}>Alterar senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraItem}>
            <Ionicons name="help-circle" size={22} color="#FF6F00" />
            <Text style={styles.extraText}>Ajuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraItem}>
            <Ionicons name="settings" size={22} color="#FF6F00" />
            <Text style={styles.extraText}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}


