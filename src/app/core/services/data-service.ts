import { computed, effect, inject, Injectable, signal, Signal } from '@angular/core';
import { ResourceService } from './resource-service';
import { of, switchMap } from 'rxjs';
import { User } from '../../shared/models/User';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Post } from '../../shared/models/Post';
import { Comment } from '../../shared/models/Comment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly resourceService: ResourceService = inject(ResourceService);
  private cachedComments = signal<Record<number, Comment[]>>({});

  commentIdToBeCached = signal<number | undefined>(undefined);
  posts: Signal<Post[] | undefined> = toSignal(this.resourceService.getPosts());
  users: Signal<User[] | undefined> = toSignal(this.resourceService.getUsers());
  loading: Signal<boolean> = computed(() => !this.posts() || !this.users());
  comments: Signal<Record<number, Comment[]>> = this.cachedComments.asReadonly();

  constructor() {
    effect(() => {
      const id = this.commentIdToBeCached();
      const comments = this.currentComments();

      if (id && comments.length > 0) {
        // TBD placeholder for no comments ?
        this.cachedComments.update((existing) => ({
          ...existing,
          [id]: comments,
        }));
      }
    });
  }

  setCommentIdToBeCached(id: number | undefined) {
    this.commentIdToBeCached.set(id);
  }

  private currentComments = toSignal(
    toObservable(this.commentIdToBeCached).pipe(
      switchMap((id) => (id ? this.resourceService.getComments(id) : of([])))
    ),
    { initialValue: [] }
  );
}
