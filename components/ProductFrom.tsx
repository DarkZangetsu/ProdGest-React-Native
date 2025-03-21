import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Produit } from '../types';
import ConfirmationDialog from './ConfirmationDialog';
import Toast from './Toast';

interface ProductFormProps {
  onSubmit: (produit: Omit<Produit, 'id' | 'montant' | 'created_at'>) => Promise<void>;
  editingProduit: Produit | null;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, editingProduit, onCancel }) => {
  const [numProduit, setNumProduit] = useState<string>('');
  const [design, setDesign] = useState<string>('');
  const [prix, setPrix] = useState<string>('');
  const [quantite, setQuantite] = useState<string>('');
  
  // États dialogue de confirmation
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>('');
  const [pendingData, setPendingData] = useState<Omit<Produit, 'id' | 'montant' | 'created_at'> | null>(null);
  // Dialogue pour validation des champs
  const [validationDialogVisible, setValidationDialogVisible] = useState<boolean>(false);
  
  // État pour le toast
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    if (editingProduit) {
      setNumProduit(editingProduit.num_produit);
      setDesign(editingProduit.design);
      setPrix(editingProduit.prix.toString());
      setQuantite(editingProduit.quantite.toString());
    } else {
      resetForm();
    }
  }, [editingProduit]);

  const resetForm = (): void => {
    setNumProduit('');
    setDesign('');
    setPrix('');
    setQuantite('');
  };

  const handleSubmit = (): void => {
    if (!numProduit || !design || !prix || !quantite) {
      // Afficher le dialogue de validation
      setValidationDialogVisible(true);
      return;
    }

    const prixNum = parseFloat(prix);
    const quantiteNum = parseInt(quantite);

    const produitData = {
      num_produit: numProduit,
      design,
      prix: prixNum,
      quantite: quantiteNum,
    };

    // Stocker les données en attente et afficher le dialogue de confirmation
    setPendingData(produitData);
    
    if (editingProduit) {
      setDialogMessage(`Confirmez la mise à jour du produit "${design}" ?`);
    } else {
      setDialogMessage(`Confirmez l'ajout du produit "${design}" ?`);
    }
    
    setDialogVisible(true);
  };

  const handleConfirm = async (): Promise<void> => {
    if (pendingData) {
      try {
        await onSubmit(pendingData);
        setDialogVisible(false);
        
        // Afficher le toast de confirmation
        setToastMessage(
          editingProduit 
            ? `Le produit "${pendingData.design}" a été mis à jour avec succès` 
            : `Le produit "${pendingData.design}" a été ajouté avec succès`
        );
        setToastVisible(true);
        
        resetForm();
      } catch (error) {
        // En cas d'erreur, on pourrait aussi afficher un toast d'erreur
        console.error("Erreur lors de la sauvegarde:", error);
      }
    }
  };

  const handleCancel = (): void => {
    setDialogVisible(false);
  };

  // Gestionnaire pour fermer le dialogue de validation
  const handleValidationDialogClose = (): void => {
    setValidationDialogVisible(false);
  };

  // Gestionnaire pour fermer le toast
  const handleToastDismiss = (): void => {
    setToastVisible(false);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>
        {editingProduit ? '📝 Édition Produit' : '✨ Nouveau Produit'}
      </Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Référence</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez la référence produit"
          placeholderTextColor="#909090"
          value={numProduit}
          onChangeText={setNumProduit}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Désignation</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez la désignation"
          placeholderTextColor="#909090"
          value={design}
          onChangeText={setDesign}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Prix</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          placeholderTextColor="#909090"
          value={prix}
          onChangeText={setPrix}
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Quantité</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor="#909090"
          value={quantite}
          onChangeText={setQuantite}
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.formButtonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Annuler</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>
            {editingProduit ? 'Mettre à jour' : 'Enregistrer'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dialogue de confirmation pour soumission */}
      <ConfirmationDialog
        visible={dialogVisible}
        message={dialogMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        type="info"
      />

      {/* Dialogue pour validation des champs */}
      <ConfirmationDialog
        visible={validationDialogVisible}
        message="Veuillez remplir tous les champs"
        onConfirm={handleValidationDialogClose}
        onCancel={handleValidationDialogClose}
        type="warning"
      />

      {/* Toast de confirmation */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type="success"
        duration={3000}
        onDismiss={handleToastDismiss}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#1E1E2E',
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E4E4E6',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 6,
    color: '#A0A0B0',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#3A3A50',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#2A2A3F',
    color: '#FFFFFF',
  },
  formButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#6D5ACF',
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4D4D65',
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#A0A0B0',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductForm;