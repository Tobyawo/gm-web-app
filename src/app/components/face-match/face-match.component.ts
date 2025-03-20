import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Import Router for navigation
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-face-match',
  templateUrl: './face-match.component.html',
  styleUrls: ['./face-match.component.css'],
  imports: [FormsModule]
})
export class FaceMatchComponent {
  image1Base64: string | null = null;
  image2Base64: string | null = null;
  transactionId: string = '';
  callBackUrl: string = '';
  userName: string = '';
  email: string = '';  // Add email for subscription
  subscriptionType: string = 'basic';  // Add subscription type

  constructor(private http: HttpClient, private router: Router) {}

  navigateToSubscription() {
    this.router.navigate(['/subscription']);  // Navigate to the subscription page
  }

  onFileChange(event: Event, imageNumber: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (imageNumber === 1) {
            this.image1Base64 = reader.result.split(',')[1];
          } else {
            this.image2Base64 = reader.result.split(',')[1];
          }
        }
      };

      reader.readAsDataURL(file);
    }
  }

  clearForm() {
    this.image1Base64 = null;
    this.image2Base64 = null;
    this.transactionId = '';
    this.callBackUrl = '';
    this.userName = '';
    this.email = '';
    this.subscriptionType = 'basic';

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        const fileInput = input as HTMLInputElement;
        fileInput.value = '';
    });
  }

  submit() {
    if (!this.image1Base64 || !this.image2Base64) {
      alert('Both images are required');
      return;
    }

    const requestBody = {
      image1: this.image1Base64,
      image2: this.image2Base64,
      transactionId: this.transactionId || undefined,
      callBackUrl: this.callBackUrl || undefined,
      userName: this.userName || undefined
    };

    this.http.post('http://localhost:8088/facematch/match/upload', requestBody)
      .subscribe(response => {
        console.log('Response:', response);
        alert('Image verification successful!');
        this.clearForm();  // Clear the form after successful submission
      }, error => {
        console.error('Error:', error);
        alert('Error submitting request.');
      });
  }
}
