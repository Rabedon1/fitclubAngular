import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
  standalone: false
})
export class UsuarioListComponent implements OnInit {
  usuarios: UsuarioDto[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    console.log('Cargando lista de usuarios');
    this.usuarioService.obtenerTodosLosUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  editarUsuario(idUsuario: number, correo: string): void {
    console.log('Navegando a editar usuario:', { idUsuario, correo });
    if (!idUsuario || !correo) {
      console.error('ID o correo inválido:', { idUsuario, correo });
      return;
    }
    this.router.navigate([`/usuarios/edit/${idUsuario}`], { queryParams: { correo } });
  }
}
