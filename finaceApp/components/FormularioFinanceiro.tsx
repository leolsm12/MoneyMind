import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

    campos.forEach(campo => {
      const valor = formData[campo.id];
      if (campo.tipo === 'input') {
        if (!valor) return;
        const parsed = parseFloat(valor.replace(',', '.'));
        dataFinal[campo.id] = isNaN(parsed) ? valor : parsed;
      }
    });

    onSave(dataFinal);
    setFormData({});
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.titulo}>{titulo}</Text>

          {campos.map((campo, index) => {
            if (campo.tipo === 'input') {
              return (
                <TextInput
                  key={campo.id}
                  placeholder={campo.placeholder}
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
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSalvar}
              style={[styles.salvar, { backgroundColor: corBotao }]}
            >
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  botaoExtra: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  textoBotao: {
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelar: {
    padding: 12,
  },
  salvar: {
    padding: 12,
    borderRadius: 8,
  },
  textoCancelar: {
    color: '#999',
    fontWeight: 'bold',
  },
  textoSalvar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FormularioFinanceiro;
