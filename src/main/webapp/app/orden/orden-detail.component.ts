import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Account } from 'app/core/user/account.model';
// import { Observable } from 'rxjs';
// import * as moment from 'moment';
// import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { faAnchor, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { JhiDataUtils } from 'ng-jhipster';

@Component({
  selector: 'jhi-clusterk8sdetail',
  templateUrl: './orden-detail.component.html',
  styleUrls: ['orden.scss'],
})
export class OrdenDetailComponent implements OnInit {
  ocultarAmbProd = true;
  ocultarAmbDesa = true;
  ocultarAmbCali = true;
  filtroSIProdflag = true;
  filtroSUProdflag = true;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}
