import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators ,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../model/producto.model';
import { ProductoService } from '../services/producto.service';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-edit',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink,ReactiveFormsModule,NgIf],
  templateUrl: './producto-edit.component.html',
  styleUrl: './producto-edit.component.css'
})
export class ProductoEditComponent implements OnInit {
  productForm: FormGroup; 

  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    sku: '',
    state: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductoService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      id:[0,Validators.required],
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      sku: ['', Validators.required],
      state: [false]
    });
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id = parseInt(idString, 10);
      this.productService.obtener(id).subscribe(
        (response: any) => {
          this.product = response.data; 
          this.productForm.patchValue(this.product); 
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    } else {
      console.error('No ID parameter found in URL');
    }
  }

  onSubmit(): void {
    Swal.fire({
      title: '¿Estás seguro de actualizar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.createProduct();
      }
    });
  }

  private createProduct(): void {
    this.productService.createProduct(this.productForm.value).subscribe(
      (newProduct: Product) => {
        console.log('Producto creado:', newProduct);
        Swal.fire({
          icon: 'success',
          title: 'Producto Actualizado',
          text: 'El producto se ha Actualizado correctamente.'
        });
        this.router.navigate(['/menu/productos']);
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear el producto. Por favor, inténtelo nuevamente.'
        });
      }
    );
  }



}