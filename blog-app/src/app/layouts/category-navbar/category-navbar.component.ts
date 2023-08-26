import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})

export class CategoryNavbarComponent {

  categoryArray: Array<object> = [];

  constructor(private categoryService: CategoriesService) {

  }

  ngOnInit() : void {
    this.categoryService.loadData().subscribe(givenData => {
      this.categoryArray = givenData;
    })
  }
}
