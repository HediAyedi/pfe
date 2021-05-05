export class Candidat {
  id: number;
  nom: string;
  mot_de_passe: string;
  mot_de_passe_confirmation: string;
  email: string;
  civilite: string;
  motivation: string;
  telephone: number;
  image: any;
  date_naissance: Date;
  verifie: boolean;
  active: boolean;
  created_at:any;
  updated_at:any;


  constructor() {
    this.id = null;
    this.nom = '';
    this.mot_de_passe = '';
    this.mot_de_passe_confirmation = '';
    this.email = '';
    this.civilite = '';
    this.motivation = '';
    this.telephone = null;
    this.image = null;
    this.date_naissance = null;
    this.verifie = true;
    this.active = true;

  }
}
