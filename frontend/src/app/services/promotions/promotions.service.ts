import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from '@shared/models/Promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  private getAllUrl = 'http://localhost:8080/api/admin/promotions';
  private addPromoUrl = 'http://localhost:8080/api/admin/AddPromo';
  private sendPromoUrl = 'http://localhost:8080/api/admin/sendPromo';

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<any> {
    return this.http.get<any>(this.getAllUrl);
  }
  addPromotion(promotion: any): Observable<any> {
    return this.http.post<any>(this.addPromoUrl, promotion);
  }

  sendPromotion(id: number): Observable<any> {
    return this.http.post(`${this.sendPromoUrl}/${id}`, {});
  }
}