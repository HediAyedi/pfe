import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
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

  // First page number declaration
  page=1;
  //Filter value
  term:string
  
  tests: Test[] = [];
  test = new Test();
  questions: Question[] = [];
  reponses: any;
  ajout_reponse = new Reponse();
  ajout_question = new Question();
  ajout_test = new Test();
  selected_reponse = new Reponse();
  test_id: any;
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
    this.findAllTests();
  }

  // GESTION TESTS

  public findTest(test_id) {
    this.testService.get(test_id).subscribe(res=>{

      this.questions= res.questions;
      this.reponses= res.reponses
    },err => {
      console.log(err);
    })
  }

  public findAllTests() {
    this.testService.getAll().subscribe(
      (data) => {
        this.tests = data;
        localStorage.setItem('testsCache', JSON.stringify(data));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ajouterTest() {
    this.testService.save(this.ajout_test).subscribe(
      (data) => {
        console.log('Test added', data);
        this.findAllTests();
        this.ajout_test=new Test();
        this.cancelTestAddDialog();
        this.gestionTestDialog(data);
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
        this.findAllTests();
        this.cancelTestEditDialog();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  supprimerTest(id) {
    this.testService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.findAllTests();
        this.cancelTestGestDialog();
        this.page=1
      },
      (err) => {
        console.log(err);
      }
    );
  }



  //GESTION TEST DIALOG
  gestionTestDialog(test: Test) {
    var modal = document.getElementById("gestTest");
    modal.style.display = "block";
    this.questions = test.questions;
    this.test_id = test.id;
    this.test=test;
    console.log("TEST:",test);
  }

  //AJOUT TEST DIALOG
  testAddDialog() {
    var modal = document.getElementById("addTest");
    modal.style.display = "block";
  }

  questionEditDialog(question: Question) {
    this.modif_question = question;
    console.log(this.modif_question);
    var modal = document.getElementById("editQuestion");
    modal.style.display = "block";
  }

  testEditDialog() {
    var modal = document.getElementById("editTest");
    modal.style.display = "block";
  }


  //Hides the test form modal
  cancelTestAddDialog(){
    var modal = document.getElementById("addTest");
    modal.style.display = "none";
    this.test = new Test();
  }

   //Hides the test form modal
   cancelTestEditDialog(){
    var modal = document.getElementById("editTest");
    modal.style.display = "none";
  }

  //Hides the test modal
  cancelTestGestDialog(){
    var modal = document.getElementById("gestTest");
    modal.style.display = "none";
    this.modif_question = new Question();
  }

  //Hides the question form modal
  cancelQuestionEditDialog(){
    var modal = document.getElementById("editQuestion");
    modal.style.display = "none";
    this.modif_question = new Question();
  }


  // GESTION REPONSES

  selectReponse(question,rep: Reponse) {
    this.questions.forEach((element) => {
      if (element.id == question.id) {
        element.reponses.forEach((element) => {
          if (element.id == rep.id) {
            this.selected_reponse = element;
            element.selected = !element.selected;
          }
        });
      }
    });
  }

  cancelReponse(question) {
    this.questions.forEach((element) => {
      if (element.id == question.id) {
        element.reponses.forEach((element) => {
          if (element.id == this.selected_reponse.id) {
            this.selected_reponse = element;
            element.selected = !element.selected;
          }
        });
      }
    });
    this.selected_reponse = new Reponse();
    this.findTest(this.test_id);
  }

  ajouterReponse(question) {
    this.ajout_reponse.question_id = question.id;
    this.reponseService.save(this.ajout_reponse).subscribe(
      (data) => {
        console.log('Reponse added', data);
        this.findAllTests();
        this.findTest(this.test_id);
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
      (data) => {
        console.log(data);
        this.findAllTests();
        this.findTest(this.test_id);
      },
      (err) => {
        console.log(err);
      }
    );
  }



  // GESTION QUESTIONS
  
  

  ajouterQuestion() {
    this.ajout_question.test_id = this.test_id;
    this.questionService.save(this.ajout_question).subscribe(
      (data) => {
        console.log('Quuestion added', data);
        this.findAllTests();
        this.findTest(this.test_id);
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
        console.log('Question edited', data);
        this.findAllTests();
        this.cancelQuestionEditDialog();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  supprimerQuestion(id) {
    this.questionService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.findAllTests();
        this.findTest(this.test_id);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
