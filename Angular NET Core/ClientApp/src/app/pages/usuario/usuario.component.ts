import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../services/auth/userResponse';
import { UserService } from '../../services/usuario/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  page = 1;
  pageSize = 4;
  users: UserResponse[] = [];
  collectionSize = this.users.length;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
      this.userService.getUsers().subscribe((usersResponse) => {
      this.users = usersResponse;
    });
  }

  changeRol(userId: number, newRole: string) {
    this.ShowLoading();
    this.userService.changeRol(userId, newRole).subscribe(() => {

      Swal.fire({
        title: 'Actualizar usuario',
        text: "Se procesó la actualización del usuario correctamente",
        icon: 'success'
      });

    })
  }

  ShowLoading() {
    Swal.fire({
      title: 'Actualizando el rol del usuario',
      html: 'Aguarde por favor...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
  }
}
