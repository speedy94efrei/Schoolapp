import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Animated,
  Image
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorShakeAnimation] = useState(new Animated.Value(0));
  const [secureText, setSecureText] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      startShakeAnimation();
    }
  }, [errors]);

  const startShakeAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(errorShakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(errorShakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(errorShakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(errorShakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  }, [errorShakeAnimation]);

  const handleTextChange = (field: keyof typeof formData) => (text: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: text }));
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field as keyof typeof newErrors];
        return newErrors;
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        
        {/* LOGO DE L'APPLICATION - PLUS GRAND ET PLUS HAUT */}
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />

        {/* Formulaire de connexion CENTRÉ */}
        <Animated.View style={[styles.formContainer, { transform: [{ translateX: errorShakeAnimation }] }]}>
          <Text style={styles.formTitle}>Bienvenue</Text>
          <Text style={styles.subText}>Veuillez entrer vos identifiants pour vous connecter</Text>

          {/* Input Email */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#004E64" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Adresse e-mail"
              placeholderTextColor="#004E64"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={handleTextChange('email')}
            />
          </View>

          {/* Input Password */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={20} color="#004E64" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor="#004E64"
              secureTextEntry={secureText}
              value={formData.password}
              onChangeText={handleTextChange('password')}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <MaterialCommunityIcons
                name={secureText ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#004E64"
                style={styles.iconRight}
              />
            </TouchableOpacity>
          </View>

        
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText} onPress={()=> router.replace('/(tabs)') } >Connexion</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1F2', // 🔹 Fond principal (Gris clair)
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 400,
    height: 200,
    marginBottom: 100,
    marginTop: -50,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#13293D', // 🔹 Ombre bleu foncé
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  formTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#13293D', // 🔹 Texte principal en bleu foncé
    marginBottom: 10,
  },
  subText: {
    fontSize: 15,
    color: '#247BA0', // 🔹 Bleu moyen pour le sous-titre
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1B98E0', // 🔹 Bleu clair pour les champs
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#006494', // 🔹 Bleu intense pour la bordure
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
    color: '#13293D', // 🔹 Icônes en bleu foncé
  },
  iconRight: {
    marginLeft: 'auto',
    color: '#13293D', // 🔹 Icônes en bleu foncé
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#13293D', // 🔹 Texte en bleu foncé
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#006494', // 🔹 Bleu intense pour le bouton
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 5,
  },
  loginText: {
    color: 'white', // Texte blanc pour le bouton
    fontSize: 18,
    fontWeight: 'bold',
  },
});
