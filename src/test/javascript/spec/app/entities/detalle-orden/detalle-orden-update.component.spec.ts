import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HugoTestModule } from '../../../test.module';
import { DetalleOrdenUpdateComponent } from 'app/entities/detalle-orden/detalle-orden-update.component';
import { DetalleOrdenService } from 'app/entities/detalle-orden/detalle-orden.service';
import { DetalleOrden } from 'app/shared/model/detalle-orden.model';

describe('Component Tests', () => {
  describe('DetalleOrden Management Update Component', () => {
    let comp: DetalleOrdenUpdateComponent;
    let fixture: ComponentFixture<DetalleOrdenUpdateComponent>;
    let service: DetalleOrdenService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [DetalleOrdenUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DetalleOrdenUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleOrdenUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleOrdenService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetalleOrden('123');
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
        const entity = new DetalleOrden();
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
