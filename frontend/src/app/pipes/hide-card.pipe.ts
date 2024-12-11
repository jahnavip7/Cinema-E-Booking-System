import { Pipe, PipeTransform } from '@angular/core';

@Pipe({standalone: true, name: 'hideCard'})
export class HideCardPipe implements PipeTransform {
  transform(cardNumber: string): string {
    if (!cardNumber || cardNumber.length < 16) {
      return 'Invalid Card';
    }
    return cardNumber.replace(/\d{12}(\d{4})/, '**** **** **** $1');
  }
}
