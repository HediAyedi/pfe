import { Offre } from "./offre";

export class Employeur {
  id: number;
  nom: string;
  mot_de_passe: string;
  mot_de_passe_confirmation: string;
  email: string;
  adresse: string;
  nom_entreprise: string;
  description_entreprise: string;
  matricule: string;
  site_web: string;
  telephone: number;
  logo: string;
  verifie: boolean;
  active: boolean;
  secteur_id: number;
  emplois: Offre[];
  created_at:any;
  updated_at:any;

  constructor() {
    this.id = null;
    this.nom = '';
    this.mot_de_passe = '';
    this.mot_de_passe_confirmation = '';
    this.adresse = '';
    this.email = '';
    this.nom_entreprise = '';
    this.description_entreprise = '';
    this.matricule = '';
    this.site_web = '';
    this.telephone = null;
    this.logo = null;
    this.verifie = false;
    this.active = true;
    this.secteur_id = null;
    this.emplois=[];

  }


}
