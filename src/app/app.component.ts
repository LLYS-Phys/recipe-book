import { Component, DestroyRef, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'recipe-book';

  constructor(private authService: AuthService, private destroyRef: DestroyRef) {}

  isAuthenticated = false

  ngOnInit() {
    this.authService.autoLogin()
    const userSubscription = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user
      }
    })
    this.destroyRef.onDestroy(() => userSubscription.unsubscribe())
  }

  onLogout() {
    this.authService.logout()
  }
}

// Thinking about data structure:
// {
//    "id": "0",
//    "name": "", 
//    "time_preparation": "", 
//    "time_cooking": "", 
//    "portions_count": "", 
//    "ingredients": ["ingredient 1", "ingredient 2"], 
//    "steps": ["first step", "second step", "third step"], 
//    "categories": ["category"], 
//    "photos": ["photo.png"]
// }