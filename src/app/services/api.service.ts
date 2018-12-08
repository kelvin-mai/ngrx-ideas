import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { AuthService } from '@app/services/auth.service';
import { User } from '@app/models/user';
import { Idea, IdeaDTO } from '@app/models/idea';

@Injectable()
export class ApiService {
  private api: string = environment.api_server + '/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private request(
    method: string,
    endpoint: string,
    body?: any
  ): Observable<any> {
    const url = `${this.api}/${endpoint}`;
    return this.http.request(method, url, {
      body,
      headers: { authorization: `Bearer ${this.auth.token}` }
    });
  }

  getUsers(page?: string): Observable<User[]> {
    const endpoint = page ? `users?page=${page}` : 'users';
    return this.request('GET', endpoint);
  }

  getUser(username: string): Observable<User> {
    return this.request('GET', `users/${username}`);
  }

  getIdeas(page?: number): Observable<Idea[]> {
    const endpoint = page ? `ideas?page=${page}` : 'ideas';
    return this.request('GET', endpoint);
  }

  getNewestIdeas(page?: number): Observable<Idea[]> {
    const endpoint = page ? `ideas/newest?page=${page}` : `ideas/newest`;
    return this.request('GET', endpoint);
  }

  getIdea(id: string): Observable<Idea> {
    return this.request('GET', `ideas/${id}`);
  }

  createIdea(data: IdeaDTO): Observable<Idea> {
    return this.request('POST', `ideas/`, data);
  }

  updateIdea(id: string, data: Partial<IdeaDTO>): Observable<Idea> {
    return this.request('PUT', `ideas/${id}`, data);
  }

  deleteIdea(id: string): Observable<Idea> {
    return this.request('DELETE', `ideas/${id}`);
  }

  upvoteIdea(id: string): Observable<Idea> {
    return this.request('POST', `ideas/${id}/upvote`);
  }

  downvoteIdea(id: string): Observable<Idea> {
    return this.request('POST', `ideas/${id}/downvote`);
  }

  bookmarkIdea(id: string): Observable<User> {
    return this.request('POST', `ideas/${id}/bookmark`);
  }

  unbookmarkIdea(id: string): Observable<User> {
    return this.request('DELETE', `ideas/${id}/bookmark`);
  }

  getCommentsByIdea(idea: string, page?: string): Observable<Comment[]> {
    const endpoint = page
      ? `comments/idea/${idea}?page=${page}`
      : `comments/idea/${idea}`;
    return this.request('GET', endpoint);
  }

  getCommentsByUser(user: string, page?: string): Observable<Comment[]> {
    const endpoint = page
      ? `comments/user/${user}?page=${page}`
      : `comments/user/${user}`;
    return this.request('GET', endpoint);
  }

  getComment(id: string): Observable<Comment> {
    return this.request('GET', `comments/${id}`);
  }

  createComment(idea: string, data): Observable<Comment> {
    return this.request('POST', `comments/idea/${idea}`, data);
  }

  deleteComment(id: string): Observable<Comment> {
    return this.request('DELETE', `comments/${id}`);
  }
}
