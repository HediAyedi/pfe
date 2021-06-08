import { Reponse } from "./reponse";

export class Question {
  id: number;
  test_id: number;
  question: string;
  reponses: Reponse[];
  created_at: any;
  updated_at: any;

  constructor() {
    this.id = null;
    this.test_id = null;
    this.question = '';
    this.reponses = [];
  }
}
