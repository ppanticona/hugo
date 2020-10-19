import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HugoTestModule } from '../../../test.module';
import { MovimientoCajaUpdateComponent } from 'app/entities/movimiento-caja/movimiento-caja-update.component';
import { MovimientoCajaService } from 'app/entities/movimiento-caja/movimiento-caja.service';
import { MovimientoCaja } from 'app/shared/model/movimiento-caja.model';

describe('Component Tests', () => {
  describe('MovimientoCaja Management Update Component', () => {
    let comp: MovimientoCajaUpdateComponent;
    let fixture: ComponentFixture<MovimientoCajaUpdateComponent>;
    let service: MovimientoCajaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [MovimientoCajaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MovimientoCajaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoCajaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimientoCajaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MovimientoCaja('123');
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
        const entity = new MovimientoCaja();
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
