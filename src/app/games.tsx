import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GradientSafeAreaView as SafeAreaView } from '@/components/gradient-safe-area';
import { useProgress } from '@/hooks/use-progress';

const gameCatalog = [
  { title: 'Flashcards', subtitle: 'Formulas & definitions', icon: require('../../assets/BiosphereQuestAssets/Flashcards Icon.png'), color: '#2f69d2', difficulty: 'Easy' },
  { title: 'Word Scramble', subtitle: 'Science terminology', icon: require('../../assets/BiosphereQuestAssets/Word Scramble.png'), color: '#5a43c1', difficulty: 'Medium' },
  { title: 'Number Ninja', subtitle: 'Rapid-fire arithmetic', icon: require('../../assets/BiosphereQuestAssets/Thunder.png'), color: '#364eac', difficulty: 'Hard' },
  { title: 'Memory Match', subtitle: 'Flip & pair science icons', icon: require('../../assets/BiosphereQuestAssets/Science Icon.png'), color: '#543bb4', difficulty: 'Medium' },
  { title: 'Whack-a-Number', subtitle: 'Tap the correct answer', icon: require('../../assets/BiosphereQuestAssets/MAth Icon.png'), color: '#2c62c3', difficulty: 'Hard' },
  { title: 'Codebreaker', subtitle: 'Decode the thinking vault', icon: require('../../assets/BiosphereQuestAssets/Badge Icon.png'), color: '#443aa8', difficulty: 'Impossible' },
];

const difficultyColors: Record<string, string> = { Easy: '#39d4ff', Medium: '#ad80ff', Hard: '#ffca45', Impossible: '#ff657d' };

export default function GamesScreen() {
  const { leaderboardXp } = useProgress();
  const [difficulty, setDifficulty] = useState('All');
  const entrance = useRef(new Animated.Value(0)).current;
  const leaderboardPulse = useRef(new Animated.Value(1)).current;
  const visibleGames = difficulty === 'All' ? gameCatalog : gameCatalog.filter((item) => item.difficulty === difficulty);
  const playerXp = leaderboardXp;

  useEffect(() => { Animated.spring(entrance, { toValue: 1, useNativeDriver: true, tension: 45, friction: 8 }).start(); }, [entrance]);
  useEffect(() => { Animated.sequence([Animated.spring(leaderboardPulse, { toValue: 1.05, useNativeDriver: true }), Animated.spring(leaderboardPulse, { toValue: 1, useNativeDriver: true })]).start(); }, [playerXp, leaderboardPulse]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: entrance, transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }] }}>
          <View style={styles.headingRow}>
            <View>
              <Text style={styles.title}>Games</Text>
              <Text style={styles.subtitle}>Learn through play, earn real XP</Text>
            </View>
            <Text style={styles.mascot}>🧙‍♀️</Text>
          </View>

          {/* Featured Card */}
          <View style={styles.featured}>
            <View style={styles.featureCopy}>
              <Text style={styles.featureTag}>✦ FEATURED</Text>
              <Text style={styles.featureTitle}>Math & Science Quiz</Text>
              <Text style={styles.featureDetails}>🧪 Chemistry · Physics · Calculus</Text>
              <Text style={styles.featureXp}>🔥 +150 XP · 5 questions · ~3 min</Text>
            </View>
            <Text style={styles.trophy}>🏆</Text>
          </View>

          {/* Filter Bar */}
          <View style={styles.filterRow}>
            {['All', 'Easy', 'Medium', 'Hard', 'Impossible'].map((item) => (
              <Pressable key={item} onPress={() => setDifficulty(item)} style={[styles.filter, difficulty === item && styles.filterActive]}>
                <Text style={styles.filterText}>{item}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.section}>Choose your Mini Games</Text>

          {/* Game Cards Grid */}
          <View style={styles.grid}>
            {visibleGames.map((item) => (
              <View key={item.title} style={[styles.gameCard, { borderColor: item.color }]}>
                <Image source={item.icon} style={styles.gameIcon} contentFit="contain" />
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                <Text style={[styles.cardXp, { color: difficultyColors[item.difficulty] }]}>
                  ⚡ +{item.difficulty === 'Impossible' ? 150 : item.difficulty === 'Hard' ? 120 : item.difficulty === 'Medium' ? 90 : 80} XP
                </Text>
              </View>
            ))}
          </View>

          {/* Leaderboard */}
          <Animated.View style={[styles.leaderboard, { transform: [{ scale: leaderboardPulse }] }]}>
            <Text style={styles.leaderboardTitle}>Weekly Leaderboard</Text>
            <View style={styles.podium}>
              <PodiumPlace rank="2" name="Priya Sharma" xp="180 XP" color="#c9c9c9" height={58} />
              <PodiumPlace rank="1" name="Jordan Kim" xp="240 XP" color="#fff24c" height={78} />
              <PodiumPlace rank="3" name="BloxyCroissant" xp={`${playerXp} XP`} color="#ed9538" height={48} />
            </View>
            <RankRow rank="#4" name="Marco Rossi" xp={`${Math.max(0, playerXp - 20)} XP`} />
            <RankRow rank="#5" name="Marco Polo" xp={`${Math.max(0, playerXp - 50)} XP`} />
            <Text style={styles.leaderboardHint}>Your score updates and animates after every correct answer.</Text>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PodiumPlace({ rank, name, xp, color, height }: { rank: string; name: string; xp: string; color: string; height: number }) {
  return (
    <View style={styles.podiumPlace}>
      <View style={[styles.avatar, { backgroundColor: color }]}>
        <Text style={styles.avatarText}>{rank === '1' ? 'JK' : rank === '2' ? 'PS' : 'BC'}</Text>
      </View>
      <View style={[styles.podiumBar, { backgroundColor: color, height }]}>
        <Text style={styles.rankNumber}>{rank}</Text>
        <Text style={styles.podiumName}>{name}</Text>
        <Text style={styles.podiumXp}>{xp}</Text>
      </View>
    </View>
  );
}

function RankRow({ rank, name, xp }: { rank: string; name: string; xp: string }) {
  return (
    <View style={styles.ranking}>
      <Text style={styles.rankText}>{rank}   {name}</Text>
      <Text style={styles.rankXp}>{xp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#091426' },
  content: { padding: 17, paddingBottom: 44 },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 25, fontWeight: '900' },
  subtitle: { color: '#d7deef', fontSize: 11, fontWeight: '700', marginTop: 3 },
  mascot: { fontSize: 45 },
  featured: { backgroundColor: '#282080', borderColor: '#eca935', borderWidth: 1, borderRadius: 21, padding: 13, marginTop: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  featureCopy: { flex: 1 },
  featureTag: { color: '#f1c65b', fontWeight: '900', fontSize: 10 },
  featureTitle: { color: '#fff', fontSize: 18, fontWeight: '900', marginTop: 5 },
  featureDetails: { color: '#fff', fontSize: 10, marginTop: 5 },
  featureXp: { color: '#fff', fontSize: 10, fontWeight: '800', marginTop: 4 },
  trophy: { fontSize: 52, marginLeft: 8 },
  filterRow: { flexDirection: 'row', gap: 5, marginTop: 14 },
  filter: { backgroundColor: '#252a69', borderRadius: 13, paddingHorizontal: 8, paddingVertical: 7 },
  filterActive: { backgroundColor: '#6258ff' },
  filterText: { color: '#fff', fontSize: 9, fontWeight: '900' },
  section: { color: '#fff', fontSize: 16, fontWeight: '900', marginTop: 17, marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gameCard: { width: '31.8%', minHeight: 133, backgroundColor: '#172849', borderWidth: 1, borderRadius: 13, padding: 8, alignItems: 'center' },
  gameIcon: { width: 51, height: 51 },
  cardTitle: { color: '#fff', fontSize: 10, fontWeight: '900', textAlign: 'center', marginTop: 5 },
  cardSubtitle: { color: '#bcc9e1', fontSize: 7, textAlign: 'center', marginTop: 3 },
  cardXp: { fontSize: 8, fontWeight: '900', marginTop: 6 },
  leaderboard: { backgroundColor: '#202e68', borderColor: '#5365de', borderWidth: 1, borderRadius: 15, padding: 12, marginTop: 18 },
  leaderboardTitle: { color: '#fff', fontSize: 16, fontWeight: '900', textAlign: 'center' },
  podium: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginTop: 15, height: 112, gap: 3 },
  podiumPlace: { alignItems: 'center', width: '30%' },
  avatar: { width: 28, height: 28, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginBottom: -2, zIndex: 2 },
  avatarText: { color: '#25305e', fontSize: 9, fontWeight: '900' },
  podiumBar: { width: '100%', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 5 },
  rankNumber: { color: '#11152c', fontSize: 22, fontWeight: '900' },
  podiumName: { color: '#11152c', fontSize: 7, fontWeight: '900', textAlign: 'center' },
  podiumXp: { color: '#11152c', fontSize: 7 },
  ranking: { backgroundColor: '#304487', borderRadius: 8, padding: 8, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' },
  rankText: { color: '#fff', fontWeight: '800', fontSize: 11 },
  rankXp: { color: '#f3ca45', fontWeight: '900', fontSize: 11 },
  leaderboardHint: { color: '#aebee0', fontSize: 9, textAlign: 'center', marginTop: 9 }
});