import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FBFC', // Fundo suave
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
    borderColor: '#98C1D9', // Borda azul clara
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#293241',
  },

  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#98C1D9',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  inputSenha: {
    flex: 1,
    height: 48,
    color: '#293241',
  },

  botao: {
    backgroundColor: '#EE6C4D', // Coral de destaque
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#3D5A80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default styles;