import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'recipe-book';

  constructor(private http: HttpClient, private destroyRef: DestroyRef) {}
  recipes: string[] = []

  private fetchRecipes() {
    return this.http.get<Observable<string>>('https://recipe-book-406c3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
  }

  ngOnInit() {
    const recipesSubscription = this.fetchRecipes()
      .subscribe({
        next: (data) => data.forEach((recipe: string) => this.recipes?.push(JSON.parse(recipe))),
        complete: () => console.log(this.recipes),
        error: (err) => console.log(err)
      })

    this.destroyRef.onDestroy(() => recipesSubscription.unsubscribe())
  }
}

// Thinking about data structure:
// {
//    "name": "", 
//    "time_preparation": "", 
//    "time_cooking": "", 
//    "portions_count": "", 
//    "ingredients": ["ingredient 1", "ingredient 2"], 
//    "steps": ["first step", "second step", "third step"], 
//    "categories": ["category"], 
//    "photos": ["photo.png"]
// }