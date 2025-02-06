import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-recipies-list',
  standalone: true,
  imports: [RouterLink, CommonModule, MatButtonModule, MatIconModule, MatFormField, MatInput],
  templateUrl: './recipies-list.component.html',
  styleUrl: './recipies-list.component.scss'
})
export class RecipiesListComponent implements OnInit {
  constructor(private http: HttpClient, private destroyRef: DestroyRef, private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {}
  recipes: Recipe[] = []
  recipesLoaded: boolean = false
  categories_key: string[] = []
  categories_wording: string[] = []
  categories: {key: string, wording: string}[] = []
  filters: string[] = []
  locale: string | null = null
  initialRecipes: Recipe[] = []
  tempFilter: string | null = null
  searchbarPlaceholder: string = "Search for a recipe..."

  private fetchRecipes() {
    return this.http.get<Observable<Recipe>>('https://recipe-book-406c3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
  }

  ngOnInit() {
    this.locale = localStorage.getItem('locale')
    document.querySelector(".navigation")?.addEventListener("click", () => {
      this.locale = localStorage.getItem('locale')
      this.recipesLoaded = false
      this.setParameters()
    })
    document.querySelector(".mobile-menu-list")?.addEventListener("click", () => {
      this.locale = localStorage.getItem('locale')
      this.recipesLoaded = false
      this.setParameters()
    })
    document.querySelector(".home-link")?.addEventListener("click", () => {
      this.recipesLoaded = false
      this.filters = []
      this.setParameters()
    })
    const recipesSubscription = this.fetchRecipes().pipe(take(1)).subscribe({
      next: (data) => Object.values(data).forEach((recipe: Recipe) => this.initialRecipes!.push(recipe)),
      complete: () => {
        this.activatedRoute.queryParams.pipe(take(1)).subscribe({
          next: (data) => {
            this.tempFilter = data['filter']
          },
          complete: () => {
            this.initialRecipes.forEach((recipe) => {
              recipe.categories.forEach((category) => {
                // Only check if the category.key is already in the categories array
                if (!this.categories.some(item => item.key === category)) {
                  this.categories.push({ key: category, wording: category });
                }
              });
            
              // Update the wording only if we're in the 'bg' locale
              if (this.locale === 'bg') {
                this.searchbarPlaceholder = "Потърсете рецепта..."
                this.categories.forEach((category) => {
                  const index = recipe.categories.indexOf(category.key);
                  if (index !== -1) category.wording = recipe.categories_bg[index];
                });
              }
            })
            if (this.tempFilter) {
              this.filters = this.tempFilter!.split(",")
            }
            this.categories = this.categories.sort((a, b) => {
              const wordingA = a.wording.toLowerCase();
              const wordingB = b.wording.toLowerCase();
              if (wordingA < wordingB) return -1;
              if (wordingA > wordingB) return 1;
              return 0;
            });
            this.setParameters()
          }
        }); 
      }
    })

    this.destroyRef.onDestroy(() => recipesSubscription.unsubscribe())
  }

  private getAllRecipies() {
    this.recipes = []
    Object.values(this.initialRecipes!).forEach((recipe: Recipe) => this.recipes.push(recipe))
    this.recipesLoaded = true
  }

  private getFilteredRecipies(filters: string[]) {
    this.recipes = []
    Object.values(this.initialRecipes!).forEach((recipe: Recipe) => { if (filters.every(i => recipe.categories.includes(i))) this.recipes.push(recipe) })
    this.recipesLoaded = true
  }

  applyFilter(category: string){
    (document.querySelector(".searchbar input") as HTMLInputElement).value = ""
    this.filters.includes(category) ? this.filters = this.filters.filter(item => item !== category) : this.filters.push(category);
    if (this.filters.length > 0) {
      this.router.navigate([''], { queryParams: { filter: this.filters.join(',') } });
    }
    else{
      this.router.navigate([''], { queryParams: { } }); 
    }
    this.setParameters()
  }

  setParameters() {
    this.recipesLoaded = false
    this.filters.length == 0 ? this.getAllRecipies() : this.getFilteredRecipies(this.filters)
  }

  randomRecipe() {
    const randomRecipe = this.recipes[Math.floor(Math.random() * this.recipes.length)]
    this.router.navigate(['/recipe', randomRecipe.id])
  }

  search(event: Event) {
    this.filters = []
    let input = (event.target as HTMLInputElement).value.trim();
    this.recipes = input == "" 
      ? this.initialRecipes 
      : this.initialRecipes.filter((recipe) => input.toLowerCase().split(/\s+/).every((word) => recipe.name.toLowerCase().includes(word)) )
  }
  
}
