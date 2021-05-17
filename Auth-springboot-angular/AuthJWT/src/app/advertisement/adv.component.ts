import { Component, OnInit } from '@angular/core';
import { Kotoba } from '../model/kotoba.model';
import { AdvetisementService } from '../_services/advetisement.service';
import { AdItem } from './ad-item';


@Component({
  selector: 'app-adv',
  template: `
     <div>
      <app-ad-banner></app-ad-banner>
    </div>
  `,

})
export class AdvComponent implements OnInit {
  public kotobas: Kotoba[];

  constructor(
    private adService: AdvetisementService
  ) {}

  ngOnInit() {
   this.adService.getListKotoba().subscribe(data => {
    this.kotobas = data;
   });

  }
}
