import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../../restaurants/restaurants.service';

import { Observable } from 'rxjs/Observable';

import { TransfereService } from '../../shared/services/transfer.service';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>;

  constructor(private restaurantsService: RestaurantsService,
              private transfereService: TransfereService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const intervalId = setInterval(() => {
      let restaurantId = this.transfereService.getData();
      // stop interval on id
      if (restaurantId) { clearInterval(intervalId); }

      this.reviews = this.restaurantsService
        .reviewsOfRestaurant(restaurantId);
    }, 200);
  }

}
