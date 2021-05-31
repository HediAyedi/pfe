import { Injectable } from '@angular/core';

interface Quizz{
  question: string;
  reponses: { reponse: string, correct: boolean } [];
}

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  quizzes: Quizz[] = [
    {
      question: 'What\'s the capital of Somalia',
      reponses: [
        { reponse: 'Nairobi', correct: false },
        { reponse: 'Asmara', correct: false },
        { reponse: 'Mogadishu', correct: true },
        { reponse: 'Addis Ababa', correct: false },
      ]
    },
    {
      question: 'What\'s the capital of Mexico',
      reponses: [
        { reponse: 'Guadalajara City', correct: false },
        { reponse: 'Puebla City', correct: false },
        { reponse: 'Mexico City', correct: true },
        { reponse: 'Cancún', correct: false },
      ]
    },
    {
      question: 'What\'s the capital of the UK',
      reponses: [
        { reponse: 'London', correct: true },
        { reponse: 'Asmara', correct: false },
        { reponse: 'Paris', correct: false },
        { reponse: 'Berlin', correct: false }
      ]
    },
    {
      question: 'What\'s the capital of the USA',
      reponses: [
        { reponse: 'Los Angeles', correct: false },
        { reponse: 'New York', correct: false },
        { reponse: 'Washington DC', correct: true },
        { reponse: 'Boston', correct: false }
      ]
    },
    {
      question: 'What\'s the capital of the UAE',
      reponses: [
        { reponse: 'Dubai', correct: false },
        { reponse: 'Abu Dhabi', correct: true },
        { reponse: 'Doha', correct: false },
        { reponse: 'Riyadh', correct: false }
      ]
    },
    {
      question: 'What\'s the capital of Japan',
      reponses: [
        { reponse: 'Osaka', correct: false },
        { reponse: 'Seoul', correct: false },
        { reponse: 'Tokyo', correct: true },
        { reponse: 'Pyongyang', correct: false }
      ]
    },
    {
      question: 'What\'s the capital of South Africa',
      reponses: [
        { reponse: 'Maputo', correct: false },
        { reponse: 'Johannesburg', correct: false },
        { reponse: 'Pretoria', correct: true },
        { reponse: 'Cape Town', correct: false }
      ]
    },
    {
      question: 'What\'s the capital of Brazil',
      reponses: [
        { reponse: 'Buenos Aires', correct: false },
        { reponse: 'Sao Paulo', correct: false },
        { reponse: 'Brasília', correct: true },
        { reponse: 'Rio de Janeiro', correct: false },
      ]
    },
    {
      question: 'What\'s the capital of Jamaica',
      reponses: [
        { reponse: 'Brasília', correct: false },
        { reponse: 'Portmore ', correct: false },
        { reponse: 'Asunción', correct: true },
        { reponse: 'Saint Catherine ', correct: false }
      ]
    },
    {
      question: 'What\'s the capital of Cuba',
      reponses: [
        { reponse: 'Montevideo', correct: false },
        { reponse: 'Santa Clara', correct: false },
        { reponse: 'Havana', correct: true },
        { reponse: 'Camagüey', correct: false }
      ]
    }
  ];



  getQuizzes(){
    return this.quizzes;
  }
}
