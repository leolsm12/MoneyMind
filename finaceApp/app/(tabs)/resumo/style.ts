import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  mesPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: '#E0FBFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  picker: {
    flex: 1,
    color: '#222',
  },
  card: {
    backgroundColor: '#E0FBFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#3D5A80',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    marginTop: 8,
  },
  lista: {
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 24,
  },
  gastoItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#3D5A80',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoria: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginLeft: 8,
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  data: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  mesAnoContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 24,
  justifyContent: 'space-between',
},
inputMesAno: {
  flex: 1,
  height: 40,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingHorizontal: 8,
  marginRight: 8,
},
botaoBuscar: {
  backgroundColor: '#3D5A80',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 8,
},
textoBotao: {
  color: '#fff',
  fontWeight: 'bold',
},
});

export default styles;
