import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  featuredPostArray: Array<object>;
  latestPostArray: Array<object>;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.loadFeatured().subscribe(data => {
      this.featuredPostArray = data;
    })

    this.postService.loadLatest().subscribe(data => {
      this.latestPostArray = data;
    })
  }

}
