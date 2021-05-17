import { Type } from '@angular/core';
import { Kotoba } from '../model/kotoba.model';

export class AdItem {
  constructor(public component: Type<any>, public data: Kotoba) {}
}
