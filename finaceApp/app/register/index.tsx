import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Step = 'nome' | 'email' | 'telefone' | 'salario' | 'senha' | 'final';

const questions: Record<Step, string> = {
  nome: 'Olá! Qual seu nome?',
  email: 'Qual seu e-mail?',
  telefone: 'Qual seu telefone?',
  salario: 'Qual seu salário?',
  senha: 'Crie uma senha para sua conta.',
  final: '',
};

export default function CadastroChat() {
  const [step, setStep] = useState<Step>('nome');
  const [answers, setAnswers] = useState({
    nome: '',
    email: '',
    telefone: '',
    salario: '',
    senha: '',
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<any>(null);

  const nextStep = (current: Step): Step => {
    if (current === 'nome') return 'email';
    if (current === 'email') return 'telefone';
    if (current === 'telefone') return 'salario';
    if (current === 'salario') return 'senha';
    if (current === 'senha') return 'final';
    return 'final';
  };

  const handleNext = () => {
    if (!input.trim()) return;
    setAnswers(prev => ({ ...prev, [step]: input }));
    setInput('');
    if (step !== 'final') {
      setTyping(true);
      setTimeout(() => {
        const next = nextStep(step);
        setStep(next);
        setTyping(false);
        inputRef.current?.focus();
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 500);
    }
  };

  useEffect(() => {
    if (step === 'final') enviarCadastro();
  }, [step]);

  const login = async (email: string, senha: string) => {
    try {
      const response = await axios.post(`${API_URL}/usuarios/login`, { email, senha });
      const token = response.data;
      await AsyncStorage.setItem('token', token);
      return token;
    } catch (error: any) {
      console.log('Erro no login:', error.response?.data || error.message);
      return null;
    }
  };

  const enviarCadastro = async () => {
    try {
      await axios.post(`${API_URL}/usuarios`, {
        nome: answers.nome,
        email: answers.email,
        telefone: answers.telefone,
        senha: answers.senha,
        salario: parseFloat(answers.salario),
      });

      const token = await login(answers.email, answers.senha);
      if (token) router.replace('/(tabs)/home');
    } catch (error: any) {
      console.log('Erro ao cadastrar:', error.response?.data || error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F7F7F7' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <KeyboardAwareScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 40, paddingHorizontal: 16 }}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        extraScrollHeight={Platform.OS === 'ios' ? 20 : 80}
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={true}
      >
        {(Object.keys(answers) as Array<keyof typeof answers>).map(k => {
          if (step === k || answers[k]) {
            return (
              <View key={k} style={styles.messageBlock}>
                {k !== 'final' && <Text style={styles.botMessage}>{questions[k]}</Text>}
                {answers[k] ? (
                  <View style={styles.userBubble}>
                    <Text style={styles.userMessage}>
                      {k === 'senha' ? '••••••••' : answers[k]}
                    </Text>
                  </View>
                ) : null}
              </View>
            );
          }
          return null;
        })}

        {typing && (
          <View style={styles.messageBlock}>
            <TypingIndicator />
          </View>
        )}

        {!typing && step !== 'final' && (
          <View style={styles.inputBlock}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Digite aqui..."
              value={input}
              onChangeText={setInput}
              secureTextEntry={step === 'senha'}
              keyboardType={
                step === 'email'
                  ? 'email-address'
                  : step === 'telefone'
                  ? 'phone-pad'
                  : step === 'salario'
                  ? 'numeric'
                  : 'default'
              }
              autoCapitalize={step === 'nome' ? 'words' : 'none'}
              returnKeyType={step === 'senha' ? 'done' : 'next'}
              onSubmitEditing={handleNext}
              blurOnSubmit={false}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleNext}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'final' && (
          <View style={styles.finalBlock}>
            <Text style={styles.botMessage}>
              Cadastro concluído! Bem-vindo, {answers.nome} 🎉
            </Text>
          </View>
        )}
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
}

function TypingIndicator() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
      <ActivityIndicator size="small" color="#FF6F00" />
      <Text style={{ marginLeft: 8, color: '#1A1A1A', fontWeight: '500' }}>Digitando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageBlock: { marginBottom: 16 },
  botMessage: {
    backgroundColor: '#F2F5FA',
    color: '#1A1A1A',
    padding: 14,
    borderRadius: 20,
    fontSize: 16,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    fontWeight: '500',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: '#FF6F00',
    padding: 14,
    borderRadius: 20,
    marginTop: 4,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  userMessage: { color: '#fff', fontSize: 16, fontWeight: '500' },
  inputBlock: { flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 24 },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  sendButton: {
    backgroundColor: '#FF6F00',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 8,
  },
  sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  finalBlock: { marginTop: 24, alignItems: 'center' },
});
