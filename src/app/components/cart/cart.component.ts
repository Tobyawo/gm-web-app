import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [FormsModule, CommonModule]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private router: Router) {
    this.router = router;
    this.generateDummyList();
  }

  ngOnInit(): void {
    this.loadCart();
  }

  generateDummyList(): void {
    this.cartItems = [
      { id: 1, name: 'Product A', price: 10, quantity: 1 },
      { id: 2, name: 'Product B', price: 20, quantity: 2 },
      { id: 3, name: 'Product C', price: 30, quantity: 1 }
    ];
    this.calculateTotal();
  }

  loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.calculateTotal();
    }
  }

  addItem(item: CartItem): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.calculateTotal();
    this.saveCart();
  }

  removeItem(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.calculateTotal();
    this.saveCart();
  }

  updateQuantity(id: number, quantity: number): void {
    const item = this.cartItems.find(cartItem => cartItem.id === id);
    if (item) {
      item.quantity = quantity;
      this.calculateTotal();
      this.saveCart();
    }
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  clearCart(): void {
    this.cartItems = [];
    this.total = 0;
    localStorage.removeItem('cart');
  }

  navigateToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
