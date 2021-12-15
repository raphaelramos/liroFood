import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operators';

import { Restaurant } from './restaurant/restaurant.model';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';

import { MEAT_API } from '../app.api';

@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient){}

    restaurants(search?: string): Observable<Restaurant[]> {
      let params: HttpParams = undefined;
      if (search) {
        params = new HttpParams().append('filter', `{"where":{"name":{"like":"${search}.*","options":"i"}}}`);
      }
      return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params});
    }

    restaurantById(id: string): Observable<Restaurant> {
      return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
        .pipe(retry(2));
    }

    restaurantBySlug(slug: string): Observable<Restaurant> {
      const params = new HttpParams({
        fromString: `{filter='slug'='${slug}'`
      });
      return this.http.get<Restaurant>(`${MEAT_API}/restaurants/findOne`, {params})
        .pipe(retry(2));
    }

    reviewsOfRestaurant(id: string): Observable<any> {
      if (id) {
        const params = new HttpParams({
          fromString: `{filter='restaurantId'='${id}'}`
        });
        return this.http.get(`${MEAT_API}/reviews`, {params})
          .pipe(retry(2));
      }
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]> {
      if (id) {
        const params = new HttpParams({
          fromString: `{filter='restaurantId'='${id}'}`
        });
        return this.http.get<MenuItem[]>(`${MEAT_API}/menus`, {params})
          .pipe(retry(2));
      }
    }

}
