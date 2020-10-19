import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EmpleadoService } from 'app/entities/empleado/empleado.service';
import { IEmpleado, Empleado } from 'app/shared/model/empleado.model';

describe('Service Tests', () => {
  describe('Empleado Service', () => {
    let injector: TestBed;
    let service: EmpleadoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEmpleado;
    let expectedResult: IEmpleado | IEmpleado[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EmpleadoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Empleado(
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
            fecIngreso: currentDate.format(DATE_TIME_FORMAT),
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

      it('should create a Empleado', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            fecIngreso: currentDate.format(DATE_TIME_FORMAT),
            fecCrea: currentDate.format(DATE_TIME_FORMAT),
            fecModif: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecIngreso: currentDate,
            fecCrea: currentDate,
            fecModif: currentDate,
          },
          returnedFromService
        );

        service.create(new Empleado()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Empleado', () => {
        const returnedFromService = Object.assign(
          {
            tipDocEmp: 'BBBBBB',
            nroDocEmp: 'BBBBBB',
            nombresEmp: 'BBBBBB',
            apellidosEmp: 'BBBBBB',
            categoria: 'BBBBBB',
            tel1: 'BBBBBB',
            tel2: 'BBBBBB',
            correo: 'BBBBBB',
            direccion: 'BBBBBB',
            refDirecc: 'BBBBBB',
            distrito: 'BBBBBB',
            fecIngreso: currentDate.format(DATE_TIME_FORMAT),
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
            fecIngreso: currentDate,
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

      it('should return a list of Empleado', () => {
        const returnedFromService = Object.assign(
          {
            tipDocEmp: 'BBBBBB',
            nroDocEmp: 'BBBBBB',
            nombresEmp: 'BBBBBB',
            apellidosEmp: 'BBBBBB',
            categoria: 'BBBBBB',
            tel1: 'BBBBBB',
            tel2: 'BBBBBB',
            correo: 'BBBBBB',
            direccion: 'BBBBBB',
            refDirecc: 'BBBBBB',
            distrito: 'BBBBBB',
            fecIngreso: currentDate.format(DATE_TIME_FORMAT),
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
            fecIngreso: currentDate,
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

      it('should delete a Empleado', () => {
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
