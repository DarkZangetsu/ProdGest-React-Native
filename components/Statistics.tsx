import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatistiquesResult } from '../types';

interface StatisticsProps {
  stats: StatistiquesResult;
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, styles.minIcon]}>
            <Text style={styles.iconText}>⬇️</Text>
          </View>
          <Text style={styles.statValue}>{stats.min.toFixed(2)} Ar</Text>
          <Text style={styles.statLabel}>Montant minimal</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, styles.maxIcon]}>
            <Text style={styles.iconText}>⬆️</Text>
          </View>
          <Text style={styles.statValue}>{stats.max.toFixed(2)} Ar</Text>
          <Text style={styles.statLabel}>Montant maximal</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, styles.totalIcon]}>
            <Text style={styles.iconText}>Σ</Text>
          </View>
          <Text style={[styles.statValue, styles.totalValue]}>{stats.total.toFixed(2)} Ar</Text>
          <Text style={styles.statLabel}>Montant total</Text>
        </View>
      </View>
      
      {stats.total > 0 && (
        <View style={styles.separator}>
          <View style={styles.line}></View>
          <Text style={styles.additionalText}>Détails</Text>
          <View style={styles.line}></View>
        </View>
      )}
      
      {stats.total > 0 && (
        <View style={styles.additionalStats}>
          <View style={styles.additionalStatItem}>
            <Text style={styles.additionalStatLabel}>Moyenne</Text>
            <Text style={styles.additionalStatValue}>
              {(stats.total / 2).toFixed(2)} Ar
            </Text>
          </View>
          
          <View style={styles.additionalStatItem}>
            <Text style={styles.additionalStatLabel}>Écart</Text>
            <Text style={styles.additionalStatValue}>
              {(stats.max - stats.min).toFixed(2)} Ar
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '31%',
    backgroundColor: '#2A2A3F',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A50',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  minIcon: {
    backgroundColor: '#4568DC',
    borderWidth: 2,
    borderColor: '#3A59C0',
  },
  maxIcon: {
    backgroundColor: '#B24592',
    borderWidth: 2,
    borderColor: '#9A3980',
  },
  totalIcon: {
    backgroundColor: '#6D5ACF',
    borderWidth: 2,
    borderColor: '#5846B0',
  },
  iconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E4E4E6',
    marginBottom: 8,
  },
  totalValue: {
    color: '#E4E4E6',
  },
  statLabel: {
    fontSize: 12,
    color: '#A0A0B0',
    textAlign: 'center',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#3A3A50',
  },
  additionalText: {
    color: '#A0A0B0',
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  additionalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  additionalStatItem: {
    backgroundColor: '#2A2A3F',
    borderRadius: 10,
    padding: 12,
    width: '48%',
    borderWidth: 1,
    borderColor: '#3A3A50',
  },
  additionalStatLabel: {
    color: '#A0A0B0',
    fontSize: 12,
    marginBottom: 5,
  },
  additionalStatValue: {
    color: '#E4E4E6',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Statistics;