import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ItemResponse } from 'src/app/services/carrito/ItemResponse';
import { EnvioService } from 'src/app/services/envio/envio.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private router: Router, private carritoService: CarritoService, private envioService: EnvioService) { }

  itemsList: ItemResponse[] = []
  totalPrice = 0;
  stateInvoice = this.carritoService.hasCurrentInvoice;

  ngOnInit() {
    this.loadShippingCart();
    this.HasInvoiceByStateAndUser();
  }

  loadShippingCart() {
    this.carritoService.getProductsCurrentShippingCart().subscribe({
      next: (data) => {

        if (!data) {
          this.itemsList = []
        }
        else {
          const response = data[0]
          this.itemsList = response.products
        }

        this.calculateTotalPrice();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  calculateTotalPrice() {
    this.totalPrice = this.itemsList.reduce((total, item) => total + item.product.price * item.amount, 0);
  }

  confirmShippingCart() {
    this.carritoService.updateInvoice(2).subscribe(() =>
      this.router.navigate(['/envio']))
  }

  goTo() {
    if (this.stateInvoice == 2) {
      this.goToDelivery()
    } else {
      this.goToPayment()
    }
  }

  goToDelivery() {
    this.router.navigate(['/envio']);
  }

  goToPayment() {
    this.router.navigate(['/pago']);
  }

  deleteItem(itemId: number) {
    this.carritoService.deleteItem(itemId).subscribe({
      next: () => this.loadShippingCart(),
      complete: () => this.HasInvoiceByStateAndUser()
    })
  }

  HasInvoiceByStateAndUser() {
    this.carritoService.HasInvoiceByStateAndUser().subscribe((response) => {
      this.stateInvoice = response
    })
  }
}
