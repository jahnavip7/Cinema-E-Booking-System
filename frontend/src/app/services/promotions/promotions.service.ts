import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from '@shared/models/Promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  private getAllUrl = 'http://localhost:8080/api/admin/promotions';
  private addPromoUrl = 'http://localhost:8080/api/admin/Addpromo';
  private sendPromoUrl = 'http://localhost:8080/api/admin/SendPromo';

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.getAllUrl);
  }
  addPromotion(promotion: any): Observable<any> {
    return this.http.post<any>(this.addPromoUrl, promotion);
  }

  // sendpromotion(id: number): Observable<any> {
  //   return this.http.post(`${this.sendPromoUrl}/${id}`, {});
  // }
}