import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProductoService } from 'app/entities/producto/producto.service';
import { IProducto, Producto } from 'app/shared/model/producto.model';

describe('Service Tests', () => {
  describe('Producto Service', () => {
    let injector: TestBed;
    let service: ProductoService;
    let httpMock: HttpTestingController;
    let elemDefault: IProducto;
    let expectedResult: IProducto | IProducto[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProductoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Producto(
        'ID',
        'AAAAAAA',
        0,
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

      it('should create a Producto', () => {
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

        service.create(new Producto()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Producto', () => {
        const returnedFromService = Object.assign(
          {
            descripcion: 'BBBBBB',
            valor: 1,
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

      it('should return a list of Producto', () => {
        const returnedFromService = Object.assign(
          {
            descripcion: 'BBBBBB',
            valor: 1,
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

      it('should delete a Producto', () => {
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
