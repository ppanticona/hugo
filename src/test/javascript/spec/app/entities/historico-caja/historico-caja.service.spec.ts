import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { HistoricoCajaService } from 'app/entities/historico-caja/historico-caja.service';
import { IHistoricoCaja, HistoricoCaja } from 'app/shared/model/historico-caja.model';

describe('Service Tests', () => {
  describe('HistoricoCaja Service', () => {
    let injector: TestBed;
    let service: HistoricoCajaService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistoricoCaja;
    let expectedResult: IHistoricoCaja | IHistoricoCaja[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(HistoricoCajaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new HistoricoCaja(
        'ID',
        currentDate,
        currentDate,
        'AAAAAAA',
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
            fecIniVig: currentDate.format(DATE_TIME_FORMAT),
            fecFinVig: currentDate.format(DATE_TIME_FORMAT),
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

      it('should create a HistoricoCaja', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            fecIniVig: currentDate.format(DATE_TIME_FORMAT),
            fecFinVig: currentDate.format(DATE_TIME_FORMAT),
            fecCrea: currentDate.format(DATE_TIME_FORMAT),
            fecModif: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecIniVig: currentDate,
            fecFinVig: currentDate,
            fecCrea: currentDate,
            fecModif: currentDate,
          },
          returnedFromService
        );

        service.create(new HistoricoCaja()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HistoricoCaja', () => {
        const returnedFromService = Object.assign(
          {
            fecIniVig: currentDate.format(DATE_TIME_FORMAT),
            fecFinVig: currentDate.format(DATE_TIME_FORMAT),
            estado: 'BBBBBB',
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
            fecIniVig: currentDate,
            fecFinVig: currentDate,
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

      it('should return a list of HistoricoCaja', () => {
        const returnedFromService = Object.assign(
          {
            fecIniVig: currentDate.format(DATE_TIME_FORMAT),
            fecFinVig: currentDate.format(DATE_TIME_FORMAT),
            estado: 'BBBBBB',
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
            fecIniVig: currentDate,
            fecFinVig: currentDate,
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

      it('should delete a HistoricoCaja', () => {
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
