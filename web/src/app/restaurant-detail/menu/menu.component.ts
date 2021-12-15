import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { MenuItem } from '../menu-item/menu-item.model';

import { Observable } from 'rxjs/Observable';

import { TransfereService } from '../../shared/services/transfer.service';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>;

  constructor(private restaurantsService: RestaurantsService,
              private transfereService: TransfereService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const intervalId = setInterval(() => {
      let restaurantId = this.transfereService.getData();
      // stop interval on id
      if (restaurantId) { clearInterval(intervalId); }

      this.menu = this.restaurantsService
        .menuOfRestaurant(restaurantId);
    }, 200);
  }

  addMenuItem(item: MenuItem) {
    console.log(item);
  }

}
