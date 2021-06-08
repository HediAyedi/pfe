import { Candidat } from "./candidat";

export class Candidature {
    id: number;
    cv: any;
    lettre_motivation: string;
    status: string;
    emploi_id: number;
    candidat_id: number;
    candidat: Candidat;
    created_at:any;
    updated_at:any;
  
  
    constructor() {
      this.id = null;
      this.cv = null;
      this.candidat=null;
      this.lettre_motivation = '';
      this.status = 'not_selected';
      this.candidat_id = null;
      this.emploi_id = null;
  
    }
  }
  