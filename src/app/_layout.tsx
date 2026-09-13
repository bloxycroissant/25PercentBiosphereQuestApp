import { DarkTheme, DefaultTheme, Slot, ThemeProvider, usePathname } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { Animated, StyleSheet, useColorScheme } from 'react-native';
import { useEffect, useRef } from 'react';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/mobile-navigation';
import { ProgressProvider } from '@/hooks/use-progress';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const isWelcomeOrAuth = pathname === '/' || pathname === '/login' || pathname === '/signup';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ProgressProvider>
        <LinearGradient colors={['#090b20', '#28285e', '#0b4070']} style={styles.background}>
          <AnimatedSplashOverlay />
          {isWelcomeOrAuth ? <AnimatedRoute /> : <AppTabs />}
        </LinearGradient>
      </ProgressProvider>
    </ThemeProvider>
  );
}

function AnimatedRoute() {
  const pathname = usePathname();
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    entrance.setValue(0);
    Animated.spring(entrance, { toValue: 1, useNativeDriver: true, tension: 55, friction: 9 }).start();
  }, [entrance, pathname]);

  return <Animated.View style={{ flex: 1, opacity: entrance, transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }}><Slot /></Animated.View>;
}

const styles = StyleSheet.create({
  background: { flex: 1 },
});
