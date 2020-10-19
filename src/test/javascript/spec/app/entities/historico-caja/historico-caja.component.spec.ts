import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HugoTestModule } from '../../../test.module';
import { HistoricoCajaComponent } from 'app/entities/historico-caja/historico-caja.component';
import { HistoricoCajaService } from 'app/entities/historico-caja/historico-caja.service';
import { HistoricoCaja } from 'app/shared/model/historico-caja.model';

describe('Component Tests', () => {
  describe('HistoricoCaja Management Component', () => {
    let comp: HistoricoCajaComponent;
    let fixture: ComponentFixture<HistoricoCajaComponent>;
    let service: HistoricoCajaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [HistoricoCajaComponent],
      })
        .overrideTemplate(HistoricoCajaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoricoCajaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoricoCajaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HistoricoCaja('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.historicoCajas && comp.historicoCajas[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
