import { Routes } from '@angular/router';
import { SelectShowtimeComponent } from './select-showtime/select-showtime.component';
import { SelectSeatComponent } from './select-seat/select-seat.component';
import { OrderSummaryComponent } from './ordersummary/ordersummary.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home page
  { path: 'movie/:id', component: MovieDetailsComponent }, // Movie details page
  { path: 'book/:id', component: SelectShowtimeComponent },
  { path: 'select-seat', component: SelectSeatComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: '**', redirectTo: '' } // Wildcard route
];
