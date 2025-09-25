import { Component, inject, Signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { DataService } from '../../../../core/services/data-service';
import { Post } from '../../../../shared/models/Post';
import { PostDetailsComponent } from '../post-details-component/post-details-component';
import { User } from '../../../../shared/models/User';
import { Comment } from '../../../../shared/models/Comment';
import { PostFiltersComponent } from '../post-filters-component/post-filters-component';

@Component({
  selector: 'app-posts-list-component',
  imports: [PostDetailsComponent, NgClass, PostFiltersComponent],
  templateUrl: './posts-list-component.html',
  host: {
    class:
      'h-full w-full flex flex-col items-center bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4',
  },
})
export class PostsListComponent {
  private readonly dataService: DataService = inject(DataService);

  selectedPostId: number | undefined = undefined;
  posts: Signal<Post[] | undefined> = this.dataService.filteredPosts;
  users: Signal<User[] | undefined> = this.dataService.users;
  comments: Signal<Record<number, Comment[]>> = this.dataService.comments;

  getAuthorForPost(post: Post): User | undefined {
    return this.users()?.find((user) => user.id === post.userId);
  }

  toggleDetails(id: number | undefined) {
    this.selectedPostId = id === this.selectedPostId ? undefined : id;
    this.dataService.setCommentIdToBeCached(id);
  }

  isFavorite(postId: number): boolean {
    return this.dataService.favourites().has(postId);
  }

  toggleFavorite(postId: number): void {
    this.dataService.setPostAsFavourite(postId);
  }

  onFilterChange(filterOptions: {
    searchText: string;
    userId?: number;
    showOnlyFavorites: boolean;
  }): void {
    this.dataService.applyFilters(filterOptions);
  }
}
