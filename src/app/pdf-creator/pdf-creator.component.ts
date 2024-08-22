import { Component } from '@angular/core';
import { PdfService } from '../pdf.service';
import { PdfCreatorService } from '../pdf-creator.service';

@Component({
  selector: 'app-pdf-creator',
  templateUrl: './pdf-creator.component.html',
  styleUrls: ['./pdf-creator.component.css']
})
export class PdfCreatorComponent {
  constructor(private pdfService: PdfCreatorService) { }

  async generatePdf() {
    const pdfBytes = await this.pdfService.createFillablePdf();
    this.downloadPdf(pdfBytes);
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
