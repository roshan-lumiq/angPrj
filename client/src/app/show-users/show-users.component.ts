import { Component, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  allUser: any = [];
  inputData!: FormGroup;

  pageNo: number = Number(localStorage.getItem('pageNo')) || 1

  next: any;
  prev: any;
  data1: any;
  something: any = {};
  selectedRow: any;

  constructor(public userService: UsersService) { }

  displayedColumns: string[] = ['name', 'lastName', 'email', 'number1', 'address', 'pincode', 'number2', 'id'];

  onClick(id: string) {
    this.userService.deleteUser(id).subscribe(data => {

      this.fetchData()

    })
  }
  onEdit(id: any) {

    this.selectedRow = id;

  }





  onDone(index: any) {


    let formData = this.inputData.get('formArray') as FormArray

    let number1 = formData.controls[index].get('numberControl1')?.value
    let number2 = formData.controls[index].get('numberControl2')?.value
    let email = formData.controls[index].get('emailControl')?.value
    let address = formData.controls[index].get('addressControl')?.value
    let pincode = formData.controls[index].get('pincodeControl')?.value

    // console.log(number1);
    let id = this.selectedRow

    this.data1 = {
      id, number1, number2, email, address, pincode
    }
    console.log(this.data1);

    this.userService.updateUser(this.data1).subscribe((data) => {
      console.log(data);
      this.fetchData(this.pageNo)
      this.selectedRow = undefined;

    })



  }

  onNext() {
    this.fetchData(this.next)
    this.pageNo += 1
    localStorage.setItem('pageNo', `${this.pageNo}`)
  }



  onPrev() {

    this.fetchData(this.prev)

    this.pageNo -= 1
    localStorage.setItem('pageNo', `${this.pageNo}`)

  }


  ngOnInit(): void {



    this.inputData = new FormGroup({
      'formArray': new FormArray([])
    })
    this.fetchData(this.pageNo)
    // this.somethingAsdf()
    // console.log(this.inputData);
  }

  fetchData(pageNumber = this.pageNo) {

    this.userService.getUsers(pageNumber).subscribe((data: any) => {

      let formControlArr = this.inputData.get('formArray') as FormArray;
      formControlArr.clear();



      data.users.forEach((user: any) => {

        // this.allUser.push(user)

        formControlArr.push(new FormGroup({
          nameControl: new FormControl(user.name),
          lastNameControl: new FormControl(user.lastName),
          emailControl: new FormControl(user.email),
          numberControl1: new FormControl(user.number1),
          numberControl2: new FormControl(user.number2),
          addressControl: new FormControl(user.address),
          pincodeControl: new FormControl(user.pincode)
        }))

      });
      console.log(data);
      // console.log(this.inputData);


      this.allUser = data.users

      if (data.next) {
        this.next = data.next;
      } else {
        this.next = undefined;
      }
      if (data.prev) {
        this.prev = data.prev;
      } else {
        this.prev = undefined;
      }
    })
  }

}
