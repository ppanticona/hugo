import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HugoTestModule } from '../../../test.module';
import { HistoricoCajaDetailComponent } from 'app/entities/historico-caja/historico-caja-detail.component';
import { HistoricoCaja } from 'app/shared/model/historico-caja.model';

describe('Component Tests', () => {
  describe('HistoricoCaja Management Detail Component', () => {
    let comp: HistoricoCajaDetailComponent;
    let fixture: ComponentFixture<HistoricoCajaDetailComponent>;
    const route = ({ data: of({ historicoCaja: new HistoricoCaja('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HugoTestModule],
        declarations: [HistoricoCajaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(HistoricoCajaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistoricoCajaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load historicoCaja on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.historicoCaja).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
