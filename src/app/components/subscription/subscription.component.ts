import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Subscription {
  plan: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  imports: [FormsModule]
})
export class SubscriptionComponent {
  email: string = '';
  subscriptionType: string = 'basic';
  subscriptions: Subscription[] = [];

  constructor(private http: HttpClient) {}

  subscribe() {
    const subscriptionData = {
      plan: this.subscriptionType,
      email: this.email
    };

    this.http.post<string>('http://localhost:8080/api/subscription/subscribe', subscriptionData, { responseType: 'text' as 'json' })
      .subscribe(
        (paymentUrl: string) => {
          alert('Subscription initiated. Redirecting to payment...');
          window.location.href = paymentUrl;
        },
        error => {
          alert('Subscription error: ' + error.message);
          console.error('Error:', error);
        }
      );
  }

  getSubscriptions() {
    this.http.get<Subscription[]>('http://localhost:8080/api/subscription/verify')
      .subscribe(
        (subscriptions: Subscription[]) => {
          this.subscriptions = subscriptions;
        },
        error => {
          alert('Error loading subscriptions');
          console.error('Error:', error);
        }
      );
  }
}

