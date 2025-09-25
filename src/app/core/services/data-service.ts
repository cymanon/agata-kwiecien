import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ResourceService } from './resource-service';
import { filter, switchMap } from 'rxjs';
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
  private filters = signal<{
    searchText: string;
    userId: number | undefined;
    showOnlyFavorites: boolean;
  }>({
    searchText: '',
    userId: undefined,
    showOnlyFavorites: false,
  });

  commentIdToBeCached = signal<number | undefined>(undefined);
  posts: Signal<Post[] | undefined> = toSignal(this.resourceService.getPosts());
  users: Signal<User[] | undefined> = toSignal(this.resourceService.getUsers());
  loading: Signal<boolean> = computed(() => !this.posts() || !this.users());
  comments: Signal<Record<number, Comment[]>> = this.cachedComments.asReadonly();
  favourites: WritableSignal<Set<number>> = signal(new Set());

  filteredPosts: Signal<Post[] | undefined> = computed(() => {
    const posts = this.posts();
    const currentFilters = this.filters();
    const favorites = this.favourites();
    //tbd rozbic na pojedyncze funkcje

    if (posts) {
      const filtered = posts.filter((post) => {
        const searchText = currentFilters.searchText.trim();
        if (searchText) {
          const searchLower = searchText.toLowerCase();
          const matchesText =
            post.title.toLowerCase().includes(searchLower) ||
            post.body.toLowerCase().includes(searchLower);
          if (!matchesText) return false;
        }

        if (currentFilters.userId !== undefined && post.userId !== currentFilters.userId) {
          return false;
        }

        if (currentFilters.showOnlyFavorites && !favorites.has(post.id)) {
          return false;
        }

        return true;
      });

      return filtered;
    }
    return posts;
  });

  constructor() {
    effect(() => {
      const id = this.commentIdToBeCached();
      const comments = this.currentComments();

      if (id && comments.length > 0 && !this.cachedComments()[id]) {
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

  setPostAsFavourite(postId: number) {
    this.favourites.update((existing) => {
      if (existing.has(postId)) {
        existing.delete(postId);
      } else {
        existing.add(postId);
      }
      return existing;
    });
  }

  applyFilters(filterOptions: {
    searchText?: string;
    userId?: number;
    showOnlyFavorites?: boolean;
  }) {
    this.filters.update((existing) => ({
      ...existing,
      ...filterOptions,
    }));
  }

  getCurrentFilters() {
    return this.filters();
  }

  private currentComments = toSignal(
    toObservable(this.commentIdToBeCached).pipe(
      filter((id) => !!id),
      switchMap((id) => this.resourceService.getComments(id!))
    ),
    { initialValue: [] }
  );
}
