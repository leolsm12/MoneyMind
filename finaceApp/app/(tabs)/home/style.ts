import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#98C1D9', // fundo claro e limpo
  },
  logoWrapper: {
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  logo: {
    width: 120,
    height: 120,
  },
  card: {
    backgroundColor: '#e0fbfc',
    borderRadius: 16,
    padding: 15,
    marginBottom: 16,
    shadowColor: '#293241', // sombra azul escuro
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    color: '#3D5A80', // azul escuro
    fontWeight: '600',
    marginTop: 10,
  },
  valorPositivo: {
    fontSize: 20,
    color: '#3D5A80', // azul escuro usado para valores positivos
    fontWeight: 'bold',
  },
  valorNegativo: {
    fontSize: 20,
    color: '#EE6C4D', // laranja de destaque
    fontWeight: 'bold',
  },
  saldo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#293241', // azul profundo
    marginTop: 8,
  },
});

export default styles;
