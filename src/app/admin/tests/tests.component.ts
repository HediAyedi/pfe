import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Test } from '../../models/test';
import { TestService } from '../../api/test.service';
import { ReponseService } from '../../api/reponse.service';
import { QuestionService } from '../../api/question.service';
import { Question } from '../../models/question';
import { Reponse } from '../../models/reponse';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css'],
})
export class TestsComponent implements OnInit {
  tests: Test[] = [];
  test = new Test();
  questions: Question[] = [];
  reponses: any;
  ajout_reponse = new Reponse();
  ajout_question = new Question();
  ajout_test = new Test();
  selected_reponse = new Reponse();
  test_id: any;
  display: boolean = false;
  display2: boolean = false;
  questionModifDisplay: boolean = false;
  testModifDisplay: boolean = true;
  modif_question = new Question();

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private testService: TestService,
    private reponseService: ReponseService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.tests = JSON.parse(localStorage['testsCache'] || '[]');

    if (this.tests.length == 0) {
      this.findAllTests();
    }
  }




// GESTION TESTS 
  public findAllTests() {
    this.testService.getAll().subscribe(
      (data) => {
        this.tests = data;
        localStorage.setItem('testsCache', JSON.stringify(data));
        if(this.test_id){
          this.tests.forEach(item=> {
            if(item.id == this.test_id) {
              item.selected=true
            }
          })
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

    ajouterTest() {
      console.log(this.test)
    this.testService.save(this.test).subscribe(
      (data) => {
        console.log('Test added', data);
        data.selected=true;
        this.tests.push(data)
        this.testService.getAllCache();
        this.display2=false;
        this.showDialog(data)
      },
      (err) => {
        console.log(err);
      }
    );
  }


  modifierTest(test) {
    
    this.testService.update(test, test.id).subscribe(
      (data) => {
        console.log('Test edited', data);

        //modification de test au niveau de frontend 
        this.tests.forEach(item=> {
          if(item.id == test.id) {
            item = data
            item.selected=true
          }
        })
        this.testModifDisplay=false;
      },
      (err) => {
        console.log(err);
      }
    );
    this.selected_reponse = new Reponse();
  }

  supprimerTest(id) {
    this.testService.delete(id).subscribe(
      (data) => {},
      (err) => {
        console.log(err);
        this.findAllTests();
        this.display = false;

      }
    );
  }


 
//GESTION TEST DIALOG
  showDialog(test: Test) {
    this.display = true;
    this.testModifDisplay = false;
    this.questions = test.questions;
    this.test_id = test.id;
    this.reponses = test.reponses;
  }

  //AJOUT TEST DIALOG
  testAddDialog() {
    this.display2 = true;
  }

  questionModifDialog( question: Question) {
    this.modif_question=question
    this.questionModifDisplay = true;
  }

  testModifDialog() {
    this.testModifDisplay = true;
  }



// GESTION REPONSES 
  public findReponses() {
    this.reponseService.getAll().subscribe(
      (data) => {
        this.reponses = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectReponse(rep: Reponse) {
    this.reponses.forEach((element) => {
      if (element.id == rep.id) {
        this.selected_reponse = element;
        element.selected = !element.selected;
      }
    });
  }

  cancelReponse() {
    this.reponses.forEach((element) => {
      if (element.id == this.selected_reponse.id) {
        element = this.selected_reponse;
        element.selected = false;
      }
    });
    this.selected_reponse = new Reponse();
    this.findReponses();
  }

  
  ajouterReponse(question) {
    this.ajout_reponse.question_id = question.id;
    this.reponseService.save(this.ajout_reponse).subscribe(
      (data) => {
        console.log('Reponse added', data);
        this.testService.getAllCache();
        this.findReponses();
        this.ajout_reponse = new Reponse();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  modifierReponse(reponse) {
    reponse.selected = false;
    this.reponseService.update(reponse, reponse.id).subscribe(
      (data) => {
        console.log('Reponse edited', data);
        this.findAllTests();
      },
      (err) => {
        console.log(err);
      }
    );
    this.selected_reponse = new Reponse();
  }

  supprimerReponse(id) {
    this.reponseService.delete(id).subscribe(
      (data) => {},
      (err) => {
        console.log(err);
        this.findAllTests();
        this.findReponses();
      }
    );
  }



// GESTION QUESTIONS

  public findQuestions(test_id) {
    this.questionService.getAll().subscribe(
      (data) => {
        this.questions = [];
        data.forEach((ques) => {
          if (ques.test_id == test_id) {
            this.questions.push(ques);
            console.log('Please work bbitch', this.questions);
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ajouterQuestion(test) {
    this.ajout_question.test_id = this.test_id;
    this.questionService.save(this.ajout_question).subscribe(
      (data) => {
        console.log('Quuestion added', data);
        this.findAllTests();
        this.findQuestions(this.test_id);
        this.ajout_question = new Question();
      },
      (err) => {
        console.log(err);
      }
    );
  }


  modifierQuestion(question) {
    
    this.questionService.update(question, question.id).subscribe(
      (data) => {
        console.log('Reponse edited', data);
        this.findAllTests();

        this.questionModifDisplay=false;
      },
      (err) => {
        console.log(err);
      }
    );
    this.selected_reponse = new Reponse();
  }

  supprimerQuestion(id) {
    this.questionService.delete(id).subscribe(
      (data) => {},
      (err) => {
        console.log(err);
        this.findAllTests();
        this.findQuestions(this.test_id);
      }
    );
  }


  
}
