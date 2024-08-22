import { Injectable } from '@angular/core';
import { PDFDocument, rgb, PDFTextField, PDFFont, PDFCheckBox, PDFRadioGroup, PDFName, PDFBool } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfUtilService {

  constructor() { }

  async loadPdf(url: string): Promise<PDFDocument> {
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    return await PDFDocument.load(existingPdfBytes);
  }

  async fillPdf(pdfDoc: PDFDocument, data: any): Promise<Uint8Array> {
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    // fields.forEach(field => {
    //   console.log(field.getName());

    // });

    Object.keys(data).forEach(key => {
      const field = form.getField(key);

      if (field instanceof PDFTextField) {
        field.setText(data[key]);

      } else if (field instanceof PDFCheckBox && data[key]) {
        field.check();
      }

    });

    return await pdfDoc.save();
  }

  async extractPdfData(pdfDoc: PDFDocument): Promise<{ [key: string]: string | boolean }> {
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    let fieldData: PdfField = {};
    form.updateFieldAppearances();
    form.acroForm.dict.set(PDFName.of("NeedAppearances"), PDFBool.True);
    //  console.log(fieldName+":"+field.constructor.name);
    const checkboxField = form.getCheckBox('Q2A2');
    checkboxField.updateAppearances();  
    console.log("checkboxField.isChecked()" + checkboxField.isChecked());
    fields.forEach(field => {
      const fieldName = field.getName();


      if (field instanceof PDFTextField) {
        const fieldValue = field.getText();
        fieldData[fieldName] = fieldValue!;
      } else if (field instanceof PDFCheckBox) {
        if (field.isChecked()) {
        //field.check();
        //  console.log(fieldName+":"+field.isChecked());
        //console.log('needsAppearancesUpdate is enabled'+field.needsAppearancesUpdate())
        fieldData[fieldName] = field.isChecked();
        }
        //console.log("field:"+fieldName+JSON.stringify(field, this.getCircularReplacer()));       
      } else if (field instanceof PDFRadioGroup) {
        if (field.getSelected()) {
          fieldData[fieldName] = field.getSelected()!;
        }
      }
      // else{
      //   console.log("typeof(field):"+field.constructor.name);
      // }
      if (fieldData[fieldName]) {
        console.log(fieldName + ":" + fieldData[fieldName]);
      }

    });

    return fieldData;
  }



  // Modify PDF form fields
  async modifyPdf(pdfBytes: Uint8Array, formData: { [key: string]: string }): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the form
    const form = pdfDoc.getForm();

    // Iterate over form data and set field values
    for (const [fieldName, fieldValue] of Object.entries(formData)) {
      const field = form.getField(fieldName);

      if (field) {
        // Check field type and set value accordingly
        switch (field.constructor.name) {
          case 'PDFTextField':
            (field as any).setText(fieldValue);
            break;
          case 'PDFCheckBox':
            (field as any).check(); // Example: checking a checkbox
            break;
          case 'PDFRadioGroup':
            (field as any).select(fieldValue); // Example: selecting a radio button
            break;
          // Add more cases if needed for other field types
        }
      }
    }

    // Serialize the PDF document to bytes
    const pdfBytesModified = await pdfDoc.save();
    return pdfBytesModified;
  }
  getCircularReplacer() {
    const seen = new WeakSet();
    return (_key: any, value: object | null) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  }
}
interface PdfField {
  [key: string]: string | boolean;
}