import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-2',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header-2.component.html',
  styleUrl: './header-2.component.scss'
})
export class Header2Component {

  constructor(private router: Router) {

  }

}
