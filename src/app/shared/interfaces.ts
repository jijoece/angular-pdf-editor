export interface FormField {
  type: string;
  label: string;
  name: string;
  value?: any;
  validators?: string[];
  options?: { label: string; value: any }[];
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

export interface Assessment {
  assessmentNumber: string;
  id: number;
  sourceSystemAssessmentId: string;
  sourceSystemCode: string;
  questions: Question[];
}

export interface QuestionItem {
  AssessmentName: string;
  AssessmentID: string;
  AssessmentMetaID: string;
  Question_Group_Def_id: string;
  Question_GroupOrder: number;
  Question_Order: number;
  Level: number;
  Question: string;
  Question_ID: string;
  AssessmentQuestionDefinitionID: string;
  Definition_ID: string;
  Type: string;
  DATA_TYPE: string;
  MetaOption_ID: string;
  MetaOption_Value: string;
  Gens_Conditional: string;
  qid: string;
  requiredQuestion: number;
}

export interface InputData {
  AssessmentName: string;
  AssessmentID: string;
  AssessmentMetaID: string;
  Question_Group_Def_id: string;
  Question_GroupOrder: number;
  Question_Order: number;
  Level: number;
  Question: string;
  Question_ID: string;
  AssessmentQuestionDefinitionID: string;
  Definition_ID: string;
  Type: string;
  DATA_TYPE: string;
  MetaOption_ID: string;
  MetaOption_Value: string;
  Gens_Conditional: string;
  qid: string;
  requiredQuestion: number;
}

export interface OutputChild {
  MetaOption_ID: string;
  MetaOption_Value: string;
}

export interface OutputData {
  [Question_ID: string]: {
    AssessmentName: string;
    AssessmentID: string;
    AssessmentMetaID: string;
    Question_Group_Def_id: string;
    Question_GroupOrder: number;
    Question_Order: number;
    Level: number;
    Question: string;
    AssessmentQuestionDefinitionID: string;
    Definition_ID: string;
    Type: string;
    DATA_TYPE: string;
    qid: string;
    requiredQuestion: number;
    MetaOptions: OutputChild[];
  };
}
// Define interface for MetaOptions
export interface MetaOption {
  MetaOption_ID: string;
  MetaOption_Value: string;
}

// Define interface for the main object structure
export interface QuestionData {
  AssessmentName: string;
  AssessmentID: string;
  AssessmentMetaID: string;
  Question_Group_Def_id: string;
  Question_GroupOrder: number;
  Question_Order: number;
  Level: number;
  Question: string;
  AssessmentQuestionDefinitionID: string;
  Definition_ID: string;
  Type: string;
  DATA_TYPE: string;
  qid: string;
  requiredQuestion: number;
  MetaOptions: MetaOption[];
}
