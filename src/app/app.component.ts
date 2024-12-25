import { Component, DestroyRef, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'recipe-book';

  constructor(private authService: AuthService, private destroyRef: DestroyRef, private http: HttpClient) {}

  isAuthenticated = false
  recipes: Recipe[] = []
  next_id: number | null = null

  private fetchRecipes() {
    return this.http.get<Observable<Recipe>>('https://recipe-book-406c3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
  }

  ngOnInit() {
    this.authService.autoLogin()
    const userSubscription = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user
      }
    })
    const recipesSubscription = this.fetchRecipes()
      .subscribe({
        next: (data) => {
          Object.values(data).forEach((recipe: Recipe) => this.recipes.push(recipe))
          this.next_id = this.findMaxId(this.recipes)+1
        },
        complete: () => console.log(this.recipes),
        error: (err) => console.log(err)
      })

    this.destroyRef.onDestroy(() => {
      userSubscription.unsubscribe()
      recipesSubscription.unsubscribe()
    })
  }

  onLogout() {
    this.authService.logout()
  }

  newRecipe() {
    this.http.post('https://recipe-book-406c3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', {id: this.next_id!.toString(), name: "", time_preparation: "", time_cooking: "", portions_count: "", ingredients: ["ingredient 1", "ingredient 2"], steps: ["first step", "second step", "third step"], categories: ["category"], photos: ["photo.png"] }).subscribe({
      next: (data) => this.next_id! += 1
    })
  }

  private findMaxId(recipes: Recipe[]): number {
    const ids = recipes
      .map((recipe) => parseInt(recipe.id, 10)) // Convert id to a number
      .filter((id) => !isNaN(id)); // Filter out invalid numbers
    return ids.length ? Math.max(...ids) : 0; // Return the max id, or 0 if no valid ids
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