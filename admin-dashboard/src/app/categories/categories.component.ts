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
  categoryId: string

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

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData)
      formData.reset()
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData)
      formData.reset()
      this.formStatus = 'Add'
    }
  }

  onEdit(id, category) {
    // console.log(id, category)
    this.formCategory = category
    this.categoryId = id
    this.formStatus = 'Edit'
  }

  onDelete(id) {
    // console.log(id)
    this.categoryService.deleteData(id)
  }
}
