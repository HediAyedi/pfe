import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { QuestionService } from '../api/question.service';
import { NoteService } from '../api/note.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
  animations: [
    trigger('answer', [
      transition('void => *', [style({ opacity: 0, transform: 'translateY(-3rem)'}), animate(300)])
    ])
  ]
})
export class QuizzComponent implements OnInit {


  quizzes = [];
  currentQuiz:number;
  answerSelected = false;
  correctAnswers = 0;
  incorrectAnswers = 0;
  prevAnswered = [];
  note=new Note();

  constructor(
    private questionService: QuestionService,
    private noteService: NoteService) { }

  ngOnInit(): void {
    var test_id= JSON.parse(sessionStorage.getItem("test_id"));
    var candidat= JSON.parse(localStorage.getItem("candidat"));
    this.note.candidat_id=candidat.id;
    this.note.test_id=test_id;
    this.getQuestionsByTestId(test_id);
   
  }

  getQuestionsByTestId( id ){
    this.questionService.getAllByID(id).subscribe(res=>{
      this.quizzes=res;
      console.log("result:",this.quizzes);
      this.currentQuiz = this.getRandom();
      this.prevAnswered.push(this.currentQuiz);
    },err=>{
      console.log(err);
    })
  }

  onAnswer(option: boolean){
    this.answerSelected = true;
    setTimeout(() => {
      let newQuiz = this.getRandom();
      while(this.prevAnswered.includes(newQuiz) && this.prevAnswered.length < this.quizzes.length){
        newQuiz = this.getRandom();
      }
      this.currentQuiz = newQuiz;
      this.prevAnswered.push(this.currentQuiz);

      this.answerSelected = false;
    }, 300);

    if(option){
      this.correctAnswers++;
    }else{
      this.incorrectAnswers++;
    }

    //Saving the final note of the test
    if(this.prevAnswered.length == this.quizzes.length){
      if(this.quizzes.length==2){
        if(this.correctAnswers>=1){
          this.note.success=true;
          this.note.note= this.correctAnswers/this.quizzes.length*100;
          this.addNote();
        }
        else{
          this.note.note= this.correctAnswers/this.quizzes.length*100;
          console.log("NOTE:",this.note);
          this.addNote();
        }
      }
      else if(this.quizzes.length==3){
        if(this.correctAnswers>=2){
          this.note.success=true;
          this.note.note= this.correctAnswers/this.quizzes.length*100;
          console.log("NOTE:",this.note);
          this.addNote();
        }
        else{
          this.note.note= this.correctAnswers/this.quizzes.length*100;
          console.log("NOTE:",this.note);
          this.addNote();
        }
      }
      else {
        var final_note= this.correctAnswers/this.quizzes.length*100;
        if(final_note>=70){
          this.note.success=true;
          this.note.note= final_note;
          console.log("NOTE:",this.note);
          this.addNote();
        }
        else{
          this.note.note= this.correctAnswers/this.quizzes.length*100;
          console.log("NOTE:",this.note);
          this.addNote();
        }
      }

      
      
      
    }
  }

  getRandom(){
    return Math.floor(Math.random() * this.quizzes.length);
  }

  playAgain(){
    this.prevAnswered = [];
    this.prevAnswered.push(this.getRandom());
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
  }

  addNote(){
    this.noteService.save(this.note).subscribe(res=>{
      console.log(res)
    },err=>{
      console.log(err)
    })
  }
}
