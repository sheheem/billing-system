import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { BillTemplateComponent } from '../../shared/components/bill-template/bill-template.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-create-bill',
  standalone: true,
  imports: [CommonModule, BillTemplateComponent, FormsModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatButtonModule, CurrencyPipe, MatNativeDateModule],
  templateUrl: './create-bill.component.html',
  styleUrl: './create-bill.component.css'
})
export class CreateBillComponent implements OnInit {
  @ViewChild('billTemplate') billTemplate!: ElementRef;
  invoiceForm!: FormGroup;
  showTemplate: boolean = false;
  formData: any;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      type: ['QUOTATION', Validators.required],
      invoiceNumber: ['', Validators.required],
      date: ['', Validators.required],
      poNumber: ['', Validators.required],
      soldTo: ['', Validators.required],
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
      this.addItem();
      this.items.controls.forEach(control => {
        control.valueChanges.subscribe(() => {
          this.calculateItemTotal(control as FormGroup);
        });
      });
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  calculateItemTotal(item: FormGroup) {
    const quantity = item.get('quantity')?.value || 0;
    const unitPrice = item.get('unitPrice')?.value || 0;
    const total = quantity * unitPrice;
    item.patchValue({ total }, { emitEvent: false });
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemNo: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }]
    });
  }

  addItem() {
    const item = this.createItem();
    this.items.push(item);
    
    // Subscribe to value changes for the new item
    item.valueChanges.subscribe(() => {
      this.calculateItemTotal(item);
    });
  }

  resetForm() {
    this.invoiceForm.reset({
      type: 'QUOTATION'
    });
    this.items.clear();
    this.addItem();
  }

  removeItem(i: number) {
    this.items.removeAt(i);
  }
  // Add these methods to your component class
getSubtotal(): number {
  return this.items.controls.reduce((sum, item) => {
    return sum + (item.get('total')?.value || 0);
  }, 0);
}

getTax(): number {
  return this.getSubtotal() * 0.15; // 15% tax
}

getTotal(): number {
  return this.getSubtotal() + this.getTax();
}

onSubmit() {
  if (this.invoiceForm.valid) {
    this.formData = {
      ...this.invoiceForm.value,
      items: this.items.controls.map(item => ({
        ...item.value,
        total: item.get('total')?.value
      }))
    };
    this.showTemplate = true;
  }
}

backToForm() {
  this.showTemplate = false;
}

printTemplate() {
  window.print();
}

async downloadAsPNG() {
  try {
    // Show loading indicator if needed
    
    const element = this.billTemplate.nativeElement;
    
    // Wait for fonts to load
    await document.fonts.ready;
    
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: true, // Enable logging for debugging
      backgroundColor: '#ffffff',
      width: element.offsetWidth,
      height: element.offsetHeight,
      onclone: (clonedDoc) => {
        const element = clonedDoc.querySelector('.bill-template');
        if (element instanceof HTMLElement) {
          // Ensure white background
          element.style.backgroundColor = '#ffffff';
          // Add some padding
          element.style.padding = '20px';
        }
      }
    });

    // Create the download
    const link = document.createElement('a');
    const fileName = `invoice-${new Date().getTime()}.png`;
    link.download = fileName;
    link.href = canvas.toDataURL('image/png', 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Hide loading indicator if needed
    
  } catch (err) {
    console.error('Error generating PNG:', err);
    // Show error message to user if needed
  }
}
}
