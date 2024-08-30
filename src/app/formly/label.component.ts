import { Component, Input } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'label',
  template: `
    <div>
      <label>{{ to.label }}</label>      
    </div>
  `,
})
export class LabelComponent extends FieldType {}
