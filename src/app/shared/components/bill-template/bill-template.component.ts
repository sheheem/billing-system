import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bill-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill-template.component.html',
  styleUrl: './bill-template.component.css'
})
export class BillTemplateComponent {

  @Input() type: string = 'QUOTATION';
  @Input() invoiceNumber: string = '';
  @Input() date: string | null = '';
  @Input() poNumber: string = '';
  @Input() soldTo: string = '';
  @Input() items: Array<{
    itemNo: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }> = [];
}

