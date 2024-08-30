import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  data!: Assessment;
  form!: FormGroup;
  formField!: FormField;
  formFields: FormField[] = [];

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

    this.data.questions.forEach(field => {
      if (field.questionsequence > 8) {
        this.formField.label = field.description;

        if (field.type === 5) {
          this.formField.type = 'checkbox'
        } else if (field.type === 7) {
          this.formField.type = 'text'
        }
        formGroup[this.formField.name] = new FormControl(field.sourceSystemQuestionId);
      }
    });
    this.formFields.push(this.formField);
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

interface AvailableAnswer {
  sequence: number;
  value: string;
}

interface Question {
  order: number;
  questionNumber: string;
  id: number;
  sourceSystemQuestionId: string;
  required: boolean;
  type: number;
  description: string;
  displaydetail: boolean;
  conditionalanswervalue: string;
  questionGroupLabel: string;
  tabsequence: number;
  conditionalanswervalueid: number;
  questionsequence: number;
  availableAnswers: AvailableAnswer[];
}

interface Assessment {
  assessmentNumber: string;
  id: number;
  sourceSystemAssessmentId: string;
  sourceSystemCode: string;
  questions: Question[];
}



