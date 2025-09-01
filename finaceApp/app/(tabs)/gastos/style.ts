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
  card: {
    backgroundColor: '#FFF5E6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#FF8300',
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 16,
    color: '#FF8300',
    marginBottom: 12,
  },
  progressBar: {
    height: 16,
    backgroundColor: '#FFE0B2',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    width: '100%',
  },
  progress: {
    height: 16,
    borderRadius: 8,
  },
  progressText: {
    fontSize: 14,
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
    shadowColor: '#FF8300',
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
    marginLeft: 8, // espaço para ícone
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 8,
  },
  data: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 65,
    zIndex: 10,
  },
});

export default styles;
