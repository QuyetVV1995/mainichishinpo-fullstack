import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem } from './ad-item';
import { AdComponent } from './ad.component';
import { KotobaComponent } from './kotoba.component';
import { Kotoba } from '../model/kotoba.model';
import { AdvetisementService } from '../_services/advetisement.service';

@Component({
  selector: 'app-ad-banner',
  template: `
              <div class="ad-banner-example">
                <h3>Advertisements</h3>
                <ng-template adHost></ng-template>
              </div>
            `
})
export class AdBannerComponent implements OnInit, OnDestroy {
  kotobas: Kotoba[];
  currentAdIndex = -1;
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private adService: AdvetisementService) { }

  ngOnInit() {

    this.adService.getListKotoba().subscribe(data => {
      this.kotobas = data;

      this.loadComponent();
      this.getAds();
     });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.kotobas.length;
    const adItem = this.kotobas[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(KotobaComponent);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    // console.log(adItem.data);
    const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);

    componentRef.instance.data = adItem;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 10000);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
