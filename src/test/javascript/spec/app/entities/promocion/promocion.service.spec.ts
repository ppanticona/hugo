import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PromocionService } from 'app/entities/promocion/promocion.service';
import { IPromocion, Promocion } from 'app/shared/model/promocion.model';

describe('Service Tests', () => {
  describe('Promocion Service', () => {
    let injector: TestBed;
    let service: PromocionService;
    let httpMock: HttpTestingController;
    let elemDefault: IPromocion;
    let expectedResult: IPromocion | IPromocion[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PromocionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Promocion(
        'ID',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
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

      it('should create a Promocion', () => {
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

        service.create(new Promocion()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Promocion', () => {
        const returnedFromService = Object.assign(
          {
            tipPromocion: 'BBBBBB',
            val1: 'BBBBBB',
            val2: 'BBBBBB',
            val3: 'BBBBBB',
            maxProm: 'BBBBBB',
            fecIniVig: currentDate.format(DATE_TIME_FORMAT),
            fecFinVig: currentDate.format(DATE_TIME_FORMAT),
            comentarios: 'BBBBBB',
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

      it('should return a list of Promocion', () => {
        const returnedFromService = Object.assign(
          {
            tipPromocion: 'BBBBBB',
            val1: 'BBBBBB',
            val2: 'BBBBBB',
            val3: 'BBBBBB',
            maxProm: 'BBBBBB',
            fecIniVig: currentDate.format(DATE_TIME_FORMAT),
            fecFinVig: currentDate.format(DATE_TIME_FORMAT),
            comentarios: 'BBBBBB',
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

      it('should delete a Promocion', () => {
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
