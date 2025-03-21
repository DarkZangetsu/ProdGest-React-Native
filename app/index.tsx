import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  ActivityIndicator, 
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import ProductForm from '../components/ProductFrom';
import ProductList from '../components/ProductList';
import Statistics from '../components/Statistics';
import ChartVisualization from '../components/ChartVisualization';

// Constants and types
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants/supabase';
import { Produit, StatistiquesResult } from '../types';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default function Index() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduit, setEditingProduit] = useState<Produit | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('produits')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Calculate amount for each product
      const produitsAvecMontant = data.map((produit: Produit) => ({
        ...produit,
        montant: produit.prix * produit.quantite
      }));
      
      setProduits(produitsAvecMontant);
    } catch (error: any) {
      console.error('Erreur lors du chargement des produits:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const calculerStatistiques = (): StatistiquesResult => {
    if (produits.length === 0) return { min: 0, max: 0, total: 0 };
    
    const montants = produits.map(p => p.prix * p.quantite);
    return {
      min: Math.min(...montants),
      max: Math.max(...montants),
      total: montants.reduce((sum, current) => sum + current, 0)
    };
  };

  const handleSubmit = async (produitData: Omit<Produit, 'id' | 'montant' | 'created_at'>): Promise<void> => {
    try {
      setLoading(true);
      
      let result;
      
      if (editingProduit) {
        result = await supabase
          .from('produits')
          .update(produitData)
          .eq('id', editingProduit.id);
      } else {
        result = await supabase
          .from('produits')
          .insert(produitData);
      }

      if (result.error) throw result.error;
      
      fetchProduits();
      setEditingProduit(null);
    } catch (error: any) {
      console.error('Erreur lors de l\'enregistrement du produit:', error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const editProduit = (produit: Produit): void => {
    setEditingProduit(produit);
  };

  const deleteProduit = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('produits')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      fetchProduits();
    } catch (error: any) {
      console.error('Erreur lors de la suppression du produit:', error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProduits();
  };

  const stats = calculerStatistiques();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1E2E" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>ProdGest</Text>
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={handleRefresh}
            disabled={loading || refreshing}
          >
            <Text style={styles.refreshButtonText}>🔄 Actualiser</Text>
          </TouchableOpacity>
        </View>
        
        <ProductForm 
          onSubmit={handleSubmit} 
          editingProduit={editingProduit} 
          onCancel={() => setEditingProduit(null)}
        />

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📋 Liste des produits</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{produits.length} produit{produits.length !== 1 ? 's' : ''}</Text>
            </View>
          </View>
          
          {loading ? (
            <View style={styles.statusContainer}>
              <ActivityIndicator size="large" color="#6D5ACF" style={styles.loader} />
              <Text style={styles.statusText}>Chargement en cours...</Text>
            </View>
          ) : error ? (
            <View style={styles.statusContainer}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchProduits}>
                <Text style={styles.retryButtonText}>Réessayer</Text>
              </TouchableOpacity>
            </View>
          ) : produits.length === 0 ? (
            <View style={styles.statusContainer}>
              <Text style={styles.emptyText}>Aucun produit trouvé</Text>
              <Text style={styles.emptyDescription}>Ajoutez votre premier produit en utilisant le formulaire ci-dessus</Text>
            </View>
          ) : (
            <ProductList 
              produits={produits} 
              onEdit={editProduit} 
              onDelete={deleteProduit} 
            />
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>📊 Statistiques</Text>
          <Statistics stats={stats} />
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>📈 Visualisation</Text>
          <ChartVisualization produits={produits} />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>ProdGest © 2025</Text>
          <Text style={styles.footerSubtext}>Gestion de produits simplifiée</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121222',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingTop: 10,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E4E4E6',
    letterSpacing: 0.5,
  },
  refreshButton: {
    backgroundColor: '#2A2A3F',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3A3A50',
  },
  refreshButtonText: {
    color: '#A0A0B0',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionContainer: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    marginBottom: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#2A2A3F',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E4E4E6',
    marginBottom: 15,
  },
  countBadge: {
    backgroundColor: '#2A2A3F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3A50',
  },
  countText: {
    fontSize: 14,
    color: '#A0A0B0',
    fontWeight: '600',
  },
  statusContainer: {
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#2A2A3F',
    borderWidth: 1,
    borderColor: '#3A3A50',
  },
  loader: {
    marginBottom: 15,
  },
  statusText: {
    color: '#A0A0B0',
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  emptyText: {
    color: '#A0A0B0',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  emptyDescription: {
    color: '#6D6D8D',
    textAlign: 'center',
    fontSize: 14,
  },
  retryButton: {
    backgroundColor: '#3D3D5D',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  retryButtonText: {
    color: '#E4E4E6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: '#6D6D8D',
    fontSize: 14,
    fontWeight: '600',
  },
  footerSubtext: {
    color: '#4D4D65',
    fontSize: 12,
    marginTop: 5,
  },
});