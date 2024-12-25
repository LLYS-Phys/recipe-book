import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-book';
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