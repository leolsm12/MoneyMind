import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Colors, BorderRadius, FontSizes, Spacing } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + Spacing.md : Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.textLight,
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  filtrosContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filtroButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  filtroButtonActive: {
    backgroundColor: Colors.primary,
  },
  filtroText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  filtroTextActive: {
    color: Colors.textLight,
  },
  lista: {
    padding: Spacing.lg,
  },
  transacaoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transacaoInfo: {
    flex: 1,
  },
  transacaoDescricao: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  transacaoData: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  transacaoValor: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
});