export class Offres {
  id: number;
  genre: string;
  experience: string;
  niveau_education: string;
  description_emploi: string;
  exigence_emploi: string;
  etat: string;
  employeur_id: number;
  emploiTypes: any;
  langues: any;

  constructor() {
    this.id = null;
    this.genre = '';
    this.experience = '';
    this.niveau_education = '';
    this.description_emploi = '';
    this.exigence_emploi = '';
    this.etat =  '';
    this.employeur_id = null;
    this.emploiTypes = [];
    this.langues = [];

  }


}
