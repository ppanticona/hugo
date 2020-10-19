import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HugoTestModule } from '../../../test.module';
import { AutorizacionDetailComponent } from 'app/entities/autorizacion/autorizacion-detail.component';
import { Autorizacion } from 'app/shared/model/autorizacion.model';

describe('Component Tests', () => {
  describe('Autorizacion Management Detail Component', () => {
    let comp: AutorizacionDetailComponent;
    let fixture: ComponentFixture<AutorizacionDetailComponent>;
    const route = ({ data: of({ autorizacion: new Autorizacion('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [AutorizacionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AutorizacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AutorizacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load autorizacion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.autorizacion).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
