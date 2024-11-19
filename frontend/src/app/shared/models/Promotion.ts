export interface Promotion {
    id: number;
    title: string;
    description: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    sent: boolean;
  }