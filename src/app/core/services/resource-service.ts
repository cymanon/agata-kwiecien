import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../../shared/models/Post';
import { User } from '../../shared/models/User';
import { Comment } from '../../shared/models/Comment';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly baseUrl: string = 'https://jsonplaceholder.typicode.com';
  private readonly httpClient: HttpClient = inject(HttpClient);

  getPosts() {
    return this.httpClient.get<Array<Post>>(`${this.baseUrl}/posts`);
  }

  getUsers() {
    return this.httpClient.get<Array<User>>(`${this.baseUrl}/users`);
  }

  getComments(postId: number) {
    return this.httpClient.get<Array<Comment>>(`${this.baseUrl}/posts/${postId}/comments`);
  }
}
