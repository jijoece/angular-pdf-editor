import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { PdfEditorComponent } from './pdf-editor/pdf-editor.component';
import { PdfCreatorComponent } from './pdf-creator/pdf-creator.component';
import { NgxPdfEditorComponent } from './ngx-pdf-editor/ngx-pdf-editor.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

const routes: Routes = [
  { path: 'pdf-viewer', component: PdfViewerComponent },
  { path: 'pdf-editor', component: PdfEditorComponent },
  { path: 'pdf-creator', component: PdfCreatorComponent },
  { path: 'ngx-pdf-editor', component: NgxPdfEditorComponent },
  { path: 'dynamic-form', component: DynamicFormComponent },
  
  { path: '', redirectTo: 'ngx-pdf-editor', pathMatch: 'full' },
  { path: '**', redirectTo: '/pdf-editor' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
