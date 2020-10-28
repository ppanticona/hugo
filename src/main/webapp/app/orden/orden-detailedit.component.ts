import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-clusterkafkadetail',
  templateUrl: './orden-detailedit.component.html',
  styleUrls: ['orden.scss'],
})
export class OrdenDetaileditComponent implements OnInit {
  isSaving = false;
  textoSaving = '';
  data: any = {};
  servidoresAsignados: any = [];
  servidoresMasterProd: any = [];
  servidoresLbProd: any = [];
  servidoresWorkerProd: any = [];

  servidoresMasterCali: any = [];
  servidoresLbCali: any = [];
  servidoresWorkerCali: any = [];

  servidoresMasterDesa: any = [];
  servidoresLbDesa: any = [];
  servidoresWorkerDesa: any = [];

  authSubscription?: Subscription;

  ocultarAmbProd = true;
  ocultarAmbDesa = true;
  ocultarAmbCali = true;
  filtroSIProdflag = true;
  filtroSUProdflag = true;

  versTecnologia: any;

  constructor(protected activatedRoute: ActivatedRoute, protected modalService: NgbModal) {}

  ngOnInit(): void {}
}
