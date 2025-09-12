import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../common/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Objet pour stocker les données du formulaire
  loginU = { email: '', password: '' };
   // Injection du service utilisateur et du routeur

  constructor(private userService: UserService, private router: Router) {}
  login() {
    this.userService.login(this.loginU.email, this.loginU.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Connexion KO!');
      },
    });
  }
 
  }



