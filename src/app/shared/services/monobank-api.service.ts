import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MonobankAPIService {
  private baseUrl = "https://api.monobank.ua";

  constructor(private http: HttpClient) {}

  getAccountBalance(token: string): Observable<any> {
    const headers = { "X-Token": token };
    return this.http.get<any>(`${this.baseUrl}/personal/client-info`, {
      headers,
    });
  }
}
