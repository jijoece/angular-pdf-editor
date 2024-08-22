import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfCreatorService {

  constructor() { }

  async createFillablePdf(): Promise<Uint8Array> {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Add a blank page
    const page = pdfDoc.addPage([600, 400]);

    // Define text fields
    const form = pdfDoc.getForm();
    
    // const nameField = form.createTextField('name');
    // nameField.setText('Enter your name');
    // nameField.addToPage(page, { x: 50, y: 300, width: 200, height: 50 });
    
    // const emailField = form.createTextField('email');
    // emailField.setText('Enter your email');
    // emailField.addToPage(page, { x: 50, y: 200, width: 200, height: 50 });

     // Add a checkbox field
     const checkboxField = form.createCheckBox('subscribe');
     checkboxField.addToPage(page, { x: 50, y: 200, width: 20, height: 20 });
     //checkboxField.check(); // Default checked state
    
    // Add some static text
    page.drawText('Please fill out this form:', {
      x: 50,
      y: 350,
      size: 20,
      color: rgb(0, 0, 0),
    });
    
    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();
    
    return pdfBytes;
  }

  downloadPdf(pdfBytes: Uint8Array) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fillable-form.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
