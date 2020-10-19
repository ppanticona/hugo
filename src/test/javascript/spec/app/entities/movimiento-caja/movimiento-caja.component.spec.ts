import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HugoTestModule } from '../../../test.module';
import { MovimientoCajaComponent } from 'app/entities/movimiento-caja/movimiento-caja.component';
import { MovimientoCajaService } from 'app/entities/movimiento-caja/movimiento-caja.service';
import { MovimientoCaja } from 'app/shared/model/movimiento-caja.model';

describe('Component Tests', () => {
  describe('MovimientoCaja Management Component', () => {
    let comp: MovimientoCajaComponent;
    let fixture: ComponentFixture<MovimientoCajaComponent>;
    let service: MovimientoCajaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [MovimientoCajaComponent],
      })
        .overrideTemplate(MovimientoCajaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoCajaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimientoCajaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MovimientoCaja('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.movimientoCajas && comp.movimientoCajas[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
