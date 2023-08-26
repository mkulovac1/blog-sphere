import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore) { }

  loadFeatured() { // just featured posts, needs where clause
    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id

        return { id, data }
      })
    }))
  }

  loadLatest() {
    return this.afs.collection('posts', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id

        return { id, data }
      })
    }))
  }

  loadCategoryPosts(categoryId) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id

        return { id, data }
      })
    }))
  }

  loadOnePost(postId) {
    return this.afs.collection('posts').doc(postId).valueChanges()
  }

  loadSimilar(categoryId) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId).limit(4)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id

        return { id, data }
      })
    }))
  }

  viewsCounter(postId) {
    const viewsCount = {
      views: firebase.default.firestore.FieldValue.increment(1)
    }

    return this.afs.collection('posts').doc(postId).update(viewsCount).then(() => {
    })
  }
}
