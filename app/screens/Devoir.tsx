import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

const subjects = [
  "Français", "Mathématiques", "Histoire-géographie", "Enseignement moral et civique", "Langues vivantes",
  "Sciences de la vie et de la Terre", "Physique-chimie", "Technologie", "Éducation physique et sportive",
  "Arts plastiques", "Éducation musicale"
];

const generateAssignments = () => {
  return subjects.map(subject => ({
    subject,
    assignments: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
      id: i,
      title: `Devoir ${i + 1}`,
      dueDate: new Date(Date.now() + Math.random() * 10000000000).toISOString().split('T')[0],
      description: `Description du devoir pour ${subject}`
    })).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  }));
};

const DevoirsPage = () => {
  const [assignmentsData] = useState(generateAssignments());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {assignmentsData.map(({ subject, assignments }) => (
          <View key={subject} style={styles.subjectContainer}>
            <Text style={styles.subjectTitle}>{subject}</Text>
            {assignments.length > 0 ? assignments.map(assign => (
              <View key={assign.id} style={styles.assignmentCard}>
                <Text style={styles.assignmentTitle}>{assign.title}</Text>
                <Text style={styles.assignmentDate}>📅 À rendre le {assign.dueDate}</Text>
                <Text style={styles.assignmentDescription}>{assign.description}</Text>
              </View>
            )) : (
              <Text style={styles.noAssignments}>Aucun devoir disponible</Text>
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
  subjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#13293D', // 🔵 Bleu Profond (Titres foncés)
    marginBottom: 5,
  },
  assignmentCard: {
    backgroundColor: '#F0F5F9', // 🔹 Bleu Très Clair (Cartes Devoirs)
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
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


export default DevoirsPage;