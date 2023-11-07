import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagoService } from 'src/app/services/pago/pago.service';
import { Payment } from 'src/app/shared/models/payment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit, AfterViewInit{

  constructor(private pagoService: PagoService, private formBuilder:FormBuilder, private router: Router) { }

  deliveryTotal: number = 0
  itemsTotal: number = 0
  paymentType: number = 1
  creditCardForm = this.formBuilder.group({
    number: ['', [Validators.required]],
    mmyy: ['', Validators.required],
    cvc: ['', Validators.required],
    name: ['', Validators.required]
  })

  get number(){
    return this.creditCardForm.controls.number
  }
  
  get mmyy(){
    return this.creditCardForm.controls.mmyy
  }

  get cvc(){
    return this.creditCardForm.controls.cvc
  }

  get name(){
    return this.creditCardForm.controls.name
  }

  ngOnInit(): void {
    this.getResumeByUserId()
  }

  ngAfterViewInit() {
    const accordion = document.getElementById('accordionFlushExample');
    if(accordion){
      accordion.addEventListener('shown.bs.collapse', (event) => {
        const target = event.target as HTMLElement;
        const selectedAccordionIndex = Array.from(accordion.children).indexOf(target);
        console.log(`Accordion seleccionado: ${selectedAccordionIndex}`);
      });
    }
  }

  changeTypePayment(paymentType: number){
    this.paymentType = paymentType
  }

  getResumeByUserId(){
    this.pagoService.getResumeByUserId().subscribe(data => {
      this.deliveryTotal = data.deliveryPrice,
      this.itemsTotal = data.itemsPrice
    });
  }

  ShowLoading(){
    Swal.fire({
      title: 'Uploading...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
  }

  finishOrder(){
    
    this.ShowLoading();

    if (this.paymentType == 2){
      if(this.creditCardForm.valid){
        console.log("Procesando pago con tarjeta...")
        const number = this.creditCardForm.get('number')?.value;
        const mmyy = this.creditCardForm.get('mmyy')?.value;
        const cvc = this.creditCardForm.get('cvc')?.value;
        const name = this.creditCardForm.get('name')?.value;

        if(number && mmyy && cvc && name){
          const creditCardRequest: Payment = {
            number : number, 
            mmyy: mmyy,
            cvc: cvc,
            name: name,
            paymentType: 2
          };          

          this.pagoService.postPayment(creditCardRequest).subscribe({
            next: () => {
              
              Swal.fire({
                title: 'Pago de pedido',
                text: "Se procesó el pago correctamente",
                icon: 'success'
              });
              
            },
            complete: () => {
              console.log("Se registró correctamente el pago")
              this.router.navigate(['/inicio'])
            } 
          })
        }
      }
      else{
        Swal.fire({
          title: 'Validar Detalle de Envío',
          text: "No se pudo validar el formulario",
          icon: 'warning',
          timerProgressBar: true
        });

        this.creditCardForm.markAllAsTouched()
      }
    }
    else{
      console.log("Procesando pago en efectivo...")

    const creditCardRequest: Payment = {
      number : '', 
      mmyy: '',
      cvc: '',
      name: '',
      paymentType: 3
    }

    this.pagoService.postPayment(creditCardRequest).subscribe({
      next: () => {
        console.log("Se registró correctamente el pago")
        this.router.navigate(['/inicio'])

        Swal.fire({
          title: 'Pago de pedido',
          text: "Se procesó el pago correctamente",
          icon: 'success'
        });
      }
    })
    }
  }  

}
