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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1F2', // 🔵 Bleu Nuit (Fond général)
    padding: 15,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#303030', // ⚪ Blanc Cassé (Texte en contraste)
  },
  subTitle: {
    fontSize: 16,
    color: '#1B98E0', // 🔵 Bleu Ciel (Accent)
    marginTop: 5,
    textAlign: 'center',
  },
  section: {
    width: width - 30, // ✅ Chaque section prend toute la largeur
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#303030', // ⚪ Blanc Cassé (Texte Principal)
  },
  horizontalScroll: {
    paddingLeft: 10, // ✅ Ajout d’un espace pour éviter que les cartes collent au bord
  },
  card: {
    width: width * 0.7, // ✅ Augmente la taille des cartes (70% de la largeur de l'écran)
    backgroundColor: '#247BA0', // 🔵 Bleu Moyen (Cartes Générales)
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    marginRight: 15, // ✅ Ajoute un espace entre les cartes
  },
  cardCours: {
    width: width * 0.7, // ✅ Taille identique aux autres cartes
    backgroundColor: '#006494', // 🔵 Bleu Foncé (Cartes Cours)
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    marginRight: 15, // ✅ Ajoute un espace entre les cartes
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#E8F1F2', // ⚪ Blanc Cassé (Texte Titre Cartes)
  },
  cardNote: {
    fontSize: 16,
    color: '#E8F1F2', // ⚪ Blanc Cassé (Texte Notes)
    fontWeight: '500',
  },
  cardDate: {
    fontSize: 14,
    color: '#1B98E0', // 🔵 Bleu Ciel (Accent Dates)
    marginTop: 5,
  },
});

export default HomeScreen;
