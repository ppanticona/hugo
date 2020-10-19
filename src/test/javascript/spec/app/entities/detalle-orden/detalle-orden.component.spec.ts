import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HugoTestModule } from '../../../test.module';
import { DetalleOrdenComponent } from 'app/entities/detalle-orden/detalle-orden.component';
import { DetalleOrdenService } from 'app/entities/detalle-orden/detalle-orden.service';
import { DetalleOrden } from 'app/shared/model/detalle-orden.model';

describe('Component Tests', () => {
  describe('DetalleOrden Management Component', () => {
    let comp: DetalleOrdenComponent;
    let fixture: ComponentFixture<DetalleOrdenComponent>;
    let service: DetalleOrdenService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [DetalleOrdenComponent],
      })
        .overrideTemplate(DetalleOrdenComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleOrdenComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleOrdenService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DetalleOrden('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.detalleOrdens && comp.detalleOrdens[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
