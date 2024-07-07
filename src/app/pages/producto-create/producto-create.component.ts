import { Component, OnInit } from '@angular/core';
import { Product } from '../model/producto.model';
import { ProductoService } from '../services/producto.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink],
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent {

  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    sku: '',
    state: true
  };

  constructor(private productService: ProductoService, private router: Router) {}

  onSubmit(): void {
    Swal.fire({
      title: '¿Estás seguro de registrar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.createProduct();
      }
    });
  }

  private createProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(
      (createdProduct) => {
        console.log('Producto creado:', createdProduct);
        Swal.fire({
          icon: 'success',
          title: 'Producto Creado',
          text: 'El producto se ha creado correctamente.'
        });
        this.router.navigate(['/menu/productos']);
      },
      (error) => {
        console.error('Error al crear el producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear el producto. Por favor, inténtelo nuevamente.'
        });
      }
    );
  }
}