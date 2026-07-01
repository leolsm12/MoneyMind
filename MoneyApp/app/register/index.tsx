import { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './style';

type Step = 'nome' | 'email' | 'telefone' | 'salario' | 'senha' | 'final';

const steps: Record<Step, { question: string; icon: string }> = {
  nome:     { question: 'Olá! Como posso te chamar? 😊',         icon: 'person-outline' },
  email:    { question: 'Qual é o seu e-mail?',                   icon: 'mail-outline' },
  telefone: { question: 'E seu telefone?',                        icon: 'call-outline' },
  salario:  { question: 'Qual é a sua renda mensal? 💰',          icon: 'cash-outline' },
  senha:    { question: 'Crie uma senha segura para sua conta 🔒', icon: 'lock-closed-outline' },
  final:    { question: '',                                        icon: '' },
};

const stepOrder: Step[] = ['nome', 'email', 'telefone', 'salario', 'senha', 'final'];

export default function RegisterScreen() {
  const [step, setStep] = useState<Step>('nome');
  const [answers, setAnswers] = useState({ nome: '', email: '', telefone: '', salario: '', senha: '' });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  const nextStep = (current: Step): Step => {
    const idx = stepOrder.indexOf(current);
    return stepOrder[idx + 1] ?? 'final';
  };

  const handleNext = () => {
    if (!input.trim()) return;

    const updatedAnswers = { ...answers, [step]: input };
    setAnswers(updatedAnswers);
    setInput('');

    const next = nextStep(step);

    if (next === 'final') {
      setStep('final');
      enviarCadastro(updatedAnswers);
      return;
    }

    setTyping(true);
    setTimeout(() => {
      setStep(next);
      setTyping(false);
      setTimeout(() => {
        inputRef.current?.focus();
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 600);
  };

  const login = async (email: string, senha: string) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/usuarios/login`,
        { email, senha }
      );
      await AsyncStorage.setItem('token', response.data.token);
      return true;
    } catch {
      return false;
    }
  };

  const enviarCadastro = async (data: typeof answers) => {
    try {
      setLoading(true);
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/usuarios`, {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        senha: data.senha,
        salario: parseFloat(data.salario),
      });
      const ok = await login(data.email, data.senha);
      if (ok) router.replace('/(tabs)/home');
    } catch {
      alert('Erro ao cadastrar. Tente novamente.');
      setStep('nome');
      setAnswers({ nome: '', email: '', telefone: '', salario: '', senha: '' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step !== 'final') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [step]);

  const completedSteps = stepOrder.slice(0, stepOrder.indexOf(step));

  return (
    <LinearGradient
      colors={['#1B3A4B', '#4ECDC4']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>💰 MoneyMind</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Chat */}
        <ScrollView
          ref={scrollRef}
          style={styles.chat}
          contentContainerStyle={styles.chatContent}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {completedSteps.map((s) => (
            <View key={s} style={styles.messageBlock}>
              <View style={styles.botBubble}>
                <Text style={styles.botText}>{steps[s].question}</Text>
              </View>
              <View style={styles.userBubble}>
                <Text style={styles.userText}>
                  {s === 'senha' ? '••••••••' : answers[s as keyof typeof answers]}
                </Text>
              </View>
            </View>
          ))}

          {step !== 'final' && !typing && (
            <View style={styles.messageBlock}>
              <View style={styles.botBubble}>
                <Text style={styles.botText}>{steps[step].question}</Text>
              </View>
            </View>
          )}

          {typing && (
            <View style={styles.botBubble}>
              <ActivityIndicator size="small" color="#4ECDC4" />
            </View>
          )}

          {step === 'final' && (
            <View style={styles.messageBlock}>
              <View style={styles.botBubble}>
                <Text style={styles.botText}>
                  Tudo pronto, {answers.nome.split(' ')[0]}! 🎉{'\n'}Entrando na sua conta...
                </Text>
              </View>
              {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 16 }} />}
            </View>
          )}
        </ScrollView>

        {/* Input */}
        {step !== 'final' && !typing && (
          <View style={styles.inputArea}>
            <View style={styles.inputContainer}>
              <Ionicons name={steps[step].icon as any} size={20} color="#8A9BB0" style={styles.icon} />
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Digite aqui..."
                placeholderTextColor="#8A9BB0"
                value={input}
                onChangeText={setInput}
                secureTextEntry={step === 'senha'}
                keyboardType={
                  step === 'email' ? 'email-address' :
                  step === 'telefone' ? 'phone-pad' :
                  step === 'salario' ? 'decimal-pad' : 'default'
                }
                autoCapitalize={step === 'nome' ? 'words' : 'none'}
                onSubmitEditing={handleNext}
                returnKeyType="send"
                blurOnSubmit={false}
              />
              <TouchableOpacity onPress={handleNext} style={styles.sendButton}>
                <Ionicons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}