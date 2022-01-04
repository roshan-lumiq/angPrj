import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(private http: HttpClient) { }



  addUser(body: any) {



    this.http.post('http://localhost:5001/addUser', body).subscribe((data: any) => {
      console.log(data);

    })
  }

  getUsers(page:number=1) {
   let url = "http://localhost:5001/allUser/"+page
   return this.http.get(url)
  }

  deleteUser(id:string){

    let url = "http://localhost:5001/deleteUser/"+id
    return this.http.delete(url)

  }
  updateUser(body:any){
    let url = "http://localhost:5001/updateUser"
    // let body = {id,number1,number2,email,address,name,pincode}
        return this.http.put(url,body)
  }

}
