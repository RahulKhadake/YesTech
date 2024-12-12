import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
apiurl = "http://localhost:3000/Userlistdata";
  constructor(private http: HttpClient) { }

  GetAllUserData(): Observable<any> {
    return this.http.get(this.apiurl);
  }
  UpdateUser(id: any, user: any): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, user);
  }

  Deleteuserdata(id:any)
  {
    return this.http.delete(`${this.apiurl}/${id}`);
  }

  postuserAPI(userdata:any)
  {
    return this.http.post(this.apiurl,userdata);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.apiurl}/${id}`);
  }
  
}
