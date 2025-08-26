import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  saldo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#293241', // azul profundo
    marginTop: 8,
  },
    container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  logoWrapper: {
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  valorPositivo: {
    fontSize: 20,
    color: '#FF8300',
    fontWeight: 'bold',
  },
  valorNegativo: {
    fontSize: 20,
    color: '#EE6C4D',
    fontWeight: 'bold',
  },
});

export default styles;
