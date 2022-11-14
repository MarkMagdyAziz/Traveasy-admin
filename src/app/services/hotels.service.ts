import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icity } from '../interfaces/icity';
import { Ihotel } from '../interfaces/ihotel';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  selectedID : String = '';
  selectedHotel : any = {} ;


  constructor(  
      private HttpClient : HttpClient
) {


 }

private handleError(error: HttpErrorResponse){
  if(error.status === 0){
    console.error('an error ocuured: ', error.error)

  }else{
    console.error(`Backend returned code ${error.status}, body was: `, error.error)
  }
  return throwError(
    ()=> new Error('error occured, please try again. ')
  )
}

getHotels(): Observable<any>{
  return this.HttpClient.get<Ihotel[]>(`${environment.BasicURL}hotel`)
  .pipe(
    retry(2),
    catchError(this.handleError)
    )
}

// post
postHotel(newHotel:Ihotel) : Observable<Ihotel>{
  return this.HttpClient.post<Ihotel>(`${environment.BasicURL}hotel`,    
   JSON.stringify(newHotel),httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError)
    )}




    updateHotel(id: string,newHotel:any) : Observable<Ihotel>{
      return this.HttpClient.put<Ihotel>(`${environment.BasicURL}hotel/${id}`,
       JSON.stringify(newHotel))
      .pipe(
        retry(2),
        catchError(this.handleError)
        ) }



deleteHotel(id:any) {
  return this.HttpClient.delete(`${environment.BasicURL}hotel/${id}`)
  .pipe(
    retry(2),
    catchError(this.handleError)
    )
}

// get cities
getCities(): Observable<any>{
  return this.HttpClient.get<Icity[]>(`${environment.BasicURL}city`)
  .pipe(
    retry(2),
    catchError(this.handleError)
    )
}

// post cities
postCities(newCity:Icity) : Observable<Icity>{
  return this.HttpClient.post<Icity>(`${environment.BasicURL}city`,    
   JSON.stringify(newCity),httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError)
    )}


}
