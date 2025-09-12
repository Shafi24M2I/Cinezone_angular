import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../common/user.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public userService: UserService , private router: Router){}
  logout(event: Event): void {
    event.preventDefault();
    this.userService.logout().subscribe({
      next: () => this.router.navigate(['login']),
      error: () => alert('Erreur durant la deconnexion'),
    });
  }

}
