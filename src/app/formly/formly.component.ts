import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../data.service';
import { Assessment, FormField } from '../shared/interfaces';

@Component({
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.css'],
})
export class FormlyComponent {
  form = new FormGroup({});
  data!: Assessment;
  fields: FormlyFieldConfig[] = [];
  model!: FormField;
  counter = 0;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((response) => {
      console.log('data', response);
      this.data = response;
      this.createForm();
    });
  }
  createForm() {
    this.data.questions.forEach((question) => {
      
      if (question.questionsequence > 7 && question.questionsequence<35) {
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
