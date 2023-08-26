import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Post } from 'src/app/models/post';

import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';

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

  postData: any;

  formStatus: string = 'Add new'

  docId: string;

  constructor(private categoryService: CategoriesService,
              private fb: FormBuilder,
              private postService: PostsService,
              private route: ActivatedRoute
              ) {

      // console.log(this.addedImage)

      const idExists = 'id' in this.route.snapshot.queryParams;

      if (idExists) {
        this.route.queryParams.subscribe((params) => {
          this.docId = params.id;

          this.postService.loadSingleData(params.id).subscribe((post) => {
            // console.log(post);

            this.postData = post;

            this.postForm = this.fb.group({
              title: [this.postData.title, [Validators.required, Validators.minLength(10)]],
              permalink: [/*{value: this.postData.permalink, disabled: true}*/this.postData.permalink, Validators.required],
              excerpt: [this.postData.excerpt, [Validators.required, Validators.minLength(50)]],
              category: [`${this.postData.category.categoryId}-${this.postData.category.category}`, Validators.required], // or id ?!
              postImg: ['', Validators.required],
              content: [this.postData.content, Validators.required]
            })

            this.addedImage = this.postData.postImgPath;
            this.formStatus = 'Edit';
          });
        });
      }
      else {
        this.postForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(10)]],
        permalink: [/*{value: '', disabled: true}*/ '', Validators.required],
        excerpt: ['', [Validators.required, Validators.minLength(50)]],
        category: ['', Validators.required],
        postImg: ['', Validators.required],
        content: ['', Validators.required]})
      }


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
    // console.log(this.postForm.value);

    let categoryNameAndId = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      excerpt: this.postForm.value.excerpt,
      category: {
        categoryId: categoryNameAndId[0],
        category: categoryNameAndId[1]
      },
      postImgPath: '',
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }

    // console.log(postData);

    this.postService.uploadImage(this.selectedImage, postData, this.formStatus, this.docId);

    this.postForm.reset();
    this.addedImage = './assets/placeholder-image.jpg';
  }

  scrollToTheTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
