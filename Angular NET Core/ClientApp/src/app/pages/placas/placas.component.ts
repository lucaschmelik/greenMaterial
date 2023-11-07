import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../../shared/models/product';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-placas',
  templateUrl: './placas.component.html',
  styleUrls: ['./placas.component.css']
})

export class PlacasComponent implements OnInit {
  
  constructor(
    private productService:ProductService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  cantidad: string = "1";
  color: string = "1";

  product: Product = {
    id: 0,
    description: '',
    subdescription: '',
    detail: '',
    price: 0,
    color: '',
    stock: 0,
    image: ''
  };

  descont: number = 20;

  ngOnInit() {
    this.route.params.subscribe(params => {
      var ejemplo = JSON.parse(params['productMocks']);
      this.product.id = ejemplo.id;
      this.product.description = ejemplo.description;
      this.product.subdescription = ejemplo.subdescription;
      this.product.detail = ejemplo.detail;
      this.product.price = ejemplo.price;
      this.product.stock = ejemplo.stock;
      this.product.color = ejemplo.color;
      this.product.image = ejemplo.image;
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
