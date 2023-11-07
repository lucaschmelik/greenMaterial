import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { ProductService } from '../../services/product/product.service';
import { ProductResponse } from '../../services/product/productResponse';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  constructor(
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private router: Router) { }

  productMocks: ProductResponse[] = []

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (userData) => {
        this.productMocks = userData.map((productData) => {
          return {
            id: productData.id,
            description: productData.description,
            subdescription: productData.subdescription,
            detail: productData.detail,
            price: productData.price,
            color: productData.color,
            stock: productData.stock,
            image: productData.image
          };
        });

        console.log('Productos en componente:', this.productMocks);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addProduct(id: number) {
    this.router.navigate(['/placas', { productMocks: JSON.stringify(this.productMocks.find(producto => producto.id === id)) }]);
  }
}
