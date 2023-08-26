import { PostsService } from './../../services/posts.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent {

    postArray: Array<object>;

    constructor(private postService: PostsService) {}

    ngOnInit() : void {
      this.postService.loadData().subscribe((data) => {
        // console.log(data);
        this.postArray = data;
      })
    }

    onDelete(imgPath, id) {
      // console.log(imgPath, id);
      this.postService.deleteImageAndData(imgPath, id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
