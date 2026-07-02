import { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style';
import { Colors } from '@/constants/theme';

type Mensagem = {
  id: string;
  texto: string;
  tipo: 'bot' | 'user';
};

const mensagensIniciais: Mensagem[] = [
  {
    id: '1',
    tipo: 'bot',
    texto: 'Olá! Sou o assistente financeiro do MoneyMind 💰\n\nPosso te ajudar a analisar seus gastos, dar dicas de economia e muito mais. Como posso te ajudar hoje?',
  },
];

export default function IAAgentScreen() {
  const [mensagens, setMensagens] = useState<Mensagem[]>(mensagensIniciais);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Mensagem = {
      id: Date.now().toString(),
      tipo: 'user',
      texto: input.trim(),
    };

    setMensagens(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Por enquanto resposta mock — depois integra com o Gemini
    setTimeout(() => {
      const botMsg: Mensagem = {
        id: (Date.now() + 1).toString(),
        tipo: 'bot',
        texto: 'Em breve estarei conectado ao seu histórico financeiro para te dar respostas personalizadas! 🚀',
      };
      setMensagens(prev => [...prev, botMsg]);
      setLoading(false);
      listRef.current?.scrollToEnd({ animated: true });
    }, 1000);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <LinearGradient colors={[Colors.primary, '#2E6B8A']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.botAvatar}>
            <Ionicons name="sparkles" size={22} color={Colors.textLight} />
          </View>
          <View>
            <Text style={styles.headerTitle}>MoneyMind IA</Text>
            <Text style={styles.headerSubtitle}>Assistente financeiro inteligente</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Chat */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={listRef}
          data={mensagens}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContent}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View style={[
              styles.messageRow,
              item.tipo === 'user' ? styles.messageRowUser : styles.messageRowBot
            ]}>
              {item.tipo === 'bot' && (
                <View style={styles.botAvatarSmall}>
                  <Ionicons name="sparkles" size={14} color={Colors.textLight} />
                </View>
              )}
              <View style={[
                styles.bubble,
                item.tipo === 'user' ? styles.bubbleUser : styles.bubbleBot
              ]}>
                <Text style={[
                  styles.bubbleText,
                  item.tipo === 'user' ? styles.bubbleTextUser : styles.bubbleTextBot
                ]}>
                  {item.texto}
                </Text>
              </View>
            </View>
          )}
          ListFooterComponent={
            loading ? (
              <View style={styles.messageRow}>
                <View style={styles.botAvatarSmall}>
                  <Ionicons name="sparkles" size={14} color={Colors.textLight} />
                </View>
                <View style={styles.bubbleBot}>
                  <ActivityIndicator size="small" color={Colors.secondary} />
                </View>
              </View>
            ) : null
          }
        />

        {/* Input */}
        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Conversar com MoneyMind..."
              placeholderTextColor="#8A9BB0"
              value={input}
              onChangeText={setInput}
              multiline
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[styles.sendButton, (!input.trim() || loading) && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!input.trim() || loading}
            >
              <Ionicons name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}