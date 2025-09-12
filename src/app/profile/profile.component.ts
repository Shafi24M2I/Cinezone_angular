import { Component } from '@angular/core';
import { User } from '../common/user.interface';
import { UserService } from '../common/user.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user! : User;
  constructor(private userService: UserService){}
  ngOnInit() {
  this.userService.profile().subscribe({
    next: (profileUser) => {
      this.user = profileUser;
    },
    error: () => {
      alert('Veuillez vous connecter');
    }
  });
}
}