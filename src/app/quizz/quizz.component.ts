import { Component, OnInit } from '@angular/core';
import {QuizzService} from './quizz.service';
import {animate, style, transition, trigger} from '@angular/animations';

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

  result = false;
  resultStatus = 'Show Result';

  constructor(private quizzService: QuizzService) { }

  ngOnInit(): void {
    this.quizzes = this.quizzService.getQuizzes();
    this.currentQuiz = this.getRandom();

    this.prevAnswered.push(this.currentQuiz);
  }
  onAnswer(option: boolean){
    this.answerSelected = true;
    setTimeout(() => {
      let newQuiz = this.getRandom();
      while(this.prevAnswered.includes(newQuiz) && this.prevAnswered.length < 10){
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

  }

  getRandom(){
    return Math.floor(Math.random() * this.quizzes.length);
  }

  showResult(){
    this.result = true;
    this.resultStatus = 'Play Again!';
  }
  playAgain(){
    this.prevAnswered = [];
    this.prevAnswered.push(this.getRandom());
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
  }

}
