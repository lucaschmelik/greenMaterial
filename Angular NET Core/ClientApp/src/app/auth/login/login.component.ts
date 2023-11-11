import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm=this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService){}

  login() {
    if (this.loginForm.valid) {

      if (this.loginForm.valid) {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;

        if (email && password) {

          const loginRequest: LoginRequest = {
            email: email,
            password: password
          };

          this.loginService.login(loginRequest).subscribe({
            next: (userData) => {
              console.log('UserData login component:', userData);

              if (userData.id != 0) {

                localStorage.setItem("id", userData.id.toString());
                localStorage.setItem("rol", userData.rol.toString());

                Swal.fire({
                  title: 'Inicio de sessión',
                  text: 'Se logueo correctamente',
                  icon: 'success',
                  timer: 1000
                })

                this.router.navigateByUrl("/inicio")
                this.loginForm.reset()
              }
              else{

                Swal.fire({
                  title: 'Inicio de sessión',
                  text: 'Ingresa el usuario y contraseña correcto',
                  icon: 'error',
                  timer: 3000
                })

                this.password.reset()
              }
            },
            error: (error) => {
              Swal.fire({
                title: 'Inicio de sessión',
                text: 'Vuelve a intentarlo',
                icon: 'error',
                timer: 3000
              })
              this.loginForm.reset();
              console.error(error);
            }
          });
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  register(){
    this.router.navigateByUrl("/registro");
  }

  get email(){
    return this.loginForm.controls.email
  }
  
  get password(){
    return this.loginForm.controls.password
  }

}
