import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { HugoSharedModule } from 'app/shared/shared.module';
import { HugoCoreModule } from 'app/core/core.module';
import { HugoAppRoutingModule } from './app-routing.module';
import { HugoHomeModule } from './home/home.module';
import { HugoEntityModule } from './entities/entity.module';
import { HugoOrdenModule } from './orden/orden.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    HugoSharedModule,
    HugoCoreModule,
    HugoHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    HugoEntityModule,
    HugoOrdenModule,
    HugoAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class HugoAppModule {}
