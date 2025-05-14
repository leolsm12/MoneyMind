import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#EFF1F3', // sua cor de fundo clara
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#272727',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#696773',
    marginBottom: 30,
  },
  botao: {
    backgroundColor: '#009FB7', // botão principal
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  sair: {
    backgroundColor: '#FED766', // botão secundário
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});