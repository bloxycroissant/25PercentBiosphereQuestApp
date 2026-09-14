import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, ImageSourcePropType, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GradientSafeAreaView as SafeAreaView } from '@/components/gradient-safe-area';
import { useProgress } from '@/hooks/use-progress';

const logo = require('../../assets/BiosphereQuestAssets/Biosphere Quest Logo.png');
const target = require('../../assets/BiosphereQuestAssets/target.png');
const astro = require('../../assets/BiosphereQuestAssets/Astro (Biosphere Quest Mascot).png');

export default function HomeScreen() {
  const progress = useProgress();
  const appear = useRef(new Animated.Value(0)).current;
  const width = `${Math.min(100, Math.round((progress.xp / progress.nextLevelXp) * 100))}%` as `${number}%`;

  useEffect(() => {
    Animated.spring(appear, { toValue: 1, useNativeDriver: true, tension: 45, friction: 8 }).start();
  }, [appear]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Image source={logo} style={styles.avatar} contentFit="contain" />
            <View>
              <Text style={styles.small}>Good morning,</Text>
              <Text style={styles.name}>BloxyCroissant 👋</Text>
            </View>
          </View>
          <Text style={styles.bell}>♧</Text>
        </View>

        <Animated.View
          style={{
            opacity: appear,
            transform: [
              {
                translateY: appear.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 0],
                }),
              },
            ],
          }}
        >
          <View style={styles.progress}>
            <View style={styles.labels}>
              <Text style={styles.label}>🔥 {progress.streak} Streak</Text>
              <Text style={styles.label}>🏅 Level {progress.level}</Text>
              <Text style={styles.label}>▣ {progress.lessons} Lessons</Text>
            </View>
            <View style={styles.levelRow}>
              <Text style={styles.label}>Level {progress.level}</Text>
              <Text style={styles.xp}>{progress.xp} XP</Text>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width }]} />
            </View>
          </View>

          <Text style={styles.section}>Continue Learning</Text>
          <View style={styles.cards}>
            <Pressable onPress={() => router.push('/explore')} style={styles.course}>
              <Text style={styles.courseIcon}>½</Text>
              <Text style={styles.courseTitle}>Fractions</Text>
              <Text style={styles.courseSub}>Grade 3</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/explore')} style={styles.course}>
              <Text style={styles.courseIcon}>1</Text>
              <Text style={styles.courseTitle}>Counting Numbers</Text>
              <Text style={styles.courseSub}>Grade 1</Text>
            </Pressable>
          </View>

          <View style={styles.challenge}>
            <View>
              <Text style={styles.challengeTag}>⚡ DAILY CHALLENGE</Text>
              <Text style={styles.challengeTitle}>Science & Math Quiz</Text>
              <Text style={styles.challengeSub}>5 questions · +150 XP · ~3 min</Text>
            </View>
            <Image source={target} style={styles.target} contentFit="contain" />
          </View>

          <Text style={styles.section}>Study time</Text>
          <View style={styles.study}>
            <Text style={styles.studyValue}>
              {Math.floor(progress.studyMinutes / 60)}h {progress.studyMinutes % 60}m
            </Text>
            <Text style={styles.studyCopy}>Keep learning to grow your weekly progress.</Text>
          </View>

          <Text style={styles.section}>Browse by Grade</Text>
          <GradeCard
            title="Elementary"
            grades="Grade 1-3"
            icon={astro}
            colors={['#875b20', '#172849']}
            tags={['1 + 1  Basic Math', '🌱 Science']}
            onPress={() => router.push('/explore')}
          />
          <GradeCard
            title="Intermediate"
            grades="Grade 4-6"
            icon={astro}
            colors={['#27749b', '#172849']}
            tags={['🌍 Earth Science', '✕ Pre-Algebra']}
            onPress={() => router.push('/explore')}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function GradeCard({
  title,
  grades,
  icon,
  colors,
  tags,
  onPress,
}: {
  title: string;
  grades: string;
  icon: ImageSourcePropType;
  colors: [string, string];
  tags: string[];
  onPress: () => void;
}) {
  return (
    <View style={[styles.gradeCard, { borderColor: colors[0], backgroundColor: colors[1] }]}>
      <View style={styles.gradeHeader}>
        <Image source={icon} style={styles.gradeIcon} contentFit="contain" />
        <View style={styles.gradeCopy}>
          <Text style={styles.gradeTitle}>{title}</Text>
          <Text style={styles.gradeLabel}>{grades}</Text>
        </View>
        <Pressable onPress={onPress} style={[styles.viewButton, { borderColor: colors[0] }]}>
          <Text style={styles.viewText}>View</Text>
        </Pressable>
      </View>
      <View style={styles.tags}>
        {tags.map((tag) => (
          <Text key={tag} style={[styles.tag, { borderColor: colors[0] }]}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#091426' },
  content: { padding: 18, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 44, height: 44 },
  small: { color: '#d6dced', fontSize: 12 },
  name: { color: '#fff', fontWeight: '900' },
  bell: { color: '#d0c6ff', fontSize: 25, borderColor: '#725df2', borderWidth: 1, borderRadius: 20, padding: 7 },
  progress: { backgroundColor: '#202866', borderColor: '#625cff', borderWidth: 1, borderRadius: 13, padding: 10, marginTop: 18 },
  labels: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: '#fff', fontSize: 9, fontWeight: '800' },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  xp: { color: '#edaa39', fontWeight: '900' },
  track: { backgroundColor: '#000', height: 7, borderRadius: 5, marginTop: 5 },
  fill: { height: '100%', backgroundColor: '#df6ce8', borderRadius: 5 },
  section: { color: '#fff', fontSize: 17, fontWeight: '900', marginTop: 20, marginBottom: 9 },
  cards: { flexDirection: 'row', gap: 10 },
  course: { flex: 1, minHeight: 102, backgroundColor: '#172849', borderColor: '#4568cf', borderWidth: 1, borderRadius: 15, padding: 11 },
  courseIcon: { color: '#f1bd48', fontSize: 27, fontWeight: '900' },
  courseTitle: { color: '#fff', fontWeight: '900', marginTop: 4 },
  courseSub: { color: '#bac7e0', fontSize: 10 },
  challenge: { backgroundColor: '#4642ae', borderColor: '#c2cf34', borderWidth: 1, borderRadius: 17, padding: 12, marginTop: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  challengeTag: { color: '#ffdf4e', fontWeight: '900', fontSize: 10 },
  challengeTitle: { color: '#fff', fontWeight: '900', fontSize: 17 },
  challengeSub: { color: '#fff', fontSize: 10 },
  target: { width: 55, height: 55 },
  study: { backgroundColor: '#172849', borderColor: '#4568cf', borderWidth: 1, borderRadius: 13, padding: 14 },
  studyValue: { color: '#7ce1ff', fontWeight: '900', fontSize: 22 },
  studyCopy: { color: '#c0cbe0', fontSize: 11, marginTop: 4 },
  gradeCard: { borderWidth: 1, borderRadius: 18, padding: 10, marginTop: 9 },
  gradeHeader: { flexDirection: 'row', alignItems: 'center' },
  gradeIcon: { width: 44, height: 44 },
  gradeCopy: { flex: 1, marginLeft: 7 },
  gradeTitle: { color: '#fff', fontSize: 19, fontWeight: '900' },
  gradeLabel: { color: '#fff', fontSize: 12, fontWeight: '800' },
  viewButton: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 5 },
  viewText: { color: '#fff', fontWeight: '900', fontSize: 11 },
  tags: { flexDirection: 'row', gap: 7, marginTop: 7 },
  tag: { color: '#fff', borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3, fontSize: 9, fontWeight: '800' },
});
