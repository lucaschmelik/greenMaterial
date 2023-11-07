import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent as InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './auth/login/login.component';
import { PlacasComponent } from './pages/placas/placas.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PagoComponent } from './pages/pago/pago.component';
import { EnvioComponent } from './pages/envio/envio.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';

const routes: Routes = [
  {path:'', redirectTo:'/inicio', pathMatch:'full'},
  {path:'inicio', component:InicioComponent},
  {path:'iniciar-sesion', component:LoginComponent},
  {path:'placas', component:PlacasComponent},
  {path:'carrito', component:CarritoComponent},
  {path:'pago', component:PagoComponent},
  {path:'envio', component:EnvioComponent},
  {path:'productos', component:ProductoComponent},
  {path:'usuario', component:UsuarioComponent},
  {path:'cuenta', component:CuentaComponent},
  {path:'nosotros', component:NosotrosComponent},
  {path:'registro', component:RegistrarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
