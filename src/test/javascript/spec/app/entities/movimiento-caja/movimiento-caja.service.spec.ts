import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MovimientoCajaService } from 'app/entities/movimiento-caja/movimiento-caja.service';
import { IMovimientoCaja, MovimientoCaja } from 'app/shared/model/movimiento-caja.model';

describe('Service Tests', () => {
  describe('MovimientoCaja Service', () => {
    let injector: TestBed;
    let service: MovimientoCajaService;
    let httpMock: HttpTestingController;
    let elemDefault: IMovimientoCaja;
    let expectedResult: IMovimientoCaja | IMovimientoCaja[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(MovimientoCajaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new MovimientoCaja(
        'ID',
        'AAAAAAA',
        0,
        currentDate,
        0,
        false,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecMovimiento: currentDate.format(DATE_TIME_FORMAT),
            fecCrea: currentDate.format(DATE_TIME_FORMAT),
            fecModif: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a MovimientoCaja', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            fecMovimiento: currentDate.format(DATE_TIME_FORMAT),
            fecCrea: currentDate.format(DATE_TIME_FORMAT),
            fecModif: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecMovimiento: currentDate,
            fecCrea: currentDate,
            fecModif: currentDate,
          },
          returnedFromService
        );

        service.create(new MovimientoCaja()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MovimientoCaja', () => {
        const returnedFromService = Object.assign(
          {
            tipMovimiento: 'BBBBBB',
            monto: 1,
            fecMovimiento: currentDate.format(DATE_TIME_FORMAT),
            version: 1,
            indDel: true,
            fecCrea: currentDate.format(DATE_TIME_FORMAT),
            usuCrea: 'BBBBBB',
            ipCrea: 'BBBBBB',
            fecModif: currentDate.format(DATE_TIME_FORMAT),
            usuModif: 'BBBBBB',
            ipModif: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecMovimiento: currentDate,
            fecCrea: currentDate,
            fecModif: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MovimientoCaja', () => {
        const returnedFromService = Object.assign(
          {
            tipMovimiento: 'BBBBBB',
            monto: 1,
            fecMovimiento: currentDate.format(DATE_TIME_FORMAT),
            version: 1,
            indDel: true,
            fecCrea: currentDate.format(DATE_TIME_FORMAT),
            usuCrea: 'BBBBBB',
            ipCrea: 'BBBBBB',
            fecModif: currentDate.format(DATE_TIME_FORMAT),
            usuModif: 'BBBBBB',
            ipModif: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecMovimiento: currentDate,
            fecCrea: currentDate,
            fecModif: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a MovimientoCaja', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
