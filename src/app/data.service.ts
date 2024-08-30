import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jsonFileUrl = '/assets/Adult.json'; // Path to your JSON file

  constructor(private http: HttpClient) { }

  getData(jsonFileUrl:string): Observable<any> {
    return this.http.get<any>(jsonFileUrl);
  }
  
}
