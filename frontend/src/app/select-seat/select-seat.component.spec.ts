import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectSeatComponent } from './select-seat.component';
import { FormsModule } from '@angular/forms'; // Add necessary imports

describe('SelectSeatComponent', () => {
  let component: SelectSeatComponent;
  let fixture: ComponentFixture<SelectSeatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule], // Import FormsModule to handle ngModel bindings
      declarations: [SelectSeatComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a seat', () => {
    component.selectSeat('A1'); // Simulate selecting seat A1
    expect(component.selectedSeats.find(s => s.seat === 'A1')).toEqual({ seat: 'A1', type: 'Adult' }); // Use find + toEqual
  });

  it('should deselect a seat', () => {
    component.selectSeat('A1'); // First select seat A1
    component.selectSeat('A1'); // Then deselect seat A1
    expect(component.selectedSeats.find(s => s.seat === 'A1')).toBeUndefined(); // Ensure A1 is deselected
  });

  it('should toggle seat selection', () => {
    component.selectSeat('A1'); // Select A1
    expect(component.selectedSeats.find(s => s.seat === 'A1')).toEqual({ seat: 'A1', type: 'Adult' }); // Ensure seat is selected
    component.selectSeat('A1'); // Deselect A1
    expect(component.selectedSeats.find(s => s.seat === 'A1')).toBeUndefined(); // Ensure seat is deselected
  });

  it('should handle seat types correctly', () => {
    component.seatType['A1'] = 'Child'; // Set seat type for A1
    component.selectSeat('A1'); // Select seat A1 with type Child
    expect(component.selectedSeats.find(s => s.seat === 'A1')).toEqual({ seat: 'A1', type: 'Child' }); // Ensure seat type is Child
  });

  it('should prevent selecting booked seats', () => {
    component.seatStatus['A1'] = 'booked'; // Mark seat A1 as booked
    spyOn(window, 'alert'); // Mock the alert function
    component.selectSeat('A1'); // Try selecting the booked seat
    expect(window.alert).toHaveBeenCalledWith('This seat is already booked!'); // Ensure alert was called
    expect(component.selectedSeats.find(s => s.seat === 'A1')).toBeUndefined(); // Ensure seat was not selected
  });

  it('should proceed to order summary if seats are selected', () => {
    spyOn(component['router'], 'navigate'); // Spy on the navigate method
    component.selectSeat('A1'); // Select a seat
    component.proceedToOrderSummary(); // Proceed to order summary
    expect(component['router'].navigate).toHaveBeenCalledWith(['/order-summary'], {
      state: { selectedSeats: component.selectedSeats }
    });
  });

  it('should not proceed to order summary if no seats are selected', () => {
    spyOn(window, 'alert'); // Mock alert
    component.proceedToOrderSummary(); // Try proceeding without selecting any seats
    expect(window.alert).toHaveBeenCalledWith('Please select at least one seat to proceed.'); // Ensure alert was shown
  });
});
