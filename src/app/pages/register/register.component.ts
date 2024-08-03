import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  users: any = [];
  username: any = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.userService.login().subscribe((res) => {
      this.users = res;
      for (let i = 0; i < this.users.length; i++) {
        this.username.push(this.users[i].username);
      }
    });
  }

  submitRegister() {
    if (this.form.invalid) {
      alert('Podaci iz forme nisu validni! Molim Vas popunite sva polja u formi!');
    }
    if(this.username.includes(this.form.value.username)) {
      alert("Uneto korisnicko ime je zauzeto! Molim Vas unesite drugo.")
    }  
    if(!this.username.includes(this.form.value.username)) {
    this.userService.register(this.form.value).subscribe((res) => {
      alert('Uspesno ste napravili nalog!');
      this.form.reset();
      this.router.navigate(['/login']);
    });
  }
  }
}
