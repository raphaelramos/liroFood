import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantsService } from '../restaurants/restaurants.service';
import { Restaurant } from '../restaurants/restaurant/restaurant.model';

import { TransfereService } from '../shared/services/transfer.service';
import { TitleService } from '../shared/services/title.service';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant;
  colorPage: string;
  closeRestaurant: boolean;
  orderHours = 'day';

  today = new Date();
  week = this.today.getDay() + 1;
  day = 'today';

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute,
              private transfereService: TransfereService,
              private titleService: TitleService) {  }

  ngOnInit() {
    this.restaurantsService.restaurantBySlug(this.route.snapshot.params['slug'])
      .subscribe((restaurant) => {
        this.transfereService.setData(restaurant.id);

        this.restaurant = restaurant;

        // SEO
        this.titleService.setTitle(restaurant.name);
        this.titleService.setMeta([
          { name: 'description', content: this.restaurant.about }
        ]);

        let color = restaurant.color;
        if (color) {
          this.colorPage = `${color}, 0.4`;
        }

        if (restaurant.open || restaurant.active) {
          this.closeRestaurant = true;
        }
      });
  }

}
