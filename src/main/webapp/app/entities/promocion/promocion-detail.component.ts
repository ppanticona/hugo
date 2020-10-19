import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPromocion } from 'app/shared/model/promocion.model';

@Component({
  selector: 'jhi-promocion-detail',
  templateUrl: './promocion-detail.component.html',
})
export class PromocionDetailComponent implements OnInit {
  promocion: IPromocion | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ promocion }) => (this.promocion = promocion));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
