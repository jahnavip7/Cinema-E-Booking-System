export interface Promotion {
    promoId: number;
    title: string;
    promoName: string,
    description: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    sent: boolean;
  }