import { Experience } from "./experience";

export class Cv {
    id: number;
    niveau_experience: string;
    niveau_education: string;
    status: string;
    salaire: number;
    nbre_annee: number;
    candidat_id: number;
    competences:any[];
    domaines:any[];
    emploi_types:any[];
    langues:any[];
    experiences:Experience[];
    created_at:any;
    updated_at:any;
  
  
    constructor() {
      this.id = null;
      this.niveau_education = '';
      this.niveau_experience = '';
      this.status = '';
      this.salaire = null;
      this.nbre_annee = null;
      this.candidat_id = null;
  
    }
  }
  