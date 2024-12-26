import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipies-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './recipies-list.component.html',
  styleUrl: './recipies-list.component.scss'
})
export class RecipiesListComponent implements OnInit {
  constructor(private http: HttpClient, private destroyRef: DestroyRef) {}
  recipes: Recipe[] = []
  recipesLoaded: boolean = false

  private fetchRecipes() {
    return this.http.get<Observable<Recipe>>('https://recipe-book-406c3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
  }

  ngOnInit() {
    const recipesSubscription = this.fetchRecipes()
      .subscribe({
        next: (data) => Object.values(data).forEach((recipe: Recipe) => this.recipes.push(recipe)),
        complete: () => this.recipesLoaded = true,
        error: (err) => console.log(err)
      })

    this.destroyRef.onDestroy(() => recipesSubscription.unsubscribe())
  }
}
