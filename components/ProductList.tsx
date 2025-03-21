// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Produit } from '../types';

// interface ProductListProps {
//   produits: Produit[];
//   onEdit: (produit: Produit) => void;
//   onDelete: (id: number) => void;
// }

// const ProductList: React.FC<ProductListProps> = ({ produits, onEdit, onDelete }) => {
//   if (produits.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>Aucun produit disponible</Text>
//         <Text style={styles.emptySubtext}>Ajoutez un nouveau produit pour commencer</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>📋 Catalogue Produits</Text>
//       <FlatList
//         data={produits}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <View style={styles.itemHeader}>
//               <View style={styles.idBadge}>
//                 <Text style={styles.itemId}>{item.num_produit}</Text>
//               </View>
//               <Text style={styles.itemName}>{item.design}</Text>
//             </View>
            
//             <View style={styles.itemDetails}>
//               <View style={styles.detailRow}>
//                 <View style={styles.detailCol}>
//                   <Text style={styles.detailLabel}>Prix unitaire</Text>
//                   <Text style={styles.detailValue}>{item.prix.toFixed(2)} Ar</Text>
//                 </View>
//                 <View style={styles.detailCol}>
//                   <Text style={styles.detailLabel}>Quantité en stock</Text>
//                   <Text style={styles.detailValue}>{item.quantite}</Text>
//                 </View>
//               </View>
              
//               <View style={styles.totalWrapper}>
//                 <Text style={styles.totalLabel}>Valeur totale</Text>
//                 <Text style={styles.totalValue}>
//                   {(item.prix * item.quantite).toFixed(2)} Ar
//                 </Text>
//               </View>
//             </View>
            
//             <View style={styles.actions}>
//               <TouchableOpacity 
//                 style={[styles.button, styles.editButton]} 
//                 onPress={() => onEdit(item)}
//               >
//                 <Text style={styles.editButtonText}>Modifier</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.button, styles.deleteButton]} 
//                 onPress={() => onDelete(item.id)}
//               >
//                 <Text style={styles.deleteButtonText}>Supprimer</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 10,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#E4E4E6',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   item: {
//     backgroundColor: '#1E1E2E',
//     padding: 18,
//     borderRadius: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 8,
//     elevation: 6,
//     borderWidth: 1,
//     borderColor: '#2A2A3F',
//   },
//   itemHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#2A2A3F',
//     paddingBottom: 12,
//   },
//   idBadge: {
//     backgroundColor: '#2A2A3F',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 8,
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: '#3A3A50',
//   },
//   itemId: {
//     fontSize: 14,
//     color: '#A0A0B0',
//     fontWeight: '600',
//   },
//   itemName: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     flex: 1,
//   },
//   itemDetails: {
//     marginBottom: 16,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   detailCol: {
//     flex: 1,
//   },
//   detailLabel: {
//     fontSize: 13,
//     color: '#A0A0B0',
//     marginBottom: 4,
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#E4E4E6',
//     fontWeight: '500',
//   },
//   totalWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#2A2A3F',
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 8,
//     borderWidth: 1,
//     borderColor: '#3A3A50',
//   },
//   totalLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#A0A0B0',
//   },
//   totalValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#6D5ACF',
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 4,
//   },
//   button: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: 100,
//   },
//   editButton: {
//     backgroundColor: 'transparent',
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#3A3A50',
//   },
//   deleteButton: {
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: '#3A3A50',
//   },
//   editButtonText: {
//     color: '#6D5ACF',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   deleteButtonText: {
//     color: '#E06C75',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 30,
//     backgroundColor: '#1E1E2E',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#2A2A3F',
//     marginVertical: 20,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#E4E4E6',
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: '#A0A0B0',
//     textAlign: 'center',
//   },
// });

// export default ProductList;


import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  TextInput,
  useWindowDimensions 
} from 'react-native';
import { Produit } from '../types';
import ConfirmationDialog from './ConfirmationDialog';
import Toast from './Toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProductListProps {
  produits: Produit[];
  onEdit: (produit: Produit) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ produits, onEdit, onDelete }) => {
  // États pour les dialogues et toasts
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProductName, setSelectedProductName] = useState<string>('');
  
  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Produit[]>(produits);
  
  // Gestion responsive avec hook dimensions
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  // Filtrer les produits lorsque la requête de recherche change
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(produits);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase().trim();
      const filtered = produits.filter((item) => 
        item.design.toLowerCase().includes(lowercaseQuery) || 
        item.num_produit.toString().includes(lowercaseQuery) ||
        item.prix.toString().includes(lowercaseQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, produits]);

  // Gérer la demande de suppression
  const handleDeleteRequest = (produit: Produit) => {
    setSelectedProductId(produit.id);
    setSelectedProductName(produit.design);
    setConfirmDeleteVisible(true);
  };

  // Confirmer la suppression
  const confirmDelete = () => {
    if (selectedProductId !== null) {
      onDelete(selectedProductId);
      setConfirmDeleteVisible(false);
      
      // Afficher le toast de confirmation
      setToastMessage(`Le produit "${selectedProductName}" a été supprimé avec succès`);
      setToastType('success');
      setToastVisible(true);
    }
  };

  // Calculer les largeurs des colonnes en fonction de la taille de l'écran
  const getColumnWidths = () => {
    if (isTablet) {
      return {
        id: 100,
        designation: 300,
        prix: 150,
        quantite: 120,
        total: 200,
        actions: 160
      };
    } else {
      return {
        id: 100,
        designation: 220,
        prix: 120,
        quantite: 120,
        total: 150,
        actions: 140
      };
    }
  };

  const columnWidths = getColumnWidths();

  // Gérer le dismiss du toast
  const handleDismissToast = () => {
    setToastVisible(false);
  };

  if (produits.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="package-variant" size={48} color="#A0A0B0" />
        <Text style={styles.emptyText}>Aucun produit disponible</Text>
        <Text style={styles.emptySubtext}>Ajoutez un nouveau produit pour commencer</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Catalogue Produits</Text>
      
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#A0A0B0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un produit..."
          placeholderTextColor="#A0A0B0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={() => setSearchQuery('')}
            accessibilityLabel="Effacer la recherche"
          >
            <Icon name="close-circle" size={16} color="#A0A0B0" />
          </TouchableOpacity>
        )}
      </View>
      
      {filteredProducts.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Icon name="file-search-outline" size={36} color="#A0A0B0" />
          <Text style={styles.noResultsText}>Aucun résultat trouvé pour "{searchQuery}"</Text>
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={() => setSearchQuery('')}
          >
            <Text style={styles.resetButtonText}>Réinitialiser la recherche</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.tableContainer}>
            {/* En-tête du tableau */}
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { width: columnWidths.id }]}>ID</Text>
              <Text style={[styles.headerCell, { width: columnWidths.designation }]}>Désignation</Text>
              <Text style={[styles.headerCell, { width: columnWidths.prix }]}>Prix unitaire</Text>
              <Text style={[styles.headerCell, { width: columnWidths.quantite }]}>Quantité</Text>
              <Text style={[styles.headerCell, { width: columnWidths.total }]}>Valeur totale</Text>
              <Text style={[styles.headerCell, { width: columnWidths.actions }]}>Actions</Text>
            </View>
            
            {/* Corps du tableau */}
            <ScrollView style={styles.tableBody}>
              {filteredProducts.map((item) => (
                <View key={item.id.toString()} style={styles.tableRow}>
                  <View style={[styles.cell, { width: columnWidths.id }]}>
                    <View style={styles.idBadge}>
                      <Text style={styles.itemId}>{item.num_produit}</Text>
                    </View>
                  </View>
                  
                  <Text style={[styles.cell, styles.nameCell, { width: columnWidths.designation, textAlign: 'center' }]}>
                    {item.design}
                  </Text>
                  
                  <Text style={[styles.cell, { width: columnWidths.prix, textAlign: 'center' }]}>
                    {item.prix.toFixed(2)} Ar
                  </Text>
                  
                  <Text style={[styles.cell, { width: columnWidths.quantite, textAlign: 'center' }]}>
                    {item.quantite}
                  </Text>
                  
                  <Text style={[styles.cell, styles.totalCell, { width: columnWidths.total, textAlign: 'center' }]}>
                    {(item.prix * item.quantite).toFixed(2)} Ar
                  </Text>
                  
                  <View style={[styles.cell, styles.actionCell, { width: columnWidths.actions }]}>
                    <TouchableOpacity 
                      style={[styles.iconButton, styles.editButton]} 
                      onPress={() => onEdit(item)}
                      accessibilityLabel={`Modifier ${item.design}`}
                    >
                      <Icon name="pencil-outline" size={isTablet ? 20 : 18} color="#6D5ACF" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.iconButton, styles.deleteButton]} 
                      onPress={() => handleDeleteRequest(item)}
                      accessibilityLabel={`Supprimer ${item.design}`}
                    >
                      <Icon name="trash-can-outline" size={isTablet ? 20 : 18} color="#E06C75" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}

      {/* Statistiques en bas du tableau - visible uniquement sur tablette */}
      {isTablet && filteredProducts.length > 0 && (
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="cube-outline" size={18} color="#A0A0B0" />
            <Text style={styles.statLabel}>Total produits</Text>
            <Text style={styles.statValue}>{filteredProducts.length}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Icon name="cash" size={18} color="#A0A0B0" />
            <Text style={styles.statLabel}>Valeur totale</Text>
            <Text style={styles.statValue}>
              {filteredProducts.reduce((sum, item) => sum + (item.prix * item.quantite), 0).toFixed(2)} Ar
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Icon name="cube-scan" size={18} color="#A0A0B0" />
            <Text style={styles.statLabel}>Stock total</Text>
            <Text style={styles.statValue}>
              {filteredProducts.reduce((sum, item) => sum + item.quantite, 0)}
            </Text>
          </View>
        </View>
      )}

      {/* Dialogue de confirmation pour la suppression */}
      <ConfirmationDialog
        visible={confirmDeleteVisible}
        message={`Êtes-vous sûr de vouloir supprimer "${selectedProductName}" ?`}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDeleteVisible(false)}
        type="warning"
      />

      {/* Toast de confirmation */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        duration={3000}
        onDismiss={handleDismissToast}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    position: 'relative',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E4E4E6',
    marginBottom: 15,
    textAlign: 'center',
  },
  // Section recherche
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A3F',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#3A3A50',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: '#E4E4E6',
    fontSize: 15,
  },
  clearButton: {
    padding: 8,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A3F',
    marginVertical: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#E4E4E6',
    marginVertical: 12,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#2A2A3F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3A3A50',
    marginTop: 8,
  },
  resetButtonText: {
    color: '#A0A0B0',
    fontSize: 14,
    fontWeight: '500',
  },
  // Tableau de produits
  scrollViewContent: {
    flexGrow: 1,
  },
  tableContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A3F',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2A2A3F',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#3A3A50',
  },
  headerCell: {
    padding: 15,
    color: '#A0A0B0',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  tableBody: {
    maxHeight: 500,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A3F',
    backgroundColor: '#1E1E2E',
  },
  cell: {
    color: '#FFFFFF',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameCell: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  totalCell: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  actionCell: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  idBadge: {
    backgroundColor: '#2A2A3F',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3A3A50',
  },
  itemId: {
    fontSize: 14,
    color: '#A0A0B0',
    fontWeight: '600',
    textAlign: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#3A3A50',
    backgroundColor: '#2A2A3F',
  },
  editButton: {
    borderColor: '#6D5ACF33',
  },
  deleteButton: {
    borderColor: '#E06C7533',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A3F',
    marginVertical: 20,
    minHeight: 200,
  },
  emptyText: {
    fontSize: 18,
    color: '#E4E4E6',
    fontWeight: '600',
    marginVertical: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#A0A0B0',
    textAlign: 'center',
  },
  
  // Styles pour les statistiques (tablette uniquement)
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#2A2A3F',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statLabel: {
    color: '#A0A0B0',
    fontSize: 14,
    marginVertical: 4,
  },
  statValue: {
    color: '#E4E4E6',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductList;