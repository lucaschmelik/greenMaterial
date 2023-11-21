import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../services/auth/userResponse';
import { UserService } from '../../services/usuario/user.service';

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
}
