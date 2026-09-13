import { SafeAreaView, type SafeAreaViewProps } from 'react-native-safe-area-context';

export function GradientSafeAreaView({ style, ...props }: SafeAreaViewProps) {
  return <SafeAreaView {...props} style={[style, { backgroundColor: 'transparent' }]} />;
}
