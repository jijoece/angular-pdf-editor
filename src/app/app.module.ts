import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { AppRoutingModule } from './app-routing.module';
import { PdfEditorComponent } from './pdf-editor/pdf-editor.component';
import { SafeUrlPipe } from './safeurl';
import { PdfCreatorComponent } from './pdf-creator/pdf-creator.component';
import { NgxPdfEditorComponent } from './ngx-pdf-editor/ngx-pdf-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    PdfViewerComponent,
    PdfEditorComponent,
    SafeUrlPipe,
    PdfCreatorComponent,
    NgxPdfEditorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
