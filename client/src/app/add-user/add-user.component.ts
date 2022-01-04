import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  formData!: FormGroup;
  finalData!: Object;



  constructor(public userService: UsersService) { }


  ngOnInit(): void {

    this.formData = new FormGroup({
      'name': new FormControl('', Validators.required),
      'number1': new FormControl('', [Validators.required,Validators.minLength(10)]),
      'check': new FormControl(false),
      'number2': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required,Validators.email]),
      'address': new FormControl('', Validators.required),
      'pincode': new FormControl('', Validators.required)


    })

  }
  onSubmit() {
    this.finalData = { name: this.formData.value.name, number1: this.formData.value.number1, number2: this.formData.value.number2, lastName: this.formData.value.lastName, email: this.formData.value.email, address: this.formData.value.address, pincode: this.formData.value.pincode }
    this.userService.addUser(this.finalData)
    this.formData.reset()

  }

  checkForNumber21() {
    console.log(this.formData.get('number2')?.invalid && this.formData.controls['number2'].touched);

    return this.formData.get('number2')?.invalid && this.formData.controls['number2'].touched
  }

  // checkEmail(){

  //   if(this.formData.get('email')?.invalid && this.formData.controls['email'].touched){
  //     return "Email is required!!"
  //   }

  // }


  getMailErrorMessage() {
    if (this.formData.get('email')?.hasError('required')&& this.formData.controls['email'].touched) {
      return 'You must enter a value';
    }

    return this.formData.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }


  getNumber1ErrorMessage() {
    if (this.formData.get('number1')?.hasError('required')&& this.formData.controls['number1'].touched) {
      return 'You must enter a value';
    }

    return this.formData.get('number1')?.hasError('minlength') ? '10 charachters are required!!' : '';
  }
  

// }

}
