import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HugoTestModule } from '../../../test.module';
import { RegVentaDetailComponent } from 'app/entities/reg-venta/reg-venta-detail.component';
import { RegVenta } from 'app/shared/model/reg-venta.model';

describe('Component Tests', () => {
  describe('RegVenta Management Detail Component', () => {
    let comp: RegVentaDetailComponent;
    let fixture: ComponentFixture<RegVentaDetailComponent>;
    const route = ({ data: of({ regVenta: new RegVenta('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [RegVentaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RegVentaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RegVentaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load regVenta on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.regVenta).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
