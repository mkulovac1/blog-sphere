import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  categoryArray: Array<object>
  formCategory: string
  formStatus: string = 'Add'

  constructor(private categoryService: CategoriesService) { }

  ngOnInit() : void {
    this.categoryService.loadData().subscribe(x => {
      // console.log(x)
      this.categoryArray = x
    })
  }

  onSubmit(formData) {
    let categoryData: Category = {
      category: formData.value.category
    }

    this.categoryService.saveData(categoryData)

    formData.reset()
  }

  onEdit(category) {
    // console.log(category)
    this.formCategory = category
    this.formStatus = 'Edit'
  }
}
