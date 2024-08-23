import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { PdfUtilService } from '../pdf-util.service';
import { PdfCreatorService } from '../pdf-creator.service';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-editor',
  templateUrl: './pdf-editor.component.html',
  styleUrls: ['./pdf-editor.component.css']
})
export class PdfEditorComponent implements OnInit {

  pdfUrl = '/assets/hrst-adult-2021-english.pdf'; // Path to your fillable PDF
  //pdfUrl = '/assets/fillable-form.pdf';
  pdfSrcUrl: any;
  pdfDoc: PDFDocument | undefined;
  formData: any;
  filledPdfBytes:any;
  @ViewChild('pdfIframe', { static: false })
  pdfIframe!: ElementRef;

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
    
    this.pdfSrcUrl = URL.createObjectURL(new Blob([this.filledPdfBytes], { type: 'application/pdf' }));

    //  // Use pdfjs-dist to render the PDF
    //  const loadingTask = pdfjsLib.getDocument(this.pdfSrcUrl);
    //  loadingTask.promise.then(pdf => {
    //    pdf.getPage(1).then(page => {
    //      const scale = 1.5;
    //      const viewport = page.getViewport({ scale });
 
    //      const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
    //      const context = canvas.getContext('2d');
    //      canvas.height = viewport.height;
    //      canvas.width = viewport.width;
 
    //      const renderContext = {
    //        canvasContext: context!,
    //        viewport: viewport
    //      };
 
    //      page.render(renderContext);
    //    });
    //  });
   }
  

  async onSubmit() {
    const iframe = this.pdfIframe.nativeElement;
    const src = iframe.src;
    console.log(src);
    fetch(src)
        .then(response => response.arrayBuffer())
        .then(async arrayBuffer => {
          console.log('ArrayBuffer:', arrayBuffer);
          this.pdfDoc = await PDFDocument.load(arrayBuffer);
          // Process the ArrayBuffer as needed
        })
        .catch(error => console.error('Error fetching PDF:', error));
    //const arrayBuffer = await src.arrayBuffer();
    //this.pdfDoc = await PDFDocument.load(arrayBuffer);
   // const updatedPdfDoc = await PDFDocument.load(this.pdfSrcUrl);
   //this.pdfService.savePdf(updatedPdfBytes, 'updated-file.pdf');
    if (this.pdfDoc) {
       
      //this.pdfCreatorService.downloadPdf(this.filledPdfBytes);
       const extractedData = await this.pdfService.extractPdfData(this.pdfDoc);
       console.log('Extracted Data:', extractedData); 
       this.formData = extractedData;
    }
  }
}


