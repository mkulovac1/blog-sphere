import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})

export class SingleCategoryComponent {

  constructor(private route: ActivatedRoute, private postService: PostsService) { }

  postsForCategoryArray: Array<object>;
  categoryObject: any;

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.categoryObject = data;

      this.postService.loadCategoryPosts(data.id).subscribe(post => {
        this.postsForCategoryArray = post;
      })
    })
  }
}
