import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  featuredPostArray: Array<object>;

  constructor(private postService: PostsService) {
    this.postService.loadFeatured().subscribe(data => {
      this.featuredPostArray = data;
      // console.log(this.featuredPostArray);
    })
  }

  /*ngOnInit(): void {
    this.postService.loadFeatured().subscribe(data => {
      this.featuredPostArray = data;
      // console.log(this.featuredPostArray);
    })
  }*/

}
