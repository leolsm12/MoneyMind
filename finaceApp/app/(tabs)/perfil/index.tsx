import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './_styles';

export default function PerfilScreen() {
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState('');
  const [novoNome, setNovoNome] = useState('');

  useEffect(() => {
    (async () => {
      const uriSalva = await AsyncStorage.getItem('fotoPerfil');
      const nomeSalvo = await AsyncStorage.getItem('nomeUsuario');
      if (uriSalva) setImagemUri(uriSalva);
      if (nomeSalvo) setNome(nomeSalvo);
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
    if (novoNome.trim() === '') return; // evita salvar nome vazio
    setNome(novoNome);
    await AsyncStorage.setItem('nomeUsuario', novoNome);
    setEditando(false);
  };

  return (
    <ThemedView style={styles.container}>
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
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {!editando ? (
        <Text style={styles.nome}>{nome || 'Usuário sem nome'}</Text>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#98C1D9"
          value={novoNome}
          onChangeText={setNovoNome}
          maxLength={30}
          autoFocus
        />
      )}

      <TouchableOpacity
        style={[styles.botaoEditar, editando && styles.botaoSalvar]}
        onPress={() => {
          if (editando) {
            salvarEdicao();
          } else {
            setNovoNome(nome);
            setEditando(true);
          }
        }}
      >
        <Text style={styles.textoBotao}>{editando ? 'Salvar alterações' : 'Editar perfil'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSair}
        onPress={() => {
          router.replace('/login');
        }}
      >
        <Text style={styles.textoBotao}>Sair</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}
