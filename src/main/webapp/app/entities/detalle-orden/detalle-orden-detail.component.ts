import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDetalleOrden } from 'app/shared/model/detalle-orden.model';

@Component({
  selector: 'jhi-detalle-orden-detail',
  templateUrl: './detalle-orden-detail.component.html',
})
export class DetalleOrdenDetailComponent implements OnInit {
  detalleOrden: IDetalleOrden | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detalleOrden }) => (this.detalleOrden = detalleOrden));
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
