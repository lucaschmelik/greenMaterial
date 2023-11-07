import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserResponse } from 'src/app/services/auth/userResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLogin:boolean=false
  userLogin?:UserResponse

  constructor(private loginService:LoginService, private router:Router){  }

  ngOnInit(): void {

    this.loginService.userLogin.subscribe({
      next: userLogin => {
        this.userLogin = userLogin
      }
    })
    
    this.loginService.isUserLoginOn.subscribe({
      next: isUserLogin => {
        this.isUserLogin = isUserLogin
      }
    })
  }

  cerrarSesion(){
    this.loginService.cerrarSesion()

    Swal.fire({
      title: 'Cierre de sessión',
      text: 'Se cerró sessión correctamente',
      icon: 'info',
      timer: 1000
    })
    
    this.router.navigateByUrl("/inicio")
  }
  
}
