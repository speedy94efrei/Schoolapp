import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const subjects = [
  "Français", "Mathématiques", "Histoire-géographie", "Enseignement moral et civique", "Langues vivantes",
  "Sciences de la vie et de la Terre", "Physique-chimie", "Technologie", "Éducation physique et sportive",
  "Arts plastiques", "Éducation musicale"
];

const generateNotes = () => {
  return subjects.map(subject => {
    const notes = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
      id: i,
      value: parseFloat((Math.random() * 10).toFixed(2)),
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0]
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const average = notes.length > 0 ? (notes.reduce((sum, note) => sum + note.value, 0) / notes.length).toFixed(2) : "-";
    
    return { subject, notes, average };
  });
};

const NotesPage = () => {
  const [notesData] = useState(generateNotes());
  const overallAverage = (notesData.reduce((sum, { average }) => sum + parseFloat(average || 0), 0) / notesData.length).toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.overallAverage}>Moyenne Générale : {overallAverage}/10</Text>
      <ScrollView>
        {notesData.map(({ subject, notes, average }) => (
          <View key={subject} style={styles.subjectContainer}>
            <View style={styles.subjectHeader}>
              <Text style={styles.subjectTitle}>{subject}</Text>
              <Text style={styles.subjectAverage}>Moy: {average}/10</Text>
            </View>
            {notes.length > 0 ? notes.map(note => (
              <View key={note.id} style={styles.noteCard}>
                <Text style={styles.noteText}>📅 {note.date}</Text>
                <Text style={styles.noteValue}>⭐ {note.value}/10</Text>
              </View>
            )) : (
              <Text style={styles.noNotes}>Aucune note disponible</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1F2', // ⚪ Blanc Cassé (Fond plus clair)
    padding: 10,
  },
  overallAverage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13293D', // 🔵 Bleu Profond (Texte principal)
    textAlign: 'center',
    marginBottom: 10,
  },
  subjectContainer: {
    backgroundColor: '#FFFFFF', // ⚪ Blanc Pur (Cartes Matières)
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#13293D', // 🔵 Bleu Profond (Titres foncés)
    marginBottom: 5,
  },
  subjectAverage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B98E0', // 🔵 Bleu Ciel (Moyenne matière)
  },
  assignmentCard: {
    backgroundColor: '#F0F5F9', // 🔹 Bleu Très Clair (Cartes Devoirs)
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  noteCard: {
    backgroundColor: '#1B98E0', // 🔵 Bleu Foncé (Cartes Notes)
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  noteText: {
    fontSize: 14,
    color: '#13293D', // 🔵 Bleu Profond (Texte des notes)
  },
  noteValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#13293D', // 🔵 Bleu Ciel (Valeur des notes)
  },
  noNotes: {
    fontSize: 14,
    color: '#247BA0', // 🔹 Bleu Moyen (Texte absence de notes)
    fontStyle: 'italic',
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#13293D', // 🔵 Bleu Profond (Titre du devoir)
  },
  assignmentDate: {
    fontSize: 14,
    color: '#006494', // 🔹 Bleu Moyen (Date du devoir)
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#13293D', // 🔵 Bleu Profond (Description en italique)
    fontStyle: 'italic',
  },
  noAssignments: {
    fontSize: 14,
    color: '#247BA0', // 🔹 Bleu Moyen (Aucun devoir)
    fontStyle: 'italic',
  },
});

export default NotesPage;
