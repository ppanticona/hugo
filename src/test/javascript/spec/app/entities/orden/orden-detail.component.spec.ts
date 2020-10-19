import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { HugoTestModule } from '../../../test.module';
import { OrdenDetailComponent } from 'app/entities/orden/orden-detail.component';
import { Orden } from 'app/shared/model/orden.model';

describe('Component Tests', () => {
  describe('Orden Management Detail Component', () => {
    let comp: OrdenDetailComponent;
    let fixture: ComponentFixture<OrdenDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ orden: new Orden('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [OrdenDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OrdenDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdenDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load orden on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.orden).toEqual(jasmine.objectContaining({ id: '123' }));
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
