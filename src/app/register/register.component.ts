import { Component } from '@angular/core';
import { UserService } from '../common/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../common/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isEditing: boolean = false;
  user : User = {
    id:0,
    name:"",
    email:"",
    
  }
  password: string = "";

  constructor(
  private userService : UserService,
  
   private toastr : ToastrService,
   private router : Router,
   private activatedRoute: ActivatedRoute
){}
// j'ai mis la onsubmit quand j'ai click sur la sumbit ca me ajoute la name , email , password 
onSubmit():void{
    this.userService.createUser(this.user.name , this.user.email , this.password).subscribe({
      //  la next function bien résussi çc me caffiche la toastr compte bien ajoute et varige vers pas home principal
      next: () => {
        this.toastr.success('compte bien ajouté');
        this.router.navigate(['/']);
      },
      // si non ca me affiche toastr Erreur durant la création de compte ajoute et varige vers pas home principal 
      error: (err) => {
        console.error(err);
        this.toastr.error("Erreur durant la création de compte");
        this.router.navigate(['/']);
      }
    });
  }
}
