import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { ICliente, Cliente } from 'app/shared/model/cliente.model';

describe('Service Tests', () => {
  describe('Cliente Service', () => {
    let injector: TestBed;
    let service: ClienteService;
    let httpMock: HttpTestingController;
    let elemDefault: ICliente;
    let expectedResult: ICliente | ICliente[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ClienteService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Cliente(
        'ID',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
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

      it('should create a Cliente', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            fecCrea: currentDate.format(DATE_TIME_FORMAT),
            fecModif: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecCrea: currentDate,
            fecModif: currentDate,
          },
          returnedFromService
        );

        service.create(new Cliente()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Cliente', () => {
        const returnedFromService = Object.assign(
          {
            tipDocCli: 'BBBBBB',
            nroDocCli: 'BBBBBB',
            nombresCli: 'BBBBBB',
            apellidosCli: 'BBBBBB',
            tel1: 'BBBBBB',
            tel2: 'BBBBBB',
            correo: 'BBBBBB',
            direccion: 'BBBBBB',
            refDireccion: 'BBBBBB',
            distrito: 'BBBBBB',
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

      it('should return a list of Cliente', () => {
        const returnedFromService = Object.assign(
          {
            tipDocCli: 'BBBBBB',
            nroDocCli: 'BBBBBB',
            nombresCli: 'BBBBBB',
            apellidosCli: 'BBBBBB',
            tel1: 'BBBBBB',
            tel2: 'BBBBBB',
            correo: 'BBBBBB',
            direccion: 'BBBBBB',
            refDireccion: 'BBBBBB',
            distrito: 'BBBBBB',
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

      it('should delete a Cliente', () => {
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
