import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EFF1F3',
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
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    color: '#696773',
    fontWeight: '600',
    marginTop: 10,
  },
  valorPositivo: {
    fontSize: 20,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  valorNegativo: {
    fontSize: 20,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  saldo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
