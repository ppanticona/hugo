import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPromocion } from 'app/shared/model/promocion.model';
import { PromocionService } from './promocion.service';
import { PromocionDeleteDialogComponent } from './promocion-delete-dialog.component';

@Component({
  selector: 'jhi-promocion',
  templateUrl: './promocion.component.html',
})
export class PromocionComponent implements OnInit, OnDestroy {
  promocions?: IPromocion[];
  eventSubscriber?: Subscription;

  constructor(
    protected promocionService: PromocionService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.promocionService.query().subscribe((res: HttpResponse<IPromocion[]>) => (this.promocions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPromocions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPromocion): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInPromocions(): void {
    this.eventSubscriber = this.eventManager.subscribe('promocionListModification', () => this.loadAll());
  }

  delete(promocion: IPromocion): void {
    const modalRef = this.modalService.open(PromocionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.promocion = promocion;
  }
}
