import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user';
import { UserStore } from 'src/app/store/userStore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userStore: UserStore
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  submitLogin() {
    if (this.form.invalid) {
      alert("Podaci iz forme nisu validni! Molim Vas popunite sva polja u formi!");
      return;
    }
  
    this.userService.login().subscribe(res => {
      const user = res.find((u: User) => {
        return u.username === this.form.value.username && u.password === this.form.value.password;
      });
  
      if (user) {
        alert("Uspesno ste se ulogovali!");
        this.userStore.addUser(user);
        this.form.reset();
        localStorage.setItem('token', '0f23ffd2232e3qwd2');
        this.router.navigate(['/home']);
      } else {
        alert("Korisnik nije pronadjen!");
      }
    }, err => {
      console.error(err); // Ispiši error u konzolu radi boljeg debagovanja
      alert("Something went wrong!");
    });
  }
}  