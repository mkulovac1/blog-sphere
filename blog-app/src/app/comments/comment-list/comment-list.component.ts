import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {

  top() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
