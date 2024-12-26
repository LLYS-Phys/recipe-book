import { Component, DestroyRef, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'recipe-book';

  constructor(private authService: AuthService, private destroyRef: DestroyRef, private http: HttpClient) {}

  isAuthenticated = false
  recipes: Recipe[] = []
  next_id: number | null = null
  new_recipe_added: boolean = false

  new_recipe_form = new FormGroup({
    name: new FormControl(''),
    time_preparation: new FormControl(''),
    time_cooking: new FormControl(''),
    portions_count: new FormControl(''),
    ingredients: new FormControl(''),
    steps: new FormControl(''),
    categories: new FormControl(''),
    photos: new FormControl('')
  })

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
        // complete: () => console.log(this.recipes),
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

  openModal() {
    document.querySelector("#recipe-modal")?.classList.add("active")
  }

  closeModal() {
    document.querySelector("#recipe-modal")?.classList.remove("active")
  }

  newRecipe() {
    this.http.post('https://recipe-book-406c3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', {
      id: this.next_id!.toString(), 
      name: this.new_recipe_form.value.name, 
      time_preparation: this.new_recipe_form.value.time_preparation?.toString(), 
      time_cooking: this.new_recipe_form.value.time_cooking?.toString(), 
      portions_count: this.new_recipe_form.value.portions_count?.toString(), 
      ingredients: this.new_recipe_form.value.ingredients?.split(";").map(el => el.trim()), 
      steps: this.new_recipe_form.value.steps?.split(";").map(el => el.trim()), 
      categories: this.new_recipe_form.value.categories?.split(";").map(el => el.trim()), 
      photos: this.new_recipe_form.value.photos?.split(";").map(el => el.trim()) 
    }).subscribe({
      next: (data) => {
        this.next_id! += 1
        this.new_recipe_added = true
        this.new_recipe_form.reset()
        setTimeout(() => {
          this.new_recipe_added = false
        }, 3000);
      },
      complete: () => {setTimeout(() => {
        window.location.reload()
      }, 1000)}
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