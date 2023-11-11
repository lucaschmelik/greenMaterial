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

      // Ordenar por la propiedad esActual y luego por id
      this.invoices.sort((a, b) => {
        if (a.esActual === 'Si' && b.esActual === 'No') {
          return -1; // Si 'a' tiene esActual 'Si' y 'b' tiene esActual 'No', 'a' va primero
        } else if (a.esActual === 'No' && b.esActual === 'Si') {
          return 1; // Si 'a' tiene esActual 'No' y 'b' tiene esActual 'Si', 'b' va primero
        } else {
          // Si ambos tienen el mismo esActual o ambos tienen 'Si' o ambos tienen 'No', ordena por id
          return a.id - b.id;
        }
      });

      console.log(dataPedidos)
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
