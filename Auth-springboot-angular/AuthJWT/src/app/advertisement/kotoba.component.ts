import { Component, Input } from '@angular/core';
import { Kotoba } from '../model/kotoba.model';

import { AdComponent } from './ad.component';

@Component({
  template: `
    <div class="job-ad">
      <h4>{{data.kanji}} : {{data.yomikata}} : {{data.imi}}</h4>
      <h5> {{data.rei}} </h5>
      <h5>  {{data.iminorei}} </h5>
    </div>
  `,
  styleUrls: ['./adv.scss']
})
export class KotobaComponent implements AdComponent {
  @Input() data: Kotoba;

}
