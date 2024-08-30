import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../data.service';
import { QuestionItem, FormField } from '../shared/interfaces';

@Component({
  selector: 'app-formly-tc',
  templateUrl: './formly-tc.component.html',
  styleUrls: ['./formly-tc.component.css'],
})
export class FormlyTcComponent {
  form = new FormGroup({});
  data!: QuestionItem[];
  fields: FormlyFieldConfig[] = [];
  model!: FormField;
  counter = 0;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData("/assets/Adult-Trucare.json").subscribe((response) => {
      console.log('data', response);
      this.data = response;
      this.createForm();
    });
  }
  createForm() {
    this.data.forEach((question) => {
      
      if (question.Question_GroupOrder>1) {
        this.counter++;
        if(question.type === 5){
          this.fields.push({
            key: question.sourceSystemQuestionId,
            type: 'label',
            props: {
              label: this.counter+". "+question.description,             
            },            
          });
          question.availableAnswers.forEach(answer =>{
            this.fields.push({
              key: question.sourceSystemQuestionId+answer.sequence,
              type: 'checkbox',
              props: {
                label: answer.value,
                placeholder: '',
                required: false,
              },
              className: 'form-col'
            });
          })
        }
        else{
          this.fields.push({
            key: question.sourceSystemQuestionId,
            type: 'input',
            props: {
              label: this.counter+". "+question.description,
              placeholder: '',
              required: false,
            },           
          });
        }
        
        this.model = {
          name: question.sourceSystemQuestionId,
          type: question.type === 5 ? 'checkbox' : 'input',
          label: question.description,
        };
      }
    });
  }

  onSubmit(model: any) {
    console.log(model);
  }
}
