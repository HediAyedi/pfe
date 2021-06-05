export class Candidature {
    id: number;
    cv: any;
    lettre_motivation: string;
    status: string;
    emploi_id: number;
    candidat_id: number;
    created_at:any;
    updated_at:any;
  
  
    constructor() {
      this.id = null;
      this.cv = null;
      this.lettre_motivation = '';
      this.status = 'not_selected';
      this.candidat_id = null;
      this.emploi_id = null;
  
    }
  }
  