import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class SubscribersService {

  constructor(private afs: AngularFirestore) { }

  addSubs(subsData) {
    this.afs.collection('subscribers').add(subsData).then(() => {
      console.log('Subscriber Added Successfully');
    })
  }
}
