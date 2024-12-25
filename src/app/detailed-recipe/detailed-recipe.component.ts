import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed-recipe',
  standalone: true,
  imports: [],
  templateUrl: './detailed-recipe.component.html',
  styleUrl: './detailed-recipe.component.scss'
})
export class DetailedRecipeComponent implements OnInit{
  constructor(private route: ActivatedRoute, private destroyRef: DestroyRef) {}

  currentRecipeId: string | null = null

  ngOnInit() {
    const recipeSubscription = this.route.paramMap.subscribe({
      next: (params) => this.currentRecipeId = params.get('id'),
      error: (err) => console.log(err)
    })

    this.destroyRef.onDestroy(() => recipeSubscription.unsubscribe())
  }
}
