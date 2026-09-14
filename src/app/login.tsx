import { GradientSafeAreaView as SafeAreaView } from "@/components/gradient-safe-area";
import { Ionicons } from "@expo/vector-icons";
import { makeRedirectUri } from "expo-auth-session";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";
WebBrowser.maybeCompleteAuthSession();

const logo = require("../../assets/BiosphereQuestAssets/Biosphere Quest Logo.png");
const astro = require("../../assets/BiosphereQuestAssets/Astro (Biosphere Quest Mascot).png");
const stella = require("../../assets/BiosphereQuestAssets/Stella (Biosphere Quest Mascot).png");
const googleLogo = require("../../assets/BiosphereQuestAssets/Google Logo.png");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleGoogleLogin = async () => {
    try {
      const redirectUrl = makeRedirectUri();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;
      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl,
        );
        if (result.type === "success") {
          console.log("Successfully logged in!");
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert("Required Field", "Please enter your email address.");
      return;
    }
    if (!password) {
      Alert.alert("Required Field", "Please enter your password.");
      return;
    }

    router.replace("/home");
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

        <View style={styles.grades}>
          <Text style={styles.grade}>Grade 1-3</Text>
          <Text style={styles.grade}>Grade 4-6</Text>
        </View>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Continue your learning journey</Text>

        <Field
          label="EMAIL"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="you@email.com"
        />
        <View style={styles.field}>
          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="••••••••••"
              placeholderTextColor="#aebee0"
              style={styles.passwordInput}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#aebee0"
              />
            </Pressable>
          </View>
        </View>

        <Text style={styles.forgot}>Forgot Password?</Text>

        <Pressable onPress={handleLogin} style={styles.primary}>
          <Text style={styles.primaryText}>Log In</Text>
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.or}>or</Text>
          <View style={styles.line} />
        </View>

        <Pressable style={styles.google} onPress={handleGoogleLogin}>
          <Image
            source={googleLogo}
            style={styles.googleLogo}
            contentFit="contain"
          />
          <Text style={styles.googleText}>Continue with Google</Text>
        </Pressable>

        <Text style={styles.footer}>
          Don't have an account?{" "}
          <Link href="/signup" style={styles.link}>
            Sign Up Free
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#aebee0"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#091426" },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "space-evenly",
  },
  back: { color: "#e582ff", fontWeight: "800" },
  mascots: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  mascot: { width: 75, height: 110 },
  logo: { width: 115, height: 115, marginHorizontal: -4 },
  brand: {
    color: "#7564f4",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
  },
  tagline: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },
  grades: { flexDirection: "row", justifyContent: "center", gap: 16 },
  grade: {
    backgroundColor: "#4540a8",
    borderColor: "#7067ff",
    borderWidth: 1,
    borderRadius: 16,
    color: "#fff",
    fontSize: 12,
    fontWeight: "900",
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "900" },
  subtitle: { color: "#c7d0e8", fontSize: 12 },
  field: { marginTop: 4 },
  label: { color: "#fff", fontWeight: "800", fontSize: 12, marginBottom: 6 },
  input: {
    backgroundColor: "#36377e",
    borderColor: "#625cff",
    borderWidth: 1,
    borderRadius: 9,
    color: "#fff",
    padding: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#36377e",
    borderColor: "#625cff",
    borderWidth: 1,
    borderRadius: 9,
    paddingRight: 10,
  },
  passwordInput: { flex: 1, color: "#fff", padding: 14 },
  eyeIcon: { padding: 4 },
  forgot: {
    color: "#817af0",
    fontSize: 11,
    fontWeight: "800",
    textAlign: "right",
  },
  primary: {
    backgroundColor: "#5857e4",
    borderRadius: 9,
    alignItems: "center",
    padding: 16,
  },
  primaryText: { color: "#fff", fontSize: 18, fontWeight: "900" },
  divider: { flexDirection: "row", alignItems: "center", gap: 12 },
  line: { flex: 1, height: 1, backgroundColor: "#aaa9c6" },
  or: { color: "#fff", fontWeight: "900" },
  google: {
    borderColor: "#625cff",
    borderWidth: 1,
    borderRadius: 9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  googleLogo: { width: 22, height: 22, marginRight: 8 },
  googleText: { color: "#fff", fontWeight: "900", fontSize: 15 },
  footer: { color: "#fff", textAlign: "center", fontWeight: "800" },
  link: { color: "#63e1e8", fontWeight: "900" },
});
