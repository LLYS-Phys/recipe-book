import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailed-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-recipe.component.html',
  styleUrl: './detailed-recipe.component.scss'
})
export class DetailedRecipeComponent implements OnInit{
  constructor(private route: ActivatedRoute, private destroyRef: DestroyRef, private http: HttpClient) {}

  currentRecipe: Recipe | null | 'not_found' = null

  private fetchRecipe() {
    return this.http.get<Observable<Recipe>>('https://recipe-book-406c3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
  }

  ngOnInit() {
    const recipeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        const recipeFetch = this.fetchRecipe().subscribe({
          next: (recipies) => {
            const recipe = Object.values(recipies).find(
              (recipe: Recipe) => recipe.id == params.get('id')
            );
            this.currentRecipe = recipe ? recipe : 'not_found'
          }
        })

        this.destroyRef.onDestroy(() => recipeFetch.unsubscribe())
      },
      error: (err) => console.log(err)
    })

    this.destroyRef.onDestroy(() => recipeSubscription.unsubscribe())
  }
}
