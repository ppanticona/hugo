import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { faAnchor, faServer, faNetworkWired, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginModalService } from '../core/login/login-modal.service';
import { AccountService } from '../core/auth/account.service';
import { Account } from '../core/user/account.model';
import { PrendasPendientesDialogComponent } from './prendasPendientes-dialog.component';
@Component({
  selector: 'jhi-busquedapublicacionweb',
  templateUrl: './orden.component.html',
  styleUrls: ['orden.scss'],
})
export class OrdenComponent implements OnInit, OnDestroy {
  faNetworkWired = faNetworkWired;
  faPlusCircle = faPlusCircle;
  faServer = faServer;
  faAnchor = faAnchor;
  buscarPor = 'dominio';
  account: Account | null = null;
  authSubscription?: Subscription;

  constructor(private accountService: AccountService, private loginModalService: LoginModalService, protected modalService: NgbModal) {}

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
