import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegVenta } from 'app/shared/model/reg-venta.model';
import { RegVentaService } from './reg-venta.service';
import { RegVentaDeleteDialogComponent } from './reg-venta-delete-dialog.component';

@Component({
  selector: 'jhi-reg-venta',
  templateUrl: './reg-venta.component.html',
})
export class RegVentaComponent implements OnInit, OnDestroy {
  regVentas?: IRegVenta[];
  eventSubscriber?: Subscription;

  constructor(protected regVentaService: RegVentaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.regVentaService.query().subscribe((res: HttpResponse<IRegVenta[]>) => (this.regVentas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRegVentas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRegVenta): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRegVentas(): void {
    this.eventSubscriber = this.eventManager.subscribe('regVentaListModification', () => this.loadAll());
  }

  delete(regVenta: IRegVenta): void {
    const modalRef = this.modalService.open(RegVentaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.regVenta = regVenta;
  }
}
