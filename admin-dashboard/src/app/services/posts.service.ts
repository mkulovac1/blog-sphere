import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private storage: AngularFireStorage ) { }

  uploadImage(selectedImage, postData) {
    const filePath = `postImg/${Date.now()}` // beacuse this is a date so it will be unique
    // console.log(filePath);
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Image uploaded successfully');

      this.storage.ref(filePath).getDownloadURL().subscribe((url) => {
        postData.postImgPath = url; // mutable
      })
    })
  }
}
