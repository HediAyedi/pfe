import { Question } from "./question";
import { Reponse } from "./reponse";

export class Test {
  id: number;
  domaine: string;
  questions: Question[] ;
  created_at: any;
  updated_at: any;

  constructor() {
    this.id = null;
    this.domaine = '';
    this.questions = [];
  }
}
