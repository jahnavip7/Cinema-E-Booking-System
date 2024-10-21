import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';  // Ensure FormsModule is imported


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterModule,  // For handling routes
    CommonModule,  // For common directives like ngIf, ngFor
    ReactiveFormsModule, // For reactive form handling
    FormsModule,
  ]
})
export class AppComponent {
  title = 'movie-app';
}
