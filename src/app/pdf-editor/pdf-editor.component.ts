import { Component, OnInit } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { PdfUtilService } from '../pdf-util.service';
import { PdfCreatorService } from '../pdf-creator.service';
@Component({
  selector: 'app-pdf-editor',
  templateUrl: './pdf-editor.component.html',
  styleUrls: ['./pdf-editor.component.css']
})
export class PdfEditorComponent implements OnInit {

  pdfUrl = '/assets/hrst-adult-2021-english.pdf'; // Path to your fillable PDF
  //pdfUrl = '/assets/fillable-form.pdf';
  pdfSrc: any;
  pdfDoc: PDFDocument | undefined;
  formData: any;
  filledPdfBytes:any;

  constructor(private pdfService: PdfUtilService, private pdfCreatorService: PdfCreatorService) { }

  ngOnInit(): void {
    this.loadPdf();
  }

  async loadPdf() {
    this.pdfDoc = await this.pdfService.loadPdf(this.pdfUrl);
    this.filledPdfBytes = await this.pdfService.fillPdf(this.pdfDoc, {
      'Q2A1': true,
      //'Q2A2':''          
    });
    
    this.pdfSrc = URL.createObjectURL(new Blob([this.filledPdfBytes], { type: 'application/pdf' }));
  }

  async onSubmit() {
    if (this.pdfDoc) {
       
      //this.pdfCreatorService.downloadPdf(this.filledPdfBytes);
       const extractedData = await this.pdfService.extractPdfData(this.pdfDoc);
      // //console.log('Extracted Data:', extractedData); 
       this.formData = extractedData;
    }
  
  }
}
