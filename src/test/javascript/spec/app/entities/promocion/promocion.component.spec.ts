import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HugoTestModule } from '../../../test.module';
import { PromocionComponent } from 'app/entities/promocion/promocion.component';
import { PromocionService } from 'app/entities/promocion/promocion.service';
import { Promocion } from 'app/shared/model/promocion.model';

describe('Component Tests', () => {
  describe('Promocion Management Component', () => {
    let comp: PromocionComponent;
    let fixture: ComponentFixture<PromocionComponent>;
    let service: PromocionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [PromocionComponent],
      })
        .overrideTemplate(PromocionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PromocionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PromocionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Promocion('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.promocions && comp.promocions[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
