import { StyleSheet } from 'react-native';
import { Colors, BorderRadius, FontSizes, Spacing } from '@/constants/theme';

export default StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.textLight,
  },
  chat: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  chatContent: {
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  messageBlock: {
    gap: Spacing.sm,
  },
  botBubble: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.md,
    borderBottomLeftRadius: 4,
    padding: Spacing.md,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  botText: {
    color: Colors.textLight,
    fontSize: FontSizes.md,
    lineHeight: 22,
  },
  userBubble: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    borderBottomRightRadius: 4,
    padding: Spacing.md,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  userText: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  inputArea: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    height: 54,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});