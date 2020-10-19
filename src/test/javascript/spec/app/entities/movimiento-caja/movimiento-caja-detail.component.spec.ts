import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HugoTestModule } from '../../../test.module';
import { MovimientoCajaDetailComponent } from 'app/entities/movimiento-caja/movimiento-caja-detail.component';
import { MovimientoCaja } from 'app/shared/model/movimiento-caja.model';

describe('Component Tests', () => {
  describe('MovimientoCaja Management Detail Component', () => {
    let comp: MovimientoCajaDetailComponent;
    let fixture: ComponentFixture<MovimientoCajaDetailComponent>;
    const route = ({ data: of({ movimientoCaja: new MovimientoCaja('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [MovimientoCajaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MovimientoCajaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MovimientoCajaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load movimientoCaja on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.movimientoCaja).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
