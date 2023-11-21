import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  registerForm=this.formBuilder.group({
    lastName: ['', [Validators.required]],
    firstName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  get lastName(){
    return this.registerForm.controls.lastName
  }
  get firstName(){
    return this.registerForm.controls.firstName
  }
  get email(){
    return this.registerForm.controls.email
  }
  get password(){
    return this.registerForm.controls.password
  }

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService){}


  Register(){
    if (this.registerForm.valid) {
      const lastName = this.registerForm.get('lastName')?.value;
      const firstName = this.registerForm.get('firstName')?.value;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      if (lastName && firstName && email && password) {

        const newUser: any = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          Rol: "Cliente"
        };

        this.loginService.register(newUser).subscribe({
          next: (userData) => {
          
            if(userData.id != 0){

              Swal.fire({
                title: 'Registro de usuario',
                text: 'Se registró correctamente',
                icon: 'success',
                timer: 1000
              })

              this.router.navigateByUrl("/iniciar-sesion")
              this.registerForm.reset()
            }
            else{

              Swal.fire({
                title: 'Registro de usuario',
                text: 'Ingresa el usuario y contraseña correcto',
                icon: 'error',
                timer: 3000
              })

              this.password.reset()
            }
          },
          error: (error) => {
            Swal.fire({
              title: 'Registro de usuario',
              text: 'Vuelve a intentarlo',
              icon: 'error',
              timer: 3000
            })
            this.registerForm.reset();
            console.error(error);
          }
        });
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
