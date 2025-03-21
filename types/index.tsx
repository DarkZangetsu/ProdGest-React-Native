export interface Produit {
    id: number;
    num_produit: string;
    design: string;
    prix: number;
    quantite: number;
    montant?: number;
    created_at?: string;
  }
  
  export interface StatistiquesResult {
    min: number;
    max: number;
    total: number;
  }
  
  export interface ChartDataset {
    data: number[];
    color: (opacity?: number) => string;
  }
  
  export interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
  }