import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { GradientSafeAreaView as SafeAreaView } from '@/components/gradient-safe-area';
import { achievements } from '@/constants/achievements';
import { useProgress, type StudySession } from '@/hooks/use-progress';

const logo = require('../../assets/BiosphereQuestAssets/Biosphere Quest Logo.png');
type Section = 'badges' | 'schedule';

export default function ProfileScreen() {
  const progress = useProgress();
  const [section, setSection] = useState<Section>('badges');
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('BloxyCroissant');
  const percent = `${Math.min(100, Math.round((progress.xp / progress.nextLevelXp) * 100))}%` as `${number}%`;

return (
  <SafeAreaView style={styles.safeArea} edges={['top']}>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.heading}>
          <Image source={logo} style={styles.logo} contentFit="contain" />
          <Text style={styles.title}>Profile</Text>
        </View>
        <Pressable onPress={() => router.replace('/login')} style={styles.logout}>
          <Text style={styles.logoutText}>↪ Logout</Text>
        </Pressable>
      </View>

      <View style={styles.identity}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>BC</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>bloxycroissant@biospherequest.app</Text>
      </View>

      <Text style={styles.scholar}>◉ New Scholar</Text>

      <View style={styles.xpCard}>
        <View style={styles.xpHeader}>
          <Text style={styles.xpTitle}>Level {String(progress.level).padStart(2, '0')}</Text>
          <Text style={styles.xpValue}>Level {progress.level + 1}</Text>
        </View>
        <View style={styles.xpTrack}>
          <View style={[styles.xpFill, { width: percent }]} />
        </View>
        <Text style={styles.xpHint}>{progress.xp} XP</Text>
        <Text style={styles.xpNext}>{progress.nextLevelXp} XP to next</Text>
      </View>

      <View style={styles.stats}>
        <Stat icon="🔥" value={String(progress.streak)} label="Streak" />
        <Stat icon="📖" value={String(progress.lessons)} label="Lessons" />
        <Stat icon="⚡" value={String(progress.xp)} label="Total XP" />
        <Stat icon="🎯" value={String(progress.level)} label="Level" />
      </View>

      <View style={styles.switcher}>
        <Pressable
          onPress={() => setSection('badges')}
          style={[styles.switch, section === 'badges' && styles.switchActive]}
        >
          <Text style={styles.switchText}>🏅 Badges</Text>
        </Pressable>
        <Pressable
          onPress={() => setSection('schedule')}
          style={[styles.switch, section === 'schedule' && styles.switchActive]}
        >
          <Text style={styles.switchText}>🗓️ Schedule</Text>
        </Pressable>
      </View>

      {section === 'badges' ? <Badges /> : <SchedulePreview sessions={progress.sessions} />}
    </ScrollView>
  </SafeAreaView>
);}

function Badges() { return <><Text style={styles.section}>Badges</Text><View style={styles.badges}>{achievements.map((achievement) => <View key={achievement.id} style={[styles.badge, { borderColor: achievement.unlocked ? achievement.accent : '#35466e' }]}><Text style={styles.badgeIcon}>{achievement.unlocked ? achievement.icon : '🔒'}</Text><Text style={styles.badgeTitle}>{achievement.title}</Text><Text style={styles.badgeXp}>+{achievement.xp} XP</Text></View>)}</View></>; }
function SchedulePreview({ sessions }: { sessions: StudySession[] }) { return <><View style={styles.scheduleHeading}><Text style={styles.section}>This week</Text><Text style={styles.addLink} onPress={() => router.push('/schedule')}>+ Add Session</Text></View>{sessions.map((session) => <View key={session.id} style={[styles.session, session.done && styles.sessionDone]}><View style={styles.dayCircle}><Text style={styles.dayText}>{session.day.slice(0, 3)}</Text></View><View style={styles.sessionCopy}><Text style={styles.sessionTitle}>{session.title}</Text><Text style={styles.sessionMeta}>{session.time}</Text></View><Text style={styles.check}>{session.done ? '✓' : '○'}</Text></View>)}<Pressable onPress={() => router.push('/schedule')} style={styles.openSchedule}><Text style={styles.openScheduleText}>Open full schedule</Text></Pressable></>; }
function Stat({ icon, value, label }: { icon: string; value: string; label: string }) { return <View style={styles.stat}><Text style={styles.statIcon}>{icon}</Text><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>; }

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: '#091426' }, content: { padding: 18, paddingBottom: 40 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, heading: { flexDirection: 'row', alignItems: 'center', gap: 8 }, logo: { width: 44, height: 44 }, title: { color: '#fff', fontSize: 22, fontWeight: '900' }, logout: { borderColor: '#f02748', borderWidth: 1, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 5 }, logoutText: { color: '#ff3e58', fontWeight: '900', fontSize: 11 }, identity: { marginTop: 14 }, avatar: { width: 48, height: 48, borderRadius: 10, backgroundColor: '#7564f4', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#fff', fontSize: 19, fontWeight: '900' }, name: { color: '#fff', fontSize: 20, fontWeight: '900', marginTop: 7 }, nameInput: { color: '#fff', fontSize: 20, fontWeight: '900', borderBottomWidth: 1, borderColor: '#6258ff' }, email: { color: '#bdc8dd', fontSize: 10, marginTop: 2 }, edit: { position: 'absolute', right: 0, top: 24, borderColor: '#cbd4e4', borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 }, editText: { color: '#fff', fontSize: 10, fontWeight: '800' }, scholar: { alignSelf: 'flex-start', color: '#ffd05a', backgroundColor: '#875b20', borderRadius: 9, paddingHorizontal: 7, paddingVertical: 3, marginTop: 7, fontSize: 10, fontWeight: '800' }, xpCard: { backgroundColor: '#202866', borderColor: '#625cff', borderWidth: 1, borderRadius: 12, padding: 9, marginTop: 14 }, xpHeader: { flexDirection: 'row', justifyContent: 'space-between' }, xpTitle: { color: '#fff', fontSize: 10, fontWeight: '900' }, xpValue: { color: '#e875f0', fontSize: 10, fontWeight: '900' }, xpTrack: { backgroundColor: '#090d18', height: 8, borderRadius: 6, marginTop: 7 }, xpFill: { height: '100%', backgroundColor: '#e36ee9', borderRadius: 6 }, xpHint: { color: '#fff', fontSize: 10, marginTop: 3 }, xpNext: { color: '#ccd3e4', fontSize: 10, textAlign: 'right', marginTop: -12 }, stats: { flexDirection: 'row', gap: 7, marginTop: 10 }, stat: { flex: 1, backgroundColor: '#172849', borderColor: '#4568cf', borderWidth: 1, borderRadius: 10, padding: 8, alignItems: 'center' }, statIcon: { fontSize: 20 }, statValue: { color: '#e875f0', fontSize: 18, fontWeight: '900' }, statLabel: { color: '#fff', fontSize: 9, fontWeight: '800' }, switcher: { flexDirection: 'row', backgroundColor: '#172849', borderColor: '#625cff', borderWidth: 1, borderRadius: 12, padding: 2, marginTop: 18 }, switch: { flex: 1, alignItems: 'center', paddingVertical: 7, borderRadius: 10 }, switchActive: { backgroundColor: '#625cff' }, switchText: { color: '#fff', fontWeight: '900', fontSize: 13 }, section: { color: '#fff', fontSize: 17, fontWeight: '900', marginTop: 18, marginBottom: 9 }, badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, badge: { width: '31.8%', minHeight: 105, backgroundColor: '#172849', borderWidth: 1, borderRadius: 11, padding: 8, alignItems: 'center' }, badgeIcon: { fontSize: 25 }, badgeTitle: { color: '#fff', fontSize: 10, fontWeight: '900', textAlign: 'center', marginTop: 3 }, badgeXp: { color: '#f3c84f', fontSize: 9, marginTop: 4 }, scheduleHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, addLink: { color: '#ad80ff', fontSize: 11, fontWeight: '900' }, session: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#253d78', borderColor: '#5665dc', borderWidth: 1, borderRadius: 12, padding: 8, marginTop: 8 }, sessionDone: { backgroundColor: '#205d51', borderColor: '#46d483' }, dayCircle: { width: 38, height: 38, borderRadius: 20, backgroundColor: '#595bd6', alignItems: 'center', justifyContent: 'center' }, dayText: { color: '#fff', fontSize: 11, fontWeight: '900' }, sessionCopy: { flex: 1, marginLeft: 9 }, sessionTitle: { color: '#fff', fontWeight: '900', fontSize: 12 }, sessionMeta: { color: '#d5def0', fontSize: 10, marginTop: 3 }, check: { color: '#43db7d', fontSize: 27, fontWeight: '900' }, openSchedule: { backgroundColor: '#625cff', borderRadius: 9, alignItems: 'center', padding: 10, marginTop: 12 }, openScheduleText: { color: '#fff', fontWeight: '900' } });
