import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {

    subsArray: Array<object> = [];

    constructor(private subsService: SubscribersService) { }

    ngOnInit(): void {
      this.subsService.loadData().subscribe(data => {
        this.subsArray = data;
      })
    }
}
