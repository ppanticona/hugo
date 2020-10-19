import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAutorizacion } from 'app/shared/model/autorizacion.model';
import { AutorizacionService } from './autorizacion.service';
import { AutorizacionDeleteDialogComponent } from './autorizacion-delete-dialog.component';

@Component({
  selector: 'jhi-autorizacion',
  templateUrl: './autorizacion.component.html',
})
export class AutorizacionComponent implements OnInit, OnDestroy {
  autorizacions?: IAutorizacion[];
  eventSubscriber?: Subscription;

  constructor(
    protected autorizacionService: AutorizacionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.autorizacionService.query().subscribe((res: HttpResponse<IAutorizacion[]>) => (this.autorizacions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAutorizacions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAutorizacion): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAutorizacions(): void {
    this.eventSubscriber = this.eventManager.subscribe('autorizacionListModification', () => this.loadAll());
  }

  delete(autorizacion: IAutorizacion): void {
    const modalRef = this.modalService.open(AutorizacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.autorizacion = autorizacion;
  }
}
