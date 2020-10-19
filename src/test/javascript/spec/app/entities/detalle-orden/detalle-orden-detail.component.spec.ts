import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { HugoTestModule } from '../../../test.module';
import { DetalleOrdenDetailComponent } from 'app/entities/detalle-orden/detalle-orden-detail.component';
import { DetalleOrden } from 'app/shared/model/detalle-orden.model';

describe('Component Tests', () => {
  describe('DetalleOrden Management Detail Component', () => {
    let comp: DetalleOrdenDetailComponent;
    let fixture: ComponentFixture<DetalleOrdenDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ detalleOrden: new DetalleOrden('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [DetalleOrdenDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DetalleOrdenDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalleOrdenDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load detalleOrden on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detalleOrden).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
