import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  OnInit,
} from '@angular/core';
import {
  NgxExtendedPdfViewerModule,
  NgxExtendedPdfViewerService,
  NgxExtendedPdfViewerComponent,
  pdfDefaultOptions,
} from 'ngx-extended-pdf-viewer';
import { PDFDocument } from 'pdf-lib';
import { PdfUtilService } from '../pdf-util.service';

@Component({
  selector: 'app-ngx-pdf-editor',
  templateUrl: './ngx-pdf-editor.component.html',
  styleUrls: ['./ngx-pdf-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxPdfEditorComponent implements OnInit {
  pdfUrl = '/assets/pdfs/hrst-adult-2021-english-modified.pdf'; // Path to your fillable PDF
  //pdfUrl = '/assets/fillable-form.pdf';
  pdfSrcUrl: any;
  pdfDoc: PDFDocument | undefined;
  formData: any;
  filledPdfBytes: any;
  @ViewChild('pdfViewer') pdfViewer!: NgxExtendedPdfViewerComponent;
  constructor(
    private pdfService: NgxExtendedPdfViewerService,
    private pdfUtilService: PdfUtilService
  ) {}

  ngOnInit(): void {
    this.loadPdf();
  }

  async loadPdf() {
    this.formData = {
      'Member First Name': 'Lexi',
      'Member Last Name': 'Brasted',
      'Medicaid ID': '',
      'Member date of birth mmddyear': '12-02-2005',
      '944FEAC4-806F-25DA-0268-748431E0FF49': true,
      '21 What is your current weight': '123',
      '2 Have you seen a Primary Care Provider PCP in the': true,
    };
    this.pdfDoc = await this.pdfUtilService.loadPdf(this.pdfUrl);
    this.filledPdfBytes = await this.pdfUtilService.fillPdf(
      this.pdfDoc,
      this.formData
    );
    this.pdfViewer.src = this.filledPdfBytes;
    console.log(this.pdfViewer);
  }
  public get getformData(): { [fieldName: string]: string | number | boolean } {
    return this.formData;
  }
  public set setformData(data: {
    [fieldName: string]: string | number | boolean;
  }) {
    console.log('data', data);
  }
  async onSubmit() {
    console.log(this.formData);
  }
}
