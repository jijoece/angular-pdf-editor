export interface FormField {
    type: string;  
    label: string;
    name: string;
    value?: any;
    validators?: string[];
    options?: { label: string, value: any }[];
  }
  
  export interface AvailableAnswer {
    sequence: number;
    value: string;
  }
  
  export interface Question {
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
  
  export  interface Assessment {
    assessmentNumber: string;
    id: number;
    sourceSystemAssessmentId: string;
    sourceSystemCode: string;
    questions: Question[];
  }