import { Routes } from '@angular/router';
import { RecipiesListComponent } from './recipies-list/recipies-list.component';
import { routes as userRoutes } from './auth/auth.routes';

export const routes: Routes = [
    {
        path: '',
        component: RecipiesListComponent
    },
    {
        path: 'recipe/:id',
        loadComponent: () => import('./detailed-recipe/detailed-recipe.component').then((comp) => comp.DetailedRecipeComponent)
    },
    {
        path: 'auth',
        children: userRoutes
    },
];
