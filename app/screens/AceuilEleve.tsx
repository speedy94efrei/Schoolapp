import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 📌 Récupération des dimensions de l'écran
const { width, height } = Dimensions.get('window');

// 🔹 Données en dur pour les notes, devoirs et prochains cours
const mockNotes = [
  { id: '1', matiere: 'Mathématiques', note: '16/20', date: '12/02/2024' },
  { id: '2', matiere: 'Physique', note: '14/20', date: '10/02/2024' },
  { id: '3', matiere: 'Anglais', note: '18/20', date: '08/02/2024' },
];

const mockDevoirs = [
  { id: '1', matiere: 'Histoire', titre: 'Révision Chapitre 3', date: '15/02/2024' },
  { id: '2', matiere: 'SVT', titre: 'Exposé sur les écosystèmes', date: '17/02/2024' },
  { id: '3', matiere: 'Mathématiques', titre: 'Exercice sur les équations', date: '19/02/2024' },
];

const mockCours = [
  { id: '1', matiere: 'Mathématiques', heure: '08:30 - 10:00', salle: 'Salle 101' },
  { id: '2', matiere: 'Physique', heure: '10:15 - 11:45', salle: 'Salle 202' },
  { id: '3', matiere: 'Anglais', heure: '13:00 - 14:30', salle: 'Salle 305' },
];

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ✅ Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bienvenue 👋</Text>
        <Text style={styles.subTitle}>Accède rapidement à tes notes, devoirs et prochains cours</Text>
      </View>

      {/* ✅ Section Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📌 Notes Récentes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {mockNotes.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="book-outline" size={24} color="#004E64" />
                <Text style={styles.cardTitle}>{item.matiere}</Text>
              </View>
              <Text style={styles.cardNote}>Note : {item.note}</Text>
              <Text style={styles.cardDate}>Date : {item.date}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ✅ Section Devoirs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Devoirs de la Semaine</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {mockDevoirs.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="clipboard-outline" size={24} color="#004E64" />
                <Text style={styles.cardTitle}>{item.matiere}</Text>
              </View>
              <Text style={styles.cardNote}>{item.titre}</Text>
              <Text style={styles.cardDate}>À rendre le {item.date}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ✅ Section Prochain Cours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Prochain Cours</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {mockCours.map((item) => (
            <View key={item.id} style={styles.cardCours}>
              <View style={styles.cardHeader}>
                <Ionicons name="time-outline" size={24} color="#004E64" />
                <Text style={styles.cardTitle}>{item.matiere}</Text>
              </View>
              <Text style={styles.cardNote}>Heure : {item.heure}</Text>
              <Text style={styles.cardDate}>Salle : {item.salle}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};


export default HomeScreen;
