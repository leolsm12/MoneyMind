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
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  metaCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  metaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  metaTitulo: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.primary,
    flex: 1,
  },
  progressContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    borderWidth: 5,
    borderColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FFFE',
  },
  progressText: {
    fontSize: FontSizes.sm,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  metaValores: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  metaAtual: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.success,
  },
  metaTotal: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.full,
  },
  insightCard: {
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  insightTitle: {
    fontSize: FontSizes.sm,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  insightText: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  novaMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  novaMetaText: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.textLight,
  },
});