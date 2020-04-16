import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancleRegister = new EventEmitter();
model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe(()=>{
      console.log('reg successfull');
      this.cancle();
    }, error =>{
      console.log('error registering');
    });
  }

  cancle(){
    this.cancleRegister.emit(false);
    console.log('cancle');
  }
  
}
