import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HugoTestModule } from '../../../test.module';
import { CajaComponent } from 'app/entities/caja/caja.component';
import { CajaService } from 'app/entities/caja/caja.service';
import { Caja } from 'app/shared/model/caja.model';

describe('Component Tests', () => {
  describe('Caja Management Component', () => {
    let comp: CajaComponent;
    let fixture: ComponentFixture<CajaComponent>;
    let service: CajaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [CajaComponent],
      })
        .overrideTemplate(CajaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CajaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CajaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Caja('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cajas && comp.cajas[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
