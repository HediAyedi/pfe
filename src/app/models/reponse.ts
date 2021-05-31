export class Reponse {
  id: number;
  reponse: string;
  question_id: number;
  correct: boolean;
  selected: boolean;
  created_at: any;
  updated_at: any;

  constructor() {
    this.id = null;
    this.reponse = '';
    this.correct = false;
    this.selected = false;
    this.question_id = null;
  }
}
