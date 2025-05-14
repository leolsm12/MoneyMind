import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
  flex: 1,
  backgroundColor: '#1c1c1c',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: 60,
},

logoContainer: {
  marginBottom: 10,
  alignItems: 'center',
  
},

logo: {
  width: 350,
  height: 350,
  
},
formContainer: {
  width: '90%',
},

input: {
  height: 48,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 12,
  marginBottom: 16,
  backgroundColor: '#fff',
},

senhaContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 12,
  marginBottom: 16,
  backgroundColor: '#fff',
},

inputSenha: {
  flex: 1,
  height: 48,
},

botao: {
  backgroundColor: '#009FB7',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},

textoBotao: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

});