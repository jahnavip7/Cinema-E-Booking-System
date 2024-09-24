/*import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
    searchTerm: String = "";
    constructor(private route:ActivatedRoute, private router:Router) {}


    ngOnInit(): void {
      this.route.params.subscribe(params => {
          if (params.['searchTerm'])
            this.searchTerm = params.['searchTerm'];
      })
    }

    search():void{
      if(this.searchTerm)
      this.router.navigateByUrl('/search/' + this.searchTerm);
    }
  

} */

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule], // Make sure FormsModule is imported
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    searchTerm: string = "";  // Use string instead of String
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        if (params['searchTerm']) {
          this.searchTerm = params['searchTerm'];
        }
      });
    }

    search(): void {
      if (this.searchTerm) {
        this.router.navigateByUrl('/search/' + this.searchTerm);
      }
    }
}
