import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlacasComponent } from './pages/placas/placas.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PagoComponent } from './pages/pago/pago.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvioComponent } from './pages/envio/envio.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    LoginComponent,
    PlacasComponent,
    CarritoComponent,
    PagoComponent,
    EnvioComponent,
    ProductoComponent,
    UsuarioComponent,
    CuentaComponent,
    NosotrosComponent,
    RegistrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
