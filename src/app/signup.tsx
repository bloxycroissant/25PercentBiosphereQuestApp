import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientSafeAreaView as SafeAreaView } from '@/components/gradient-safe-area';

const subjects = ['Basic Math', 'Patterns', 'Matter', 'Force', 'Geometry'];
const logo = require('../../assets/BiosphereQuestAssets/Biosphere Quest Logo.png');
const astro = require('../../assets/BiosphereQuestAssets/Astro (Biosphere Quest Mascot).png');
const stella = require('../../assets/BiosphereQuestAssets/Stella (Biosphere Quest Mascot).png');

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Basic Math']);

  const toggleSubject = (subject: string) =>
    setSelectedSubjects((current) =>
      current.includes(subject) ? current.filter((item) => item !== subject) : [...current, subject]
    );

  const handleSignUp = () => {
    if (!name.trim()) {
      Alert.alert('Required Field', 'Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Required Field', 'Please enter your email address.');
      return;
    }
    if (!password || password.length < 8) {
      Alert.alert('Invalid Password', 'Password must be at least 8 characters.');
      return;
    }
    if (selectedSubjects.length === 0) {
      Alert.alert('Select Lessons', 'Please pick at least one subject to start.');
      return;
    }

    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>

        <View style={styles.mascots}>
          <Image source={astro} style={styles.mascot} contentFit="contain" />
          <Image source={logo} style={styles.logo} contentFit="contain" />
          <Image source={stella} style={styles.mascot} contentFit="contain" />
        </View>

        <Text style={styles.brand}>Biosphere Quest</Text>
        <Text style={styles.tagline}>Rocket your knowledge to the stars</Text>

        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Start learning for free today</Text>

        <Text style={styles.sectionLabel}>PICK YOUR LESSONS</Text>

        <View style={styles.subjects}>
          {subjects.map((subject) => {
            const selected = selectedSubjects.includes(subject);
            return (
              <Pressable
                key={subject}
                onPress={() => toggleSubject(subject)}
                style={[styles.subject, selected && styles.subjectSelected]}
              >
                <Text style={[styles.subjectText, selected && styles.subjectTextSelected]}>
                  {selected ? '✓ ' : ''}
                  {subject}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.selectionHint}>
          {selectedSubjects.length} subject{selectedSubjects.length === 1 ? '' : 's'} selected
        </Text>

        <Field label="Full name" value={name} onChangeText={setName} placeholder="Your full name" />
        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="you@email.com"
        />
        
        {/* Password Field with Eye Toggle */}
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Min. 8 characters"
              placeholderTextColor="#aebee0"
              style={styles.passwordInput}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#aebee0"
              />
            </Pressable>
          </View>
        </View>

        <Pressable onPress={handleSignUp} style={styles.primary}>
          <Text style={styles.primaryText}>Start Learning Free</Text>
        </Pressable>

        <Text style={styles.footer}>
          Already have an account?{' '}
          <Link href="/login" style={styles.link}>
            Log In
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} style={styles.input} placeholderTextColor="#aebee0" />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#091426' },
  content: { flex: 1, padding: 22, paddingTop: 16, paddingBottom: 20, justifyContent: 'space-between' },
  back: { color: '#e582ff', fontWeight: '800' },
  mascots: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginTop: 4 },
  mascot: { width: 60, height: 90 },
  logo: { width: 95, height: 95, marginHorizontal: -2 },
  brand: { color: '#9d7aff', fontSize: 24, fontWeight: '900', textAlign: 'center' },
  tagline: { color: '#fff', fontSize: 11, fontWeight: '800', textAlign: 'center', marginTop: 1 },
  title: { color: '#fff', fontSize: 22, fontWeight: '900', marginTop: 16, textAlign: 'center' },
  subtitle: { color: '#c7d0e8', textAlign: 'center', marginTop: 4 },
  sectionLabel: { color: '#fff', fontSize: 11, fontWeight: '900', marginTop: 16 },
  subjects: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  subject: {
    backgroundColor: '#283b78',
    borderColor: '#5d65e4',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  subjectSelected: { backgroundColor: '#6558e9', borderColor: '#b6a9ff' },
  subjectText: { color: '#dce4fa', fontSize: 11, fontWeight: '800' },
  subjectTextSelected: { color: '#fff' },
  selectionHint: { color: '#9af2bc', fontSize: 11, marginTop: 6 },
  field: { marginTop: 10 },
  label: { color: '#fff', fontWeight: '800', fontSize: 12, marginBottom: 4 },
  input: {
    backgroundColor: '#283b78',
    borderColor: '#5d65e4',
    borderWidth: 1,
    borderRadius: 10,
    color: '#fff',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#283b78',
    borderColor: '#5d65e4',
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
    padding: 10,
  },
  eyeIcon: {
    padding: 4,
  },
  primary: { backgroundColor: '#6258ff', borderRadius: 11, alignItems: 'center', padding: 12, marginTop: 16 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '900' },
  footer: { color: '#c7d0e8', textAlign: 'center', marginTop: 12 },
  link: { color: '#63e1e8', fontWeight: '900' },
});