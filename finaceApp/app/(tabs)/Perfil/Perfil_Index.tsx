import { Ionicons } from '@expo/vector-icons'; // Ícone de '+'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './_Perfil_style'; // Importando o arquivo de estilos

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
    setNome(novoNome);
    await AsyncStorage.setItem('nomeUsuario', novoNome);
    setEditando(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fotoContainer}>
        <Image
          source={
            imagemUri
              ? { uri: imagemUri }
              : require('../../../assets/images/avatars/avatar1.jpg') // imagem padrão
          }
          style={styles.foto}
        />
        {editando && (
          <TouchableOpacity style={styles.botaoAdicionar} onPress={escolherImagem}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {!editando ? (
        <Text style={styles.nome}>{nome || 'Usuário sem nome'}</Text>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={novoNome}
          onChangeText={setNovoNome}
        />
      )}

      <TouchableOpacity
        style={styles.botaoEditar}
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
    </View>
  );
}
