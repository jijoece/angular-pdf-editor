import { Component, OnInit } from '@angular/core';
import { PdfService } from '../pdf.service';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  pdfBytes!: ArrayBuffer;
  pdfDoc: any;
  prePopulatedData = {
    
  };

  constructor(private pdfService: PdfService) {}

  async ngOnInit() {
    const pdfUrl = '/assets/hrst-adult-2021-english.pdf';
    const response = await fetch(pdfUrl);
    this.pdfBytes = await response.arrayBuffer();

    this.pdfDoc = await this.pdfService.loadPdf(this.pdfBytes);
    const filledPdfBytes = await this.pdfService.fillPdf(this.pdfDoc, this.prePopulatedData);
    this.renderPdf(filledPdfBytes);
  }

  renderPdf(pdfBytes: ArrayBuffer) {
    console.log("pdfjsLib", pdfjsLib);
    const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
    loadingTask.promise.then((pdf: any) => {
      pdf.getPage(1).then((page: any) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.getElementById('pdfCanvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport
        };
        page.render(renderContext);
      });
    });
  }

  async onSubmit() {
    const formData = await this.pdfService.extractData(this.pdfDoc);
    console.log(formData);
  }
}
