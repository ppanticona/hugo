import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HugoTestModule } from '../../../test.module';
import { PromocionUpdateComponent } from 'app/entities/promocion/promocion-update.component';
import { PromocionService } from 'app/entities/promocion/promocion.service';
import { Promocion } from 'app/shared/model/promocion.model';

describe('Component Tests', () => {
  describe('Promocion Management Update Component', () => {
    let comp: PromocionUpdateComponent;
    let fixture: ComponentFixture<PromocionUpdateComponent>;
    let service: PromocionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [PromocionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PromocionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PromocionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PromocionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Promocion('123');
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
        const entity = new Promocion();
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
