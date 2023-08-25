import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveData(categoryData) {
    this.afs.collection('categories').add(categoryData).then(docRef => {
      // console.log(docRef)
      this.toastr.success('Category added successfully', 'Success')
    }).catch(err => {
      // console.log(err)
      this.toastr.error('Category not added', 'Error')
    })
  }

  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id

        return { id, data }
      })
    }))
  }

  updateData(id, editData) {
    this.afs.collection('categories').doc(id).update(editData).then(docRef => {
      // console.log(docRef)
      this.toastr.success('Category updated successfully', 'Success')
    }).catch(err => {
      // console.log(err)
      this.toastr.error('Category not updated', 'Error')
    })
  }

  deleteData(id) {
    this.afs.collection('categories').doc(id).delete().then(docRef => {
      // console.log(docRef)
      this.toastr.success('Category deleted successfully', 'Success')
    }).catch(err => {
      // console.log(err)
      this.toastr.error('Category not deleted', 'Error')
    })
  }
}
