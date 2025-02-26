import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const subjects = [
  "Français", "Mathématiques", "Histoire-Géo", "Anglais", "SVT",
  "Physique-Chimie", "Technologie", "EPS", "Musique", "Arts Plastiques"
];

// 🔹 Générer des devoirs fictifs
const generateAssignments = () => {
  return subjects.map(subject => ({
    subject,
    assignments: Array.from({ length: Math.floor(Math.random() * 2) + 1 }, (_, i) => ({
      id: i + 1,
      title: `Devoir ${i + 1}`,
      dueDate: new Date(Date.now() + Math.random() * 10000000000).toISOString().split('T')[0],
      description: `Description détaillée du devoir en ${subject}.`
    })).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  }));
};

const DevoirsScreen = () => {
  const [assignmentsData] = useState(generateAssignments());

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>📚 Devoirs à rendre</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {assignmentsData.map(({ subject, assignments }) => (
          <View key={subject} style={styles.subjectContainer}>
            <Text style={styles.subjectTitle}>{subject}</Text>
            {assignments.length > 0 ? assignments.map(assign => (
              <View key={assign.id} style={styles.assignmentCard}>
                <View style={styles.assignmentHeader}>
                  <Ionicons name="clipboard-outline" size={22} color="#004E64" />
                  <Text style={styles.assignmentTitle}>{assign.title}</Text>
                </View>
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
    backgroundColor: '#E8F1F2',
    padding: 15,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#13293D',
    textAlign: 'center',
    marginBottom: 15,
  },
  subjectContainer: {
    backgroundColor: '#FFFFFF',
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
    color: '#13293D',
    marginBottom: 5,
  },
  assignmentCard: {
    backgroundColor: '#F0F5F9',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  assignmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#13293D',
    marginLeft: 8,
  },
  assignmentDate: {
    fontSize: 14,
    color: '#006494',
    marginTop: 2,
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#13293D',
    fontStyle: 'italic',
    marginTop: 5,
  },
  noAssignments: {
    fontSize: 14,
    color: '#247BA0',
    fontStyle: 'italic',
  },
});

export default DevoirsScreen;
