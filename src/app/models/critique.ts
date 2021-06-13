export class Critique {
    id: number;
    critique: string;
    candidature_id:number;
    visible:boolean;
    created_at:any;
    updated_at:any;
  
  
    constructor() {
      this.id = null;
      this.candidature_id=null;
      this.critique = '';
      this.visible = false;
  
    }
}
