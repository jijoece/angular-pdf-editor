import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  async loadPdf(pdfBytes: ArrayBuffer) {
    return await PDFDocument.load(pdfBytes);
  }

  async fillPdf(pdfDoc: PDFDocument, data: any) {
    const form = pdfDoc.getForm();
    //form.get
    Object.keys(data).forEach(key => {
      const field = form.getTextField(key);
      field.setText(data[key]);
    });

    return await pdfDoc.save();
  }

  async extractData(pdfDoc: PDFDocument) {
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    const data: any = {};

    fields.forEach(field => {
      const name = field.getName();
      data[name] = field.getName();
    });

    return data;
  }
}
