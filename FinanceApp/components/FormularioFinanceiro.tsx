import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Campo {
  id: string;
  tipo: 'input' | 'button';
  placeholder?: string;
  textoBotao?: string;
  onPress?: () => void;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Record<string, string | number>) => void;
  titulo: string;
  corBotao: string;
  campos: Campo[];
}

const FormularioFinanceiro: React.FC<Props> = ({
  visible,
  onClose,
  onSave,
  titulo,
  corBotao,
  campos,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSalvar = () => {
    const dataFinal: Record<string, string | number> = {};
    let camposInvalidos: string[] = [];

    campos.forEach(campo => {
      const valor = formData[campo.id];
      if (campo.tipo === 'input') {
        if (!valor) {
          camposInvalidos.push(campo.placeholder || campo.id);
          return;
        }
        const parsed = parseFloat(valor.replace(',', '.'));
        dataFinal[campo.id] = isNaN(parsed) ? valor : parsed;
      }
    });

    if (camposInvalidos.length > 0) {
      Alert.alert('Campos obrigatórios', `Preencha: ${camposInvalidos.join(', ')}`);
      return;
    }

    onSave(dataFinal);
    setFormData({});
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onClose} style={styles.fechar}>
            <Icon name="close" size={24} color="#696773" />
          </TouchableOpacity>

          <Text style={styles.titulo}>{titulo}</Text>

          {campos.map((campo) => {
            if (campo.tipo === 'input') {
              return (
                <TextInput
                  key={campo.id}
                  placeholder={campo.placeholder}
                  placeholderTextColor="#999"
                  value={formData[campo.id] || ''}
                  onChangeText={text => handleChange(campo.id, text)}
                  style={styles.input}
                />
              );
            } else if (campo.tipo === 'button') {
              return (
                <TouchableOpacity
                  key={campo.id}
                  onPress={campo.onPress}
                  style={styles.botaoExtra}
                >
                  <Text style={styles.textoBotao}>{campo.textoBotao}</Text>
                </TouchableOpacity>
              );
            }
            return null;
          })}

          <View style={styles.botoes}>
            <TouchableOpacity onPress={onClose} style={styles.cancelar}>
              <Icon name="arrow-back-outline" size={20} color="#696773" />
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSalvar}
              style={[styles.salvar, { backgroundColor: corBotao }]}
            >
              <Icon name="checkmark" size={20} color="#fff" />
              <Text style={styles.textoSalvar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    backgroundColor: '#EFF1F3',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 10,
    paddingTop: 40,
  },
  fechar: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#272727',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#696773',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#272727',
  },
  botaoExtra: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#DDD',
    marginBottom: 10,
  },
  textoBotao: {
    textAlign: 'center',
    color: '#272727',
    fontWeight: 'bold',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  salvar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  textoCancelar: {
    marginLeft: 6,
    color: '#696773',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textoSalvar: {
    marginLeft: 6,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FormularioFinanceiro;
