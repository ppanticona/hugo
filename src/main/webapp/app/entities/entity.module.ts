import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'promocion',
        loadChildren: () => import('./promocion/promocion.module').then(m => m.HugoPromocionModule),
      },
      {
        path: 'reg-venta',
        loadChildren: () => import('./reg-venta/reg-venta.module').then(m => m.HugoRegVentaModule),
      },
      {
        path: 'movimiento-caja',
        loadChildren: () => import('./movimiento-caja/movimiento-caja.module').then(m => m.HugoMovimientoCajaModule),
      },
      {
        path: 'historico-caja',
        loadChildren: () => import('./historico-caja/historico-caja.module').then(m => m.HugoHistoricoCajaModule),
      },
      {
        path: 'autorizacion',
        loadChildren: () => import('./autorizacion/autorizacion.module').then(m => m.HugoAutorizacionModule),
      },
      {
        path: 'caja',
        loadChildren: () => import('./caja/caja.module').then(m => m.HugoCajaModule),
      },
      {
        path: 'empleado',
        loadChildren: () => import('./empleado/empleado.module').then(m => m.HugoEmpleadoModule),
      },
      {
        path: 'producto',
        loadChildren: () => import('./producto/producto.module').then(m => m.HugoProductoModule),
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.HugoClienteModule),
      },
      {
        path: 'detalle-orden',
        loadChildren: () => import('./detalle-orden/detalle-orden.module').then(m => m.HugoDetalleOrdenModule),
      },
      {
        path: 'orden',
        loadChildren: () => import('./orden/orden.module').then(m => m.HugoOrdenModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class HugoEntityModule {}
