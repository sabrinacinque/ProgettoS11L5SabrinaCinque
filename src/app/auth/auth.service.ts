import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { iUser } from '../Models/i-user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { iAuthData } from '../Models/i-auth-data';
import { iAuthResponse } from '../Models/i-auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper:JwtHelperService = new JwtHelperService()

  authSubject = new BehaviorSubject<null|iUser>(null);

  syncIsLoggedIn:boolean = false;

  user$ = this.authSubject.asObservable()

  isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    tap(user => this.syncIsLoggedIn = user)
  )

  constructor(
    private http:HttpClient,
    private router:Router
  ) {

    this.restoreUser()

  }

  loginUrl:string = 'http://localhost:3000/login';
  registerUrl:string = 'http://localhost:3000/register';
  usersUrl: string = 'http://localhost:3000/users';


  register(newUser:Partial<iUser>):Observable<iAuthResponse>{
    return this.http.post<iAuthResponse>(this.registerUrl,newUser)
  }


  login(authData:iAuthData):Observable<iAuthResponse>{
    return this.http.post<iAuthResponse>(this.loginUrl, authData)
    .pipe(tap(data=>{

      this.authSubject.next(data.user)
      localStorage.setItem('accessData',JSON.stringify(data))

      this.autoLogout()

    }))
  }

  logout():void{
    this.authSubject.next(null)
    localStorage.removeItem('accessData')
    alert("Logout effettuato con successo.Torna presto a trovarci!")

    this.router.navigate(['/auth/login'])

  }

  autoLogout():void{

    const accessData = this.getAccessData()

    if(!accessData) return

    const expDate = this.jwtHelper.getTokenExpirationDate(accessData.accessToken) as Date

    const expMs = expDate.getTime() - new Date().getTime()

    setTimeout(this.logout,expMs)

  }

  getAccessData():iAuthResponse|null{

    const accessDataJson = localStorage.getItem('accessData')
    if(!accessDataJson) return null

    const accessData:iAuthResponse = JSON.parse(accessDataJson)
    return accessData;
  }

  restoreUser():void{

    const accessData = this.getAccessData()

    if(!accessData) return

    if(this.jwtHelper.isTokenExpired(accessData.accessToken)) return

    this.authSubject.next(accessData.user)
    this.autoLogout()

  }

  getAllUsers(): Observable<iUser[]> {
    return this.http.get<iUser[]>(this.usersUrl);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${userId}`);
  }

}
