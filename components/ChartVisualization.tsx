// components/ChartVisualization.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, useWindowDimensions, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Produit, ChartData } from '../types';

interface ChartVisualizationProps {
  produits: Produit[];
}

const ChartVisualization: React.FC<ChartVisualizationProps> = ({ produits }) => {
  const [chartType, setChartType] = useState<'barchart' | 'camembert'>('barchart');
  const { width, height } = useWindowDimensions();
  const [chartWidth, setChartWidth] = useState(width - 50);
  const [chartHeight, setChartHeight] = useState(Math.min(220, height * 0.3));
  
  // Recalcule les dimensions du graphique lorsque l'écran change
  useEffect(() => {
    // Calcul de la largeur optimale du graphique en fonction de l'orientation
    const isLandscape = width > height;
    setChartWidth(isLandscape ? width * 0.7 : width - 50);
    setChartHeight(Math.min(220, height * 0.3));
  }, [width, height]);

  // Tronque le texte pour les petits écrans
  const getTruncatedLabel = (text: string) => {
    const isSmallScreen = width < 375;
    if (isSmallScreen) {
      return text.substring(0, 3);
    } else if (width < 600) {
      return text.substring(0, 5);
    }
    return text.substring(0, 8);
  };

  // Données pour le graphique en barres
  const barChartData: ChartData = {
    labels: produits.length > 0 
      ? produits.map(p => getTruncatedLabel(p.design)) 
      : ['Aucun'],
    datasets: [
      {
        data: produits.length > 0 
          ? produits.map(p => p.prix * p.quantite) 
          : [0],
        color: (opacity = 1) => `rgba(109, 90, 207, ${opacity})`,
      }
    ]
  };

  // Données pour le camembert
  const pieChartData = produits.length > 0
    ? produits.map((p, index) => {
        const hue = 260 + (index * 20) % 60;
        return {
          name: getTruncatedLabel(p.design),
          value: p.prix * p.quantite,
          color: `hsl(${hue}, 70%, 60%)`,
          legendFontColor: '#E4E4E6',
          legendFontSize: width < 375 ? 10 : 12
        };
      })
    : [{ name: 'Aucun', value: 0, color: '#6D5ACF', legendFontColor: '#E4E4E6', legendFontSize: 12 }];

  // Configuration adaptée à la taille de l'écran
  const chartConfig = {
    backgroundColor: '#1E1E2E',
    backgroundGradientFrom: '#1E1E2E',
    backgroundGradientTo: '#2A2A3F',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(224, 224, 230, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#6D5ACF',
    },
    barPercentage: width < 375 ? 0.5 : 0.6,
    useShadowColorFromDataset: false,
    // Plus petite police sur les petits écrans
    propsForLabels: {
      fontSize: width < 375 ? 8 : (width < 600 ? 10 : 12),
    }
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>📊 Analyse des Stocks</Text>
      
      <View style={styles.chartButtons}>
        <TouchableOpacity
          style={[
            styles.chartButton, 
            chartType === 'barchart' ? styles.activeButton : null,
            width < 375 && styles.smallScreenButton
          ]}
          onPress={() => setChartType('barchart')}
        >
          <Text style={[
            styles.buttonText, 
            chartType === 'barchart' ? styles.activeButtonText : null,
            width < 375 && styles.smallScreenText
          ]}>
            Histogramme
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chartButton, 
            chartType === 'camembert' ? styles.activeButton : null,
            width < 375 && styles.smallScreenButton
          ]}
          onPress={() => setChartType('camembert')}
        >
          <Text style={[
            styles.buttonText, 
            chartType === 'camembert' ? styles.activeButtonText : null,
            width < 375 && styles.smallScreenText
          ]}>
            Camembert
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={[styles.chartWrapper, { width: chartWidth }]}>
          {produits.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Aucune donnée disponible</Text>
              <Text style={styles.emptySubtext}>Ajoutez des produits pour visualiser les graphiques</Text>
            </View>
          ) : chartType === 'barchart' ? (
            <BarChart
              data={barChartData}
              width={chartWidth}
              height={chartHeight}
              yAxisLabel=""
              yAxisSuffix=" Ar" 
              chartConfig={chartConfig}
              verticalLabelRotation={width < 450 ? 45 : 30}
              style={styles.chart}
              fromZero
              showValuesOnTopOfBars={true}
            />
          ) : (
            <PieChart
              data={pieChartData}
              width={chartWidth}
              height={chartHeight}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft={width < 375 ? "5" : "15"}
              absolute
              style={styles.chart}
              hasLegend={width > 320}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.legendContainer}>
        <Text style={[styles.legendTitle, width < 375 && styles.smallScreenText]}>Valeur totale: </Text>
        <Text style={[styles.legendValue, width < 375 && { fontSize: 16 }]}>
          {produits.reduce((sum, p) => sum + (p.prix * p.quantite), 0).toFixed(2)} Ar
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#1E1E2E',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#2A2A3F',
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E4E4E6',
    marginBottom: 15,
    textAlign: 'center',
  },
  chartButtons: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chartButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: 'transparent',
    minWidth: 130,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A50',
  },
  smallScreenButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 100,
  },
  smallScreenText: {
    fontSize: 12,
  },
  activeButton: {
    backgroundColor: '#2A2A3F',
    borderColor: '#6D5ACF',
  },
  buttonText: {
    color: '#A0A0B0',
    fontWeight: '600',
    fontSize: 14,
  },
  activeButtonText: {
    color: '#6D5ACF',
    fontWeight: 'bold',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#2A2A3F',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3A3A50',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0A0B0',
  },
  legendValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6D5ACF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#2A2A3F',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3A50',
    width: '90%',
    height: 180,
  },
  emptyText: {
    fontSize: 16,
    color: '#E4E4E6',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#A0A0B0',
    textAlign: 'center',
  },
});

export default ChartVisualization;