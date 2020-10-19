import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HugoTestModule } from '../../../test.module';
import { AutorizacionComponent } from 'app/entities/autorizacion/autorizacion.component';
import { AutorizacionService } from 'app/entities/autorizacion/autorizacion.service';
import { Autorizacion } from 'app/shared/model/autorizacion.model';

describe('Component Tests', () => {
  describe('Autorizacion Management Component', () => {
    let comp: AutorizacionComponent;
    let fixture: ComponentFixture<AutorizacionComponent>;
    let service: AutorizacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [AutorizacionComponent],
      })
        .overrideTemplate(AutorizacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AutorizacionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AutorizacionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Autorizacion('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.autorizacions && comp.autorizacions[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
