import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EFF1F3',
  },
  totalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FED766',
    marginTop: 8,
  },
  metaLabel: {
    fontSize: 16,
    color: '#EFF1F3',
    marginTop: 10,
  },
  progressBar: {
    height: 14,
    backgroundColor: '#696773',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progress: {
    height: '100%',
    borderRadius: 10,
  },
  progressText: {
    color: '#EFF1F3',
    fontSize: 14,
    marginBottom: 10,
  },
  lista: {
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#EFF1F3',
    marginTop: 20,
    fontStyle: 'italic',
  },
  ganhoItem: {
    backgroundColor: '#696773',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    borderLeftWidth: 5,
    borderLeftColor: '#2ecc71',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoria: {
    fontSize: 16,
    color: '#FED766',
    fontWeight: '600',
  },
  valor: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: '600',
  },
  data: {
    fontSize: 12,
    color: '#EFF1F3',
    marginTop: 6,
  },
  addButton: {
    position: 'absolute',
    bottom: 120,
    right: 30,
  },
});
export default styles;