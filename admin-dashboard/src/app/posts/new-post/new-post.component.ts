import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  permalink: string = '';
  addedImage: any = './assets/placeholder-image.jpg';
  selectedImage: any;

  categories: Array<object>;

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((givenData) => {
      this.categories = givenData;
    })
  }

  onTitleChanged(event) {
    const title = event.target.value;
    this.permalink = title.replace(/\s/g, '-');
    // console.log(this.permalink);
  }

  showPreviewImage(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.addedImage = e.target.result as string
    }

    reader.readAsDataURL(event.target.files[0]);

    this.selectedImage = event.target.files[0];
  }
}
