import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF6F00',
    padding: 16,
    borderRadius: 16,
    marginTop: 15,
    marginBottom: 25,
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  fotoContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  foto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#FF6F00',
    backgroundColor: '#fff',
  },
  botaoAdicionar: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#FF6F00',
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
  },
  input: {
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D9E6F2',
    color: '#222',
  },
  botaoEditar: {
    backgroundColor: '#FF6F00',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoSalvar: {
    backgroundColor: '#009EE2',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  extraContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  extraText: {
    fontSize: 16,
    color: '#FF6F00',
    fontWeight: '500',
  },
   center: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center' },
});

export default styles;
