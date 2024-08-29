import { Component, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
import {  NgxExtendedPdfViewerModule,NgxExtendedPdfViewerService, NgxExtendedPdfViewerComponent, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { PDFDocument } from 'pdf-lib';
import { PdfUtilService } from '../pdf-util.service';


@Component({
  selector: 'app-ngx-pdf-editor',
  templateUrl: './ngx-pdf-editor.component.html',
  styleUrls: ['./ngx-pdf-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxPdfEditorComponent implements OnInit{
  pdfUrl = '/assets/hrst-adult-2021-english.pdf'; // Path to your fillable PDF
  //pdfUrl = '/assets/fillable-form.pdf';
  pdfSrcUrl: any;
  pdfDoc: PDFDocument | undefined;
  formData: any;
  filledPdfBytes:any;
  @ViewChild('pdfViewer') pdfViewer!: NgxExtendedPdfViewerComponent;
  constructor(private pdfService: NgxExtendedPdfViewerService,
    private pdfUtilService: PdfUtilService) {}

ngOnInit(): void {
  this.loadPdf();
}

async loadPdf() {
  this.formData =    {
    'Q1A1': 'Paulson',
    'Member Last Name':'Ullery',    
    'Medicaid ID':'00110641027',
    'Member date of birth mmddyear':'07-21-23',
    'Q2A1':'Q2A1',
  }
  this.pdfDoc = await this.pdfUtilService.loadPdf(this.pdfUrl);
  this.filledPdfBytes = await this.pdfUtilService.fillPdf(this.pdfDoc, this.formData);
  this.pdfViewer.src = this.filledPdfBytes;
  console.log(this.pdfViewer);
}
public get getformData(): { [fieldName: string]: string | number | boolean } {
 
  return this.formData;
}
public set setformData(data: { [fieldName: string]: string | number | boolean }) {
  console.log("data", data);
}
async onSubmit() {
  console.log(this.formData);
}
}
