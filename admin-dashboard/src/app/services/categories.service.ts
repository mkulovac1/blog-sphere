import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveData(categoryData) {
    this.afs.collection('categories').add(categoryData).then(docRef => {
      console.log(docRef)
      this.toastr.success('Category added successfully', 'Success')
    }).catch(err => {
      console.log(err)
      this.toastr.error('Category not added', 'Error')
    })
  }
}
