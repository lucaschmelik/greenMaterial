import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../../shared/models/product';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-placas',
  templateUrl: './placas.component.html',
  styleUrls: ['./placas.component.css']
})

export class PlacasComponent {
  
  constructor(
    private productService:ProductService,
    private invoiceService: InvoiceService,
    private router: Router){}
  
  cantidad: string = "1";
  color: string = "1";

  product: Product = {
    id: 0,
    description: '',
    subdescription: '',
    detail: '',
    price: 0,
    color: '',
    stock: 0
  };

  descont: number = 20;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    
    this.productService.getProducts().subscribe({
      next: (userData) => {

        const firstProduct = userData[0];

        this.product.id = firstProduct.id;
        this.product.price = firstProduct.price;
        this.product.description = firstProduct.description;
        this.product.subdescription = firstProduct.subdescription;
        this.product.detail = firstProduct.detail;
        this.product.price = firstProduct.price;

        console.log('productos componente placas', userData);
      },
      error: (error) => {
        console.error(error);
      }
    });      
  }

  agregarAlCarrito() {
    
    this.invoiceService.crearInvoice().subscribe({
      next: (invoiceId) => {
        console.log('Ítems agregados al carrito con éxito', invoiceId);
        this.invoiceService.AgregarItemInvoice(invoiceId, this.product.id, Number(this.cantidad)).subscribe({
          complete: () => {
            this.router.navigate(['/carrito'])
          },
          error: (error) => {
            Swal.fire({
              title: 'ERROR',
              text: error,
              icon: 'error'
            })
          }
        })
      },
      error: (error) => {
        Swal.fire({
          title: 'ERROR',
          text: error,
          icon: 'error'
        })
      }
    });
  }
}
