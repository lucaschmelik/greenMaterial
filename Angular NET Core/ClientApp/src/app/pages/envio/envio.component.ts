import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Delivery } from 'src/app/services/envio/delivery';
import { EnvioService } from 'src/app/services/envio/envio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent implements OnInit{

  constructor(private router: Router, private envioService: EnvioService, private formBuilder:FormBuilder) { }

  total: number = 0;
  delivery: number = 1000;
  isDelivery: boolean = true;
  deliveryForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    adress: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    notes: ['']
  })

  get name(){
    return this.deliveryForm.controls.name
  }
  
  get adress(){
    return this.deliveryForm.controls.adress
  }

  get phoneNumber(){
    return this.deliveryForm.controls.phoneNumber
  }
  
  ngOnInit(): void {
    this.envioService.GetTotalAmountByStateAndUser().subscribe((response) => 
    this.total = response)
  }

  guardarOpcionSeleccionada(valor: number, isDelivery: boolean ) {
    this.delivery = valor;
    this.isDelivery = isDelivery;
  }

  goToPayment() {
    if(this.isDelivery){
      if(this.deliveryForm.valid){
        const nameValue = this.deliveryForm.get('name')?.value;
        const adressValue = this.deliveryForm.get('adress')?.value;
        const phoneNumberValue = this.deliveryForm.get('phoneNumber')?.value;
        const notesValue = this.deliveryForm.get('notes')?.value?? '';

        if(nameValue && adressValue && phoneNumberValue){
          const deliveryRequest: Delivery = {
            deliveryTypeId : 1, 
            name: nameValue,
            adress: adressValue,
            phoneNumber: phoneNumberValue,
            notes: notesValue,
            price: 1000
          };

          this.envioService.SaveDeliveryType(deliveryRequest).subscribe({
            next: () => {
              console.log("Se registró correctamente el envío")
              this.router.navigate(['/pago']);
            }
          }          
          )
        }
      }
      else{

        Swal.fire({
          title: 'Validar Detalle de Envío',
          text: "No se pudo validar el formulario",
          icon: 'warning'
        });

        this.deliveryForm.markAllAsTouched()
      }
    }
    else {
      const deliveryRequest: Delivery = {
        deliveryTypeId : 2, 
        name: '',
        adress: '',
        phoneNumber: '',
        notes: '',
        price: 0
      };

      this.envioService.SaveDeliveryType(deliveryRequest).subscribe({
        next: () => {
          console.log("Se registró correctamente el pago en efectivo")
          this.router.navigate(['/pago']);
        }
      })
    }
  }
  

}
