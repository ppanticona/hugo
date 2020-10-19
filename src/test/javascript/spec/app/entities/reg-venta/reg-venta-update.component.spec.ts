import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HugoTestModule } from '../../../test.module';
import { RegVentaUpdateComponent } from 'app/entities/reg-venta/reg-venta-update.component';
import { RegVentaService } from 'app/entities/reg-venta/reg-venta.service';
import { RegVenta } from 'app/shared/model/reg-venta.model';

describe('Component Tests', () => {
  describe('RegVenta Management Update Component', () => {
    let comp: RegVentaUpdateComponent;
    let fixture: ComponentFixture<RegVentaUpdateComponent>;
    let service: RegVentaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [RegVentaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RegVentaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegVentaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegVentaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RegVenta('123');
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
        const entity = new RegVenta();
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
