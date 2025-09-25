import { Component, computed, inject, Signal } from '@angular/core';
import { DataService } from '../../../../core/services/data-service';
import { Post } from '../../../../shared/models/Post';
import { PostDetailsComponent } from '../post-details-component/post-details-component';
import { User } from '../../../../shared/models/User';
import { Comment } from '../../../../shared/models/Comment';

@Component({
  selector: 'app-posts-list-component',
  imports: [PostDetailsComponent],
  templateUrl: './posts-list-component.html',
})
export class PostsListComponent {
  private readonly dataService: DataService = inject(DataService);

  selectedPostId: number | undefined = undefined;
  posts: Signal<Post[] | undefined> = this.dataService.posts;
  users: Signal<User[] | undefined> = this.dataService.users;
  comments: Signal<Record<number, Comment[]>> = this.dataService.comments;

  author: Signal<User | undefined> = computed(() => {
    return this.selectedPostId
      ? this.users()?.find(
          (user) =>
            user.id === this.posts()?.find((post) => post.id === this.selectedPostId)?.userId
        )
      : undefined;
  });

  toggleDetails(id: number | undefined) {
    this.selectedPostId = id === this.selectedPostId ? undefined : id;
    this.dataService.setCommentIdToBeCached(id);
  }
}
