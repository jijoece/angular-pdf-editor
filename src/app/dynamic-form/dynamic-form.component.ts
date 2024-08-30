import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Assessment, FormField } from '../shared/interfaces';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  data!: Assessment;
  dynamicForm!: FormGroup;
  formField: FormField = {
    type: '',
    label: '',
    name: ''
  };
  formFields: FormField[] = [];

  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dataService.getData("/assets/Adult.json").subscribe(
      response => {
        console.log("data", response);
        this.data = response;
        this.createForm();   
      }
    );
  }

  // private createForm(): void {
  //   const formGroup: { [key: string]: FormControl } = {};

  //   this.data.questions.forEach(field => {
  //     console.log("field", field);
  //     if (field.questionsequence > 8) {
  //       this.formField.label = field.description;

  //       if (field.type === 5) {
  //         this.formField.type = 'checkbox'
  //       } else if (field.type === 7) {
  //         this.formField.type = 'text'
  //       }
  //       formGroup[this.formField.name] = new FormControl(field.sourceSystemQuestionId);
  //     }
  //   });
  //   this.formFields.push(this.formField);
  //   this.form = this.formBuilder.group(formGroup);
  // }

  private createForm(): void {
    this.dynamicForm = this.formBuilder.group({
      fields: this.formBuilder.array([])
    });

    this.data.questions.forEach(field => {
      //console.log("field", field);
      if (field.questionsequence > 8) {
        this.addFormField({ type: field.type === 5? 'checkbox':'text', label: field.description, value: '' });       
      }
    });
  }

  addFormField(field: { type: string; label: string; value: any }) {
    const control = this.formBuilder.group({
      type: [field.type],
      label: [field.label]   
    });
    this.fields.push(control);
  }
  get fields(): FormArray {
    return this.dynamicForm.get('fields') as FormArray;
  }
  onSubmit(): void {
    console.log(this.dynamicForm.value);
  }


}






