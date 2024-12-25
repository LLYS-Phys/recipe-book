import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipies-list',
  standalone: true,
  imports: [],
  templateUrl: './recipies-list.component.html',
  styleUrl: './recipies-list.component.scss'
})
export class RecipiesListComponent implements OnInit {
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
