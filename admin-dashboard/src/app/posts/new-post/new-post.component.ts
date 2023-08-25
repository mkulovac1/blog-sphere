import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  title: string = '';
  permalink: string = '';
  addedImage: any = './assets/placeholder-image.jpg';
  selectedImage: any;

  categories: Array<object>;

  postForm: FormGroup;

  constructor(private categoryService: CategoriesService, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((givenData) => {
      this.categories = givenData;
    })
  }

  get formControls() {
    return this.postForm.controls;
  }

  onTitleChanged(event) {
    this.title = event.target.value;
    this.permalink = this.title.replace(/\s/g, '-');
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

  onSubmit() {
    console.log(this.postForm.value);
  }
}
