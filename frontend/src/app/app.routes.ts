import { Routes } from '@angular/router';
import { SelectShowtimeComponent } from './select-showtime/select-showtime.component';
import { SelectSeatComponent } from './select-seat/select-seat.component';
import { OrderSummaryComponent } from './ordersummary/ordersummary.component';

export const routes: Routes = [
  { path: 'select-showtime', component: SelectShowtimeComponent },
  { path: 'select-seat', component: SelectSeatComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: '', redirectTo: '/select-showtime', pathMatch: 'full' },  // Default route
];
