import { computed, inject, Injectable, Signal } from '@angular/core';
import { ResourceService } from './resource-service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/User';
import { toSignal } from '@angular/core/rxjs-interop';
import { Post } from '../../shared/models/Post';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly resourceService: ResourceService = inject(ResourceService);

  posts: Signal<Post[] | undefined> = toSignal(this.resourceService.getPosts());
  users: Signal<User[] | undefined> = toSignal(this.resourceService.getUsers());
  loading: Signal<boolean> = computed(() => !this.posts() || !this.users());
}
