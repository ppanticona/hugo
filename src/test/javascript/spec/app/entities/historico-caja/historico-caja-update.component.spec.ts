import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HugoTestModule } from '../../../test.module';
import { HistoricoCajaUpdateComponent } from 'app/entities/historico-caja/historico-caja-update.component';
import { HistoricoCajaService } from 'app/entities/historico-caja/historico-caja.service';
import { HistoricoCaja } from 'app/shared/model/historico-caja.model';

describe('Component Tests', () => {
  describe('HistoricoCaja Management Update Component', () => {
    let comp: HistoricoCajaUpdateComponent;
    let fixture: ComponentFixture<HistoricoCajaUpdateComponent>;
    let service: HistoricoCajaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [HistoricoCajaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(HistoricoCajaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoricoCajaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoricoCajaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistoricoCaja('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistoricoCaja();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
