export class Candidat {
  id: number;
  nom: string;
  mot_de_passe: string;
  mot_de_passe_confirmation: string;
  email: string;
  verifie: boolean;

  constructor(){
    this.id = null;
    this.nom = '';
    this.mot_de_passe = '';
    this.mot_de_passe_confirmation = '';
    this.email = '';
    this.verifie = true;

  }
}
