import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../data.service';
import { QuestionItem, FormField, QuestionData } from '../shared/interfaces';

@Component({
  selector: 'app-formly-tc-d',
  templateUrl: './formly-tc-d.component.html',
  styleUrls: ['./formly-tc-d.component.css'],
})
export class FormlyTcDComponent {
  form = new FormGroup({});
  data!: QuestionData[];
  fields: FormlyFieldConfig[] = [];
  model!: FormField;
  counter = 0;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData('/assets/Adult-tc.json').subscribe((response) => {
      //console.log('data', response);
      this.data = response;
      //console.log(JSON.stringify(this.dataService.transformData(response)));
      this.createForm();
    });
  }
  createForm() {
    this.data.forEach((question) => {
      if (
        question.Question_GroupOrder > 2 ||
        (question.Question_GroupOrder === 2 &&
          question.Question_Order >= 90000000)
      ) {
        if (question.Type === 'DROPDOWN_LIST') {
          this.counter++;
                  this.fields.push({
            key: question.AssessmentQuestionDefinitionID,
            type: 'select',
            props: {
              label: this.counter + '. ' + question.Question,
              required: false,
              options: question.MetaOptions?.map(answer => ({
                value: answer.MetaOption_ID,
                label: answer.MetaOption_Value
              })) || []
            },
          });
        } else if (question.Type === 'TEXT_FIELD') {
          this.counter++;
          this.fields.push({
            key: question.AssessmentQuestionDefinitionID,
            type: 'input',
            props: {
              label: this.counter + '. ' + question.Question,
              placeholder: '',
              required: false,
            },
          });
        }

        this.model = {
          name: question.AssessmentQuestionDefinitionID,
          type: question.Type,
          label: question.Question,
        };
      }
    });
  }

  onSubmit(model: any) {
    console.log(model);
  }
}
