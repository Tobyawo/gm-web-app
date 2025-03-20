import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  
  email = [];

  constructor(public router: Router, private zone: NgZone) { }

  ngOnInit() {
    // USER INFO
    // this.serve.loggedIn()
    //   .subscribe(user => {
        
    //     this.email.push(user.providerData[0].email);
    //     console.log(this.email);
    //   });
  }

  goLogin() {
    this.zone.run(() => this.router.navigateByUrl('/login'));
  }

  goProduct() {
    this.zone.run(() => this.router.navigateByUrl('/products'));
  }

  logOut() {
    // this.serve.signOut();
    this.goLogin();
  }
}
