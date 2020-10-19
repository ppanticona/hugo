import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { HugoTestModule } from '../../../test.module';
import { PromocionDetailComponent } from 'app/entities/promocion/promocion-detail.component';
import { Promocion } from 'app/shared/model/promocion.model';

describe('Component Tests', () => {
  describe('Promocion Management Detail Component', () => {
    let comp: PromocionDetailComponent;
    let fixture: ComponentFixture<PromocionDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ promocion: new Promocion('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [PromocionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PromocionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PromocionDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load promocion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.promocion).toEqual(jasmine.objectContaining({ id: '123' }));
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
