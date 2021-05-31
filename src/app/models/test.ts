export class Test {
  id: number;
  domaine: string;
  questions: [];
  reponses: [];
  selected: boolean;
  created_at: any;
  updated_at: any;

  constructor() {
    this.id = null;
    this.domaine = '';
    this.selected=false;
    this.questions = [];
    this.reponses = [];
  }
}
