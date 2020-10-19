import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HugoTestModule } from '../../../test.module';
import { RegVentaComponent } from 'app/entities/reg-venta/reg-venta.component';
import { RegVentaService } from 'app/entities/reg-venta/reg-venta.service';
import { RegVenta } from 'app/shared/model/reg-venta.model';

describe('Component Tests', () => {
  describe('RegVenta Management Component', () => {
    let comp: RegVentaComponent;
    let fixture: ComponentFixture<RegVentaComponent>;
    let service: RegVentaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [RegVentaComponent],
      })
        .overrideTemplate(RegVentaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegVentaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegVentaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RegVenta('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.regVentas && comp.regVentas[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
