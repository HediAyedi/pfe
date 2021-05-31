export class Experience {

    id: number;
    nom_entreprise: string;
    nbre_annee: string;
    poste: string;
    description: string;
    date_debut: string;
    date_fin: string;
    selected: boolean;
    en_cours: boolean;
    cv_id: number;
    created_at:any;
    updated_at:any;
  
    constructor() {
      this.id = null;
      this.nom_entreprise = '';
      this.description = '';
      this.nbre_annee = '';
      this.date_debut = null;
      this.date_fin = null;
      this.selected = false;
      this.en_cours = false;
    }
}
