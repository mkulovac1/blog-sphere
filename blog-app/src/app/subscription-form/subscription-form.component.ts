import { Component } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})

export class SubscriptionFormComponent {

  constructor(private subsService: SubscribersService) { }

  ngOnInit(): void {

  }

  onSubmit(formValues) {
    const subsData: Sub = {
      name: formValues.name,
      email: formValues.email
    }

    this.subsService.addSubs(subsData);
  }
}
