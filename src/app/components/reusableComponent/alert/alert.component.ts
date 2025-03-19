import { Component, Input } from '@angular/core';
// import { RouterLink, = } from '@angular/router';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  @Input() message: string = " ";
}
