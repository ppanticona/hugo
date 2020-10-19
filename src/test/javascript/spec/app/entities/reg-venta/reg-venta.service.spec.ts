import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RegVentaService } from 'app/entities/reg-venta/reg-venta.service';
import { IRegVenta, RegVenta } from 'app/shared/model/reg-venta.model';

describe('Service Tests', () => {
  describe('RegVenta Service', () => {
    let injector: TestBed;
    let service: RegVentaService;
    let httpMock: HttpTestingController;
    let elemDefault: IRegVenta;
    let expectedResult: IRegVenta | IRegVenta[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RegVentaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new RegVenta(
        'ID',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        'AAAAAAA',
        0,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
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
            fecEmiComp: currentDate.format(DATE_TIME_FORMAT),
            fecVencComp: currentDate.format(DATE_TIME_FORMAT),
            fecEmiModif: currentDate.format(DATE_TIME_FORMAT),
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

      it('should create a RegVenta', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            fecEmiComp: currentDate.format(DATE_TIME_FORMAT),
            fecVencComp: currentDate.format(DATE_TIME_FORMAT),
            fecEmiModif: currentDate.format(DATE_TIME_FORMAT),
            fecCrea: currentDate.format(DATE_TIME_FORMAT),
            fecModif: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecEmiComp: currentDate,
            fecVencComp: currentDate,
            fecEmiModif: currentDate,
            fecCrea: currentDate,
            fecModif: currentDate,
          },
          returnedFromService
        );

        service.create(new RegVenta()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RegVenta', () => {
        const returnedFromService = Object.assign(
          {
            periodo: 'BBBBBB',
            mes: 'BBBBBB',
            asientContab: 'BBBBBB',
            fecEmiComp: currentDate.format(DATE_TIME_FORMAT),
            fecVencComp: currentDate.format(DATE_TIME_FORMAT),
            tipComp: 'BBBBBB',
            nroSerieComp: 'BBBBBB',
            nroComp: 'BBBBBB',
            consoDia: 'BBBBBB',
            tipDocCli: 'BBBBBB',
            nroDocCli: 'BBBBBB',
            apeRazSocCli: 'BBBBBB',
            valFacExpor: 1,
            baseImpOperGrav: 1,
            dsctoBaseImp: 1,
            igvIpm: 1,
            dsctoIgvIpm: 1,
            impOpeExo: 1,
            impTotOpeInafec: 1,
            impSecCons: 1,
            baseImpArroz: 1,
            impVentArroz: 1,
            otrosNoBaseImp: 1,
            importeTotalComp: 1,
            codMoneda: 'BBBBBB',
            tipCambio: 1,
            fecEmiModif: currentDate.format(DATE_TIME_FORMAT),
            tipCompModif: 'BBBBBB',
            nroSerieCompModif: 'BBBBBB',
            nroCompModif: 'BBBBBB',
            identContrato: 'BBBBBB',
            errTipUno: 'BBBBBB',
            indCompVancMp: 'BBBBBB',
            estadoOperaCancMp: 'BBBBBB',
            campoLibre: 'BBBBBB',
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
            fecEmiComp: currentDate,
            fecVencComp: currentDate,
            fecEmiModif: currentDate,
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

      it('should return a list of RegVenta', () => {
        const returnedFromService = Object.assign(
          {
            periodo: 'BBBBBB',
            mes: 'BBBBBB',
            asientContab: 'BBBBBB',
            fecEmiComp: currentDate.format(DATE_TIME_FORMAT),
            fecVencComp: currentDate.format(DATE_TIME_FORMAT),
            tipComp: 'BBBBBB',
            nroSerieComp: 'BBBBBB',
            nroComp: 'BBBBBB',
            consoDia: 'BBBBBB',
            tipDocCli: 'BBBBBB',
            nroDocCli: 'BBBBBB',
            apeRazSocCli: 'BBBBBB',
            valFacExpor: 1,
            baseImpOperGrav: 1,
            dsctoBaseImp: 1,
            igvIpm: 1,
            dsctoIgvIpm: 1,
            impOpeExo: 1,
            impTotOpeInafec: 1,
            impSecCons: 1,
            baseImpArroz: 1,
            impVentArroz: 1,
            otrosNoBaseImp: 1,
            importeTotalComp: 1,
            codMoneda: 'BBBBBB',
            tipCambio: 1,
            fecEmiModif: currentDate.format(DATE_TIME_FORMAT),
            tipCompModif: 'BBBBBB',
            nroSerieCompModif: 'BBBBBB',
            nroCompModif: 'BBBBBB',
            identContrato: 'BBBBBB',
            errTipUno: 'BBBBBB',
            indCompVancMp: 'BBBBBB',
            estadoOperaCancMp: 'BBBBBB',
            campoLibre: 'BBBBBB',
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
            fecEmiComp: currentDate,
            fecVencComp: currentDate,
            fecEmiModif: currentDate,
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

      it('should delete a RegVenta', () => {
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
