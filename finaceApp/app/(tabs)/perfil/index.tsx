import { ThemedView } from '@/components/ThemedView';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PerfilScreen() {
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [email, setEmail] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');

  useEffect(() => {
    (async () => {
      const uriSalva = await AsyncStorage.getItem('fotoPerfil');
      const nomeSalvo = await AsyncStorage.getItem('nomeUsuario');
      const emailSalvo = await AsyncStorage.getItem('emailUsuario');
      const telefoneSalvo = await AsyncStorage.getItem('telefoneUsuario');
      if (uriSalva) setImagemUri(uriSalva);
      if (nomeSalvo) setNome(nomeSalvo);
      if (emailSalvo) setEmail(emailSalvo);
      if (telefoneSalvo) setTelefone(telefoneSalvo);
    })();
  }, []);

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

  const salvarEdicao = async () => {
    if (novoNome.trim() === '') return;
    setNome(novoNome);
    await AsyncStorage.setItem('nomeUsuario', novoNome);

    setEmail(novoEmail);
    await AsyncStorage.setItem('emailUsuario', novoEmail);

    setTelefone(novoTelefone);
    await AsyncStorage.setItem('telefoneUsuario', novoTelefone);

    setEditando(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Perfil</Text>
          <TouchableOpacity onPress={() => router.replace('/login')}>
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

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF6F00',
    padding: 16,
    borderRadius: 16,
    marginTop: 15,
    marginBottom: 25,
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  fotoContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  foto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#FF6F00',
    backgroundColor: '#fff',
  },
  botaoAdicionar: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#FF6F00',
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
  },
  input: {
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D9E6F2',
    color: '#222',
  },
  botaoEditar: {
    backgroundColor: '#FF6F00',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoSalvar: {
    backgroundColor: '#009EE2',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  extraContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  extraText: {
    fontSize: 16,
    color: '#FF6F00',
    fontWeight: '500',
  },
});
