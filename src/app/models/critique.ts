export class Critique {
    id: number;
    critique: string;
    candidat_id:number;
    candidature_id:number;
    visible:boolean;
    created_at:any;
    updated_at:any;
  
  
    constructor() {
      this.id = null;
      this.candidat_id=null;
      this.candidature_id=null;
      this.critique = '';
      this.visible = false;
  
    }
}
