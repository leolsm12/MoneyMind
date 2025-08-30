import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Step =
    | 'nome'
    | 'email'
    | 'telefone'
    | 'salario'
    | 'senha'
    | 'final';

const questions = {
    nome: 'Olá! Qual seu nome?',
    email: 'Qual seu e-mail?',
    telefone: 'Qual seu telefone?',
    salario: 'Qual seu salário?',
    senha: 'Crie uma senha para sua conta.',
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
                setStep(nextStep(step));
                setTyping(false);
            }, 500);
        }
    };

    useEffect(() => {
        if (step === 'final') {
            enviarCadastro();
        }
    }, [step]);

    const login = async (email: string, senha: string) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios/login`, {
            email,
            senha,
        });

        const token = response.data;
        console.log('Token JWT recebido:', token);

        // Salvar token localmente para usar em outros endpoints
        await AsyncStorage.setItem('token', token);

        // Redirecionar para tela Home, por exemplo
        // navigation.navigate('Home');

    } catch (error: any) {
        console.log('Erro no login:', error.response?.data || error.message);
    }
};
    
    // função para enviar cadastro
    const enviarCadastro = async () => {
    try {
        const response = await axios.post(`${API_URL}/usuarios`, {
            nome: answers.nome,
            email: answers.email,
            telefone: answers.telefone,
            senha: answers.senha,
            salario: parseFloat(answers.salario),
        });

        console.log('Usuário criado:', response.data);

        // Depois do cadastro, já fazer login automaticamente
        await login(answers.email, answers.senha);
    } catch (error: any) {
        console.log('Erro ao cadastrar:', error.response?.data || error.message);
    }
};

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <ScrollView
                style={styles.chatContainer}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                keyboardShouldPersistTaps="handled"
            >
                {(Object.keys(answers) as Array<keyof typeof answers>).map((k, idx) => {
                    if (step === k || answers[k]) {
                        return (
                            <View key={k} style={styles.messageBlock}>
                                <Text style={styles.botMessage}>{questions[k]}</Text>
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
                        <View style={styles.botMessage}>
                            <TypingIndicator />
                        </View>
                    </View>
                )}
                {!typing && step !== 'final' && (
                    <View style={styles.inputBlock}>
                        <TextInput
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
                            returnKeyType="send"
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

function TypingIndicator() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ActivityIndicator size="small" color="#FF6F00" />
            <Text style={{ marginLeft: 8, color: '#1A1A1A', fontWeight: '500' }}>Digitando...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatContainer: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
        alignSelf: 'center',
    },
    messageBlock: {
        marginBottom: 18,
    },
    botMessage: {
        backgroundColor: '#F2F5FA',
        color: '#1A1A1A',
        padding: 12,
        borderRadius: 16,
        fontSize: 16,
        marginBottom: 6,
        alignSelf: 'flex-start',
        fontWeight: '500',
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#FF6F00',
        borderRadius: 16,
        padding: 10,
        marginTop: 2,
        maxWidth: '80%',
    },
    userMessage: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    inputBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#F2F5FA',
        borderRadius: 16,
        padding: 12,
        fontSize: 16,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    sendButton: {
        backgroundColor: '#FF6F00',
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 18,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    finalBlock: {
        marginTop: 24,
        alignItems: 'center',
    },
});