import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FBFC', // branco azulado da paleta
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  fotoContainer: {
    position: 'relative',
    marginBottom: 25,
    shadowColor: '#293241', // azul muito escuro para sombra
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  foto: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: '#3D5A80', // azul escuro da paleta
    backgroundColor: '#98C1D9', // azul claro de fundo da foto
  },
  botaoAdicionar: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#EE6C4D', // laranja vibrante da paleta
    borderRadius: 24,
    padding: 7,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#EE6C4D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#293241', // azul muito escuro
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 45,
    borderWidth: 1.5,
    borderColor: '#3D5A80',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#293241',
    marginBottom: 30,
    shadowColor: '#3D5A80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoEditar: {
    backgroundColor: '#3D5A80', // azul escuro da paleta
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 15,
    shadowColor: '#3D5A80',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  botaoSalvar: {
    backgroundColor: '#EE6C4D', // laranja para o botão salvar
  },
  botaoSair: {
    marginTop: 15,
    backgroundColor: '#293241', // azul muito escuro
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 15,
    shadowColor: '#293241',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  textoBotao: {
    color: '#E0FBFC', // branco azulado
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;
