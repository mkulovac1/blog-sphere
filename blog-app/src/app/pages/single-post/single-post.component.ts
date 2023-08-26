import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})

export class SinglePostComponent {

  constructor(private route: ActivatedRoute, private postService: PostsService) { }

  singlePost: any;
  similarPostsArray: Array<object> = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postService.viewsCounter(params.id);

      this.postService.loadOnePost(params.id).subscribe(post => {
        this.singlePost = post;
        this.loadSimilarPosts(this.singlePost.category.categoryId);
      })
    })
  }

  loadSimilarPosts(categoryId) {
    this.postService.loadSimilar(categoryId).subscribe(posts => {
      this.similarPostsArray = posts;
    })
  }
}
