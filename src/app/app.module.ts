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
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicFormComponent } from './ng-dynamic-form/ng-dynamic-form.component';
import { FormlyComponent } from './formly/formly.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyKendoModule } from '@ngx-formly/kendo';
import { LabelComponent } from './formly/label.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyTcComponent } from './formly-tc/formly-tc.component';
import { FormlyTcDComponent } from './formly-tc-d/formly-tc-d.component';

@NgModule({
  declarations: [
    AppComponent,
    PdfViewerComponent,
    PdfEditorComponent,
    SafeUrlPipe,
    PdfCreatorComponent,
    NgxPdfEditorComponent,
    ExamplePdfViewerComponent,
    DynamicFormComponent,
    NgDynamicFormComponent,
    FormlyComponent,
    FormlyTcComponent,
    FormlyTcDComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [{ name: 'label', component: LabelComponent }],
    }),
    FormlyKendoModule,
    ButtonsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
