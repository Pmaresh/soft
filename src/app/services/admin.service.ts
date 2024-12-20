import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8085/admin';
 
  constructor(private http: HttpClient) {}
 
  login(username: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `username=${username}&password=${password}`;
    return this.http.post<string>(`${this.baseUrl}/login`, body, { headers, responseType: 'text' as 'json' });
  }
 
  // Add other methods for account requests, deposit, withdraw, etc.
}
