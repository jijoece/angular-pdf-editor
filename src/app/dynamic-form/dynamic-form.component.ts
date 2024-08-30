import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  data:any;
  form!: FormGroup;


  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      response => {
        this.data = response;
        this.createForm();
        console.log(this.data); // For debugging
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  private createForm(): void {
    const formGroup: { [key: string]: FormControl } = {};

    this.data.questions.forEach((field: { type: string; name: string | number; value: any; }) => {
      if(field.questionsequence>8){
        field.label = field.description;

      if (field.type === '5') {
        field.type = 'checkbox'
       
      } else if(field.type === '7'){
        field.type = 'text'
      }
      formGroup[field.name] = new FormControl(field.sourceSystemQuestionId );
    });
  }
    this.form = this.formBuilder.group(formGroup);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
interface FormField {
  type: string;

  label: string;
  name: string;
  value?: any;
  validators?: string[];
  options?: { label: string, value: any }[];
}
