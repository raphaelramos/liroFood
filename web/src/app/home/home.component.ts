import { Component, OnInit } from '@angular/core';
import { TitleService } from '../shared/services/title.service';

@Component({
  selector: 'mt-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    // SEO
    this.titleService.setTitle('liroFood');
    this.titleService.setMeta([
      { name: 'description', content: 'App de Delivery, peça comida.' }
    ]);
  }

}
