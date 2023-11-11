import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  invoices: any[] = [];

  constructor(private cuentaService: CuentaService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.GetInvoices();
  }

  GetInvoices(){
    this.cuentaService.GetInvoicesByUser().subscribe((dataPedidos: any) => {

      this.invoices = dataPedidos.filter((invoice: any) => invoice.estado !== 'Eliminado');
 
      this.invoices.sort((a, b) => {
        if (a.esActual === 'Si' && b.esActual === 'No') {
          return -1;
        } else if (a.esActual === 'No' && b.esActual === 'Si') {
          return 1;
        } else {
          return a.id - b.id;
        }
      });
    });
  }

  DeleteInvoice(idInvoice: number){
    this.cuentaService.DeleteInvoices(idInvoice).subscribe({
      complete: () =>  this.GetInvoices()
    })
  }

  OrderDelivery(idInvoice: number){
    this.cuentaService.ChangeStateByInvoiceId(idInvoice, 5).subscribe({
      complete: () => {
        Swal.fire({
          title: 'Marcar entregado',
          text: "Se realizó con éxito el cambio de estado",
          icon: 'success'
        })
        
        this.GetInvoices();
      },
      error: () => 
        Swal.fire({
          title: 'Marcar entregado',
          text: "No se realizó el cambio de estado",
          icon: 'error'
        })
    });
  }

  EsEstadoAceptable(estado: string): boolean {
    return estado !== 'Pagado' && estado !== 'Inexistente' && estado !== 'Entregado' && estado !== 'Eliminado';
  }
  
}
