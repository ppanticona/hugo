import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrden } from 'app/shared/model/orden.model';
import { OrdenService } from './orden.service';
import { OrdenDeleteDialogComponent } from './orden-delete-dialog.component';

@Component({
  selector: 'jhi-orden',
  templateUrl: './orden.component.html',
})
export class OrdenComponent implements OnInit, OnDestroy {
  ordens?: IOrden[];
  eventSubscriber?: Subscription;

  constructor(
    protected ordenService: OrdenService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.ordenService.query().subscribe((res: HttpResponse<IOrden[]>) => (this.ordens = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOrdens();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOrden): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInOrdens(): void {
    this.eventSubscriber = this.eventManager.subscribe('ordenListModification', () => this.loadAll());
  }

  delete(orden: IOrden): void {
    const modalRef = this.modalService.open(OrdenDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.orden = orden;
  }
}
