import { Component, OnInit } from '@angular/core';
import { Product } from '../model/producto.model';
import { ProductoService } from '../services/producto.service';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent  implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response.data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }



  deleteProduct(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(
          () => {
            Swal.fire(
              'Eliminado',
              'El producto ha sido eliminado.',
              'success'
            );
            this.loadProducts();
          },
          (error) => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el producto.',
              'error'
            );
            console.error('Error deleting product:', error);
          }
        );
      }
    });
  }
  
  editProduct(id: number): void {
    this.router.navigate(['/menu/productos/editar', id]);
  }

}