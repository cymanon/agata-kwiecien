import { Component, input } from '@angular/core';
import { Post } from '../../../../shared/models/Post';
import { User } from '../../../../shared/models/User';
import { Comment } from '../../../../shared/models/Comment';

@Component({
  selector: 'app-post-details-component',
  imports: [],
  templateUrl: './post-details-component.html',
})
export class PostDetailsComponent {
  post = input<Post>();
  author = input<User>();
  comments = input<Comment[]>([]);
  loading = input<boolean>(false);
}
