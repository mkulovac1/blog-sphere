import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ToastrService } from 'ngx-toastr';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private storage: AngularFireStorage, private afs: AngularFirestore, private toastr: ToastrService, private router: Router ) { }

  uploadImage(selectedImage, postData) {
    const filePath = `postImg/${Date.now()}` // beacuse this is a date so it will be unique
    // console.log(filePath);
    this.storage.upload(filePath, selectedImage).then(() => {
    // console.log('Image uploaded successfully');

    this.storage.ref(filePath).getDownloadURL().subscribe((url) => {
        postData.postImgPath = url; // mutable
        this.saveData(postData);
      })
    })
  }

  saveData(postData) {
    this.afs.collection('posts').add(postData).then((docRef) => {
      this.toastr.success('Post added successfully', 'Success');
      this.router.navigate(['/posts']);
    })
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id

        return { id, data }
      })
    }))
  }
}
