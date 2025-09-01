import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const modernStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 0,
    paddingBottom: 35,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8300',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  logo: {
    width: 120,
    height: 40,
  },
  profileButton: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  profileIcon: {
    width: 32,
    height: 32,
  },
  mainCard: {
    width: width * 0.92,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 28,
    elevation: 4,
    shadowColor: '#FF8300',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  saldoLabel: {
    fontSize: 18,
    color: '#888',
    fontWeight: '500',
    marginBottom: 8,
  },
  saldoValor: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  saldoBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginTop: 12,
    overflow: 'hidden',
  },
  saldoBar: {
    height: 8,
    backgroundColor: '#FF8300',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.92,
    marginBottom: 32,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 6,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#FF8300',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
    marginBottom: 6,
  },
  valorPositivo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF8300',
  },
  valorNegativo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EE6C4D',
  },
  recentContainer: {
    width: width * 0.92,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#FF8300',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8300',
    marginBottom: 8,
  },
  transacaoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  transacaoDescricao: {
    fontSize: 15,
    color: '#333',
  },
  transacaoValor: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  actionButton: {
    width: width * 0.92,
    backgroundColor: '#FF8300',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 32,
    elevation: 3,
    shadowColor: '#FF8300',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  valorGanho: {
    color: '#2ecc71', // verde
  },
  valorGasto: {
    color: '#c22424ff', // vermelho
  },
});

export default modernStyles;
