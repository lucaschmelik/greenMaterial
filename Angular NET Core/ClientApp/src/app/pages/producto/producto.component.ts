import { Component } from '@angular/core';

interface Product {
  id: number;
  description: string;
  subdescription: string;
  detail: string;
  price: number;
  color: string;
  stock: number;
  image: string;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  productMocks: Product[] = [
    {
      id: 1,
      description: 'Product 1',
      subdescription: 'Subdescription for Product 1',
      detail: 'Details of Product 1',
      price: 29.99,
      color: 'Red',
      stock: 50,
      image: '/assets/luminaria1.png'
    },
    {
      id: 2,
      description: 'Product 2',
      subdescription: 'Subdescription for Product 2',
      detail: 'Details of Product 2',
      price: 49.99,
      color: 'Blue',
      stock: 30,
      image: '/assets/luminaria2.png'
    },
    {
      id: 3,
      description: 'Product 3',
      subdescription: 'Subdescription for Product 3',
      detail: 'Details of Product 3',
      price: 19.99,
      color: 'Green',
      stock: 70,
      image: '/assets/placa4.png'
    },
    {
      id: 4,
      description: 'Product 4',
      subdescription: 'Subdescription for Product 4',
      detail: 'Details of Product 4',
      price: 39.99,
      color: 'Yellow',
      stock: 20,
      image: '/assets/placa3.png'
    }
  ];
}
