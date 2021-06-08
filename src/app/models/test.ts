import { Question } from "./question";
import { Reponse } from "./reponse";

export class Test {
  id: number;
  domaine: string;
  questions: Question[] ;
  reponses: Reponse[];
  created_at: any;
  updated_at: any;

  constructor() {
    this.id = null;
    this.domaine = '';
    this.questions = [];
    this.reponses = [];
  }
}
