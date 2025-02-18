import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/fr';

const { width, height } = Dimensions.get('window');

const generateTimetable = (weekStart) => {
  let isWeekA = moment(weekStart).week() % 2 === 0;
  let timetable = {};
  const coursesA = ["Mathématiques", "Physique", "Anglais", "Histoire", "SVT", "Informatique", "Philosophie"];
  const coursesB = ["Chimie", "Philosophie", "Espagnol", "Géographie", "Informatique", "Arts", "Économie"];
  const hours = ["08:30 - 10:00", "10:15 - 11:45", "12:30 - 14:00", "14:15 - 15:45", "16:00 - 17:45"];
  
  for (let i = 0; i < 5; i++) {
    let date = moment(weekStart).add(i, 'days').format('YYYY-MM-DD');
    timetable[date] = hours.map((hour, index) => ({
      heure: hour,
      matiere: isWeekA ? coursesA[index % coursesA.length] : coursesB[index % coursesB.length],
      salle: (101 + index * 10).toString()
    }));
  }
  return timetable;
};

const Calendrier = () => {
  const [selectedWeek, setSelectedWeek] = useState(moment().startOf('isoWeek'));
  const [timetable, setTimetable] = useState(generateTimetable(selectedWeek));

  useEffect(() => {
    setTimetable(generateTimetable(selectedWeek));
  }, [selectedWeek]);

  const getWeekDays = () => {
    return Array.from({ length: 5 }, (_, i) =>
      moment(selectedWeek).add(i, 'days').format('YYYY-MM-DD')
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => setSelectedWeek(moment(selectedWeek).subtract(1, 'week'))}>
          <Ionicons name="chevron-back-outline" size={30} color="#004E64" />
        </TouchableOpacity>
        <Text style={styles.weekText}>
          {moment(selectedWeek).format('DD MMM')} - {moment(selectedWeek).add(4, 'days').format('DD MMM')} ({moment(selectedWeek).week() % 2 === 0 ? 'Semaine A' : 'Semaine B'})
        </Text>
        <TouchableOpacity onPress={() => setSelectedWeek(moment(selectedWeek).add(1, 'week'))}>
          <Ionicons name="chevron-forward-outline" size={30} color="#004E64" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
        {getWeekDays().map((date) => (
          <View key={date} style={styles.dayColumn}>
            <Text style={styles.dayText}>{moment(date).format('ddd D')}</Text>
            <ScrollView style={styles.coursesContainer}>
              {timetable[date] ? (
                timetable[date].map((course, index) => (
                  <View key={index} style={[styles.courseCard, { flex: 1 }]}> 
                    <View style={styles.cardHeader}>
                      <Ionicons name="book-outline" size={20} color="#004E64" />
                      <Text style={styles.courseTitle}>{course.matiere}</Text>
                    </View>
                    <Text style={styles.courseTime}>⏰ {course.heure}</Text>
                    <Text style={styles.courseRoom}>📍 Salle {course.salle}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noCourses}>Pas de cours</Text>
              )}
            </ScrollView>
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
    paddingVertical: 10,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  weekText: {
    fontSize: 20, // 🔹 Augmentation de la taille pour meilleure lisibilité
    fontWeight: 'bold',
    color: '#13293D', // 🔵 Bleu Profond (Texte navigation semaine)
  },
  weekScroll: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  dayColumn: {
    width: width / 1.7, // 🔹 Augmentation supplémentaire de la largeur des colonnes
    padding: 25, // 🔹 Plus d'espace intérieur
    backgroundColor: '#FFFFFF', // ⚪ Blanc Pur (Fond colonne jours)
    borderRadius: 15,
    marginHorizontal: 8, // 🔹 Espacement amélioré
    alignItems: 'center',
    flex: 1,
  },
  dayText: {
    fontSize: 20, // 🔹 Texte plus grand
    fontWeight: 'bold',
    color: '#13293D', // 🔵 Bleu Profond (Texte jours)
    marginBottom: 8,
  },
  coursesContainer: {
    width: '100%',
    flex: 1,
  },
  courseCard: {
    backgroundColor: "#1B98E0", // 🔹 Bleu Ciel (Cartes Cours)
    padding: 25,
    borderRadius: 20, // 🔹 Plus d'arrondi pour un design plus moderne
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 22, // 🔹 Texte encore plus grand pour une meilleure lisibilité
    fontWeight: "bold",
    marginLeft: 12,
    color: "#13293D", // 🔵 Bleu Profond (Titre du cours)
  },
  courseTime: {
    fontSize: 20, // 🔹 Augmentation de la taille
    color: "#006494", // 🔹 Bleu Moyen (Heure du cours)
  },
  courseRoom: {
    fontSize: 18, // 🔹 Augmentation de la taille
    color: "#247BA0", // 🔹 Bleu Moyen (Salle de cours)
  },
  noCourses: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
    marginTop: 12,
  },
});

export default Calendrier;
