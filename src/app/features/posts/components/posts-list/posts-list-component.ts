import { Component, inject, Signal } from '@angular/core';
import { DataService } from '../../../../core/services/data-service';
import { Post } from '../../../../shared/models/Post';

@Component({
  selector: 'app-posts-list-component',
  imports: [],
  templateUrl: './posts-list-component.html',
})
export class PostsListComponent {
  private readonly postService: DataService = inject(DataService);

  posts: Signal<Post[] | undefined> = this.postService.posts;
}
