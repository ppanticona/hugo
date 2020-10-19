import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HugoTestModule } from '../../../test.module';
import { AutorizacionUpdateComponent } from 'app/entities/autorizacion/autorizacion-update.component';
import { AutorizacionService } from 'app/entities/autorizacion/autorizacion.service';
import { Autorizacion } from 'app/shared/model/autorizacion.model';

describe('Component Tests', () => {
  describe('Autorizacion Management Update Component', () => {
    let comp: AutorizacionUpdateComponent;
    let fixture: ComponentFixture<AutorizacionUpdateComponent>;
    let service: AutorizacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [AutorizacionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AutorizacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AutorizacionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AutorizacionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Autorizacion('123');
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
        const entity = new Autorizacion();
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
