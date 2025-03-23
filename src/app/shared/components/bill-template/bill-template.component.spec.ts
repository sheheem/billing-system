import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTemplateComponent } from './bill-template.component';

describe('BillTemplateComponent', () => {
  let component: BillTemplateComponent;
  let fixture: ComponentFixture<BillTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
