import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfEditorService {

  constructor(private http: HttpClient) { }

  // Load PDF from a URL
  loadPdf(url: string): Observable<Uint8Array> {
    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(
      // Convert ArrayBuffer to Uint8Array
      map((response: ArrayBuffer) => new Uint8Array(response))
    );
  }

  // Modify PDF form fields
  async modifyPdf(pdfBytes: Uint8Array, formData: { [key: string]: string }): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the form
    const form = pdfDoc.getForm();

    // Fill form fields
    for (const [fieldName, fieldValue] of Object.entries(formData)) {
      const field = form.getTextField(fieldName);
      if (field) {
        field.setText(fieldValue);
      }
    }

    // Serialize the PDF document to bytes
    const pdfBytesModified = await pdfDoc.save();
    return pdfBytesModified;
  }
}
