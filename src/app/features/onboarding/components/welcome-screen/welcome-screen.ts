import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-screen',
  standalone: false,
  templateUrl: './welcome-screen.html',
  styleUrl: './welcome-screen.css',
})
export class WelcomeScreen {
  constructor(private readonly router: Router) {}
  handleGetStarted() {
    // Your navigation logic
    this.router.navigate(['onboarding/step-1']);
  }

  handleLogin() {
    // Your login logic
    console.log('Login clicked');
  }
}
