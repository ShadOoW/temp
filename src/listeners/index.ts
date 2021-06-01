import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SessionDto } from '@education/sessions/dto/session.dto';
import { RequestDto } from '@users/requests/dto/request.dto';
import { CreateEvents } from './create-event';
import { QuizDto } from '@education/quizzes/dto/quiz.dto';
import { QuizSolutionDto } from '@education/quizSolution/dto/quizSolution.dto';

@Injectable()
export class Listeners {
  constructor(private createEvent: CreateEvents) {}
  /// Request Events
  @OnEvent('request.created')
  async handleRequestCreatedEvent(request: RequestDto) {
    await this.createEvent.request(request, 'created');
  }

  @OnEvent('request.updated')
  async handleRequestUpdatedEvent(request: RequestDto) {
    await this.createEvent.request(request, 'updated');
  }

  @OnEvent('request.deleted')
  async handleRequestDeletedEvent(request: RequestDto) {
    await this.createEvent.request(request, 'deleted');
  }
  /// Session Events
  @OnEvent('session.created')
  async handleSessionCreatedEvent(session: SessionDto) {
    await this.createEvent.session(session, 'created');
  }

  @OnEvent('session.updated')
  async handleSessionUpdatedEvent(session: SessionDto) {
    await this.createEvent.session(session, 'updated');
  }

  @OnEvent('session.deleted')
  async handleSessionDeletedEvent(session: SessionDto) {
    await this.createEvent.session(session, 'deleted');
  }
  /// Message Events
  @OnEvent('message.created')
  async handleMessageCreatedEvent(message) {
    await this.createEvent.message(message, 'created');
  }
  /// Quiz Events
  @OnEvent('quiz.created')
  async handleQuizCreatedEvent(quiz: QuizDto) {
    await this.createEvent.quiz(quiz, 'created');
  }

  @OnEvent('quiz.updated')
  async handleQuizUpdatedEvent(quiz: QuizDto) {
    await this.createEvent.quiz(quiz, 'updated');
  }

  /// Quiz Events
  @OnEvent('quizSolution.created')
  async handleQuizSolutionCreatedEvent(quizSolution: QuizSolutionDto) {
    await this.createEvent.quizSolution(quizSolution, 'created');
  }

  @OnEvent('quizSolution.updated')
  async handleQuizSolutionUpdatedEvent(quizSolution: QuizSolutionDto) {
    await this.createEvent.quizSolution(quizSolution, 'updated');
  }
}
