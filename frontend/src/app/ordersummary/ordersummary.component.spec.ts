import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSummaryComponent } from './ordersummary.component';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the total cost correctly', () => {
    expect(component.getTotalCost()).toEqual(22.5); // Assuming 1 child ticket ($5.5), 2 adult tickets ($8.5 each)
  });

  it('should calculate the sales tax correctly', () => {
    expect(component.getSalesTax()).toBeCloseTo(1.575, 2); // 7% of 22.5
  });

  it('should have the correct total cost including fees and tax', () => {
    expect(component.totalCost).toBeCloseTo(27.075, 2);
  });
});
