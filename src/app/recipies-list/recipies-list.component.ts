import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipies-list',
  standalone: true,
  imports: [RouterLink, CommonModule, MatButtonModule],
  templateUrl: './recipies-list.component.html',
  styleUrl: './recipies-list.component.scss'
})
export class RecipiesListComponent implements OnInit {
  constructor(private http: HttpClient, private destroyRef: DestroyRef) {}
  recipes: Recipe[] = []
  recipesLoaded: boolean = false
  categories: string[] = []
  filters: string[] = []
  locale: string | null = null
  initialRecipes: Observable<Observable<Recipe>> | null = null

  private fetchRecipes() {
    return this.http.get<Observable<Recipe>>('https://recipe-book-406c3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
  }

  ngOnInit() {
    this.locale = localStorage.getItem('locale')
    document.querySelector("header")?.addEventListener("click", () => {
      this.locale = localStorage.getItem('locale')
      this.recipes = []
      this.recipesLoaded = false
      this.getAllRecipies()
    })
    document.querySelector(".mobile-menu-list")?.addEventListener("click", () => {
      this.locale = localStorage.getItem('locale')
      this.recipes = []
      this.recipesLoaded = false
      this.getAllRecipies()
    })
    this.initialRecipes = this.fetchRecipes()
    this.getAllRecipies()
  }

  private getAllRecipies() {
    const recipesSubscription = this.initialRecipes!
    .subscribe({
      next: (data) => Object.values(data).forEach((recipe: Recipe) => this.recipes.push(recipe)),
      complete: () => {
        this.categories = []
        this.recipesLoaded = true
        this.recipes.forEach((recipe) => {
          if (this.locale == 'bg'){
            recipe.categories_bg.forEach((category) => {
              if (!this.categories.includes(category)) this.categories.push(category)
            })
          }
          else{
            recipe.categories.forEach((category) => {
              if (!this.categories.includes(category)) this.categories.push(category)
            })
          }
        })
      },
      error: (err) => console.log(err)
    })

    this.destroyRef.onDestroy(() => recipesSubscription.unsubscribe())
  }

  private getFilteredRecipies(filters: string[]) {
    const recipesSubscription = this.initialRecipes!
    .subscribe({
      next: (data) => Object.values(data).forEach((recipe: Recipe) => {
        if (this.locale == 'bg'){
          if (filters.every(i => recipe.categories_bg.includes(i))) this.recipes.push(recipe)
        }
        else{
          if (filters.every(i => recipe.categories.includes(i))) this.recipes.push(recipe)
        }
      }),
      complete: () => {
        this.recipesLoaded = true
        this.recipes.forEach((recipe) => {
          if (this.locale == 'bg'){
            recipe.categories_bg.forEach((category) => {
              if (!this.categories.includes(category)) this.categories.push(category)
            })
          }
          else{
            recipe.categories.forEach((category) => {
              if (!this.categories.includes(category)) this.categories.push(category)
            })
          }
        })
      },
      error: (err) => console.log(err)
    })

    this.destroyRef.onDestroy(() => recipesSubscription.unsubscribe())
  }

  applyFilter(category: string){
    this.recipes = []
    this.recipesLoaded = false
    this.filters.includes(category) ? this.filters = this.filters.filter(item => item !== category) : this.filters.push(category);
    this.filters.length == 0 ? this.getAllRecipies() : this.getFilteredRecipies(this.filters)
  }
}
