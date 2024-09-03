import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { InputData, OutputData } from './shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonFileUrl = '/assets/Adult.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getData(jsonFileUrl: string): Observable<any> {
    return this.http.get<any>(jsonFileUrl);
  }

  transformData(input: InputData[]): OutputData[] {
    // Use a map to aggregate data based on common fields
    const groupedData = input.reduce((acc: { [key: string]: OutputData }, item: InputData) => {
      const {
        AssessmentName,
        AssessmentID,
        AssessmentMetaID,
        Question_Group_Def_id,
        Question_GroupOrder,
        Question_Order,
        Level,
        Question,
        Question_ID,
        AssessmentQuestionDefinitionID,
        Definition_ID,
        Type,
        DATA_TYPE,
        qid,
        requiredQuestion,
        MetaOption_ID,
        MetaOption_Value
      } = item;
  
      // Initialize the object for the Question_ID if it doesn't exist
      if (!acc[Question_ID]) {
        acc[Question_ID] = {
          AssessmentName,
          AssessmentID,
          AssessmentMetaID,
          Question_Group_Def_id,
          Question_GroupOrder,
          Question_Order,
          Level,
          Question,
          Question_ID,
          AssessmentQuestionDefinitionID,
          Definition_ID,
          Type,
          DATA_TYPE,
          qid,
          requiredQuestion,
          MetaOptions: []
        };
      }
  
      // Add the current MetaOption to the MetaOptions array
      acc[Question_ID].MetaOptions.push({
        MetaOption_ID,
        MetaOption_Value
      });
  
      return acc;
    }, {});
  
    // Convert the result from an object to an array and remove the Question_ID key
    return Object.keys(groupedData).map(key => {
      const { Question_ID, ...rest } = groupedData[key];
      return {
        ...rest,
        Question_ID
      };
    });
  }
}
interface InputData {
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

interface MetaOption {
  MetaOption_ID: string;
  MetaOption_Value: string;
}

interface OutputData {
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
  qid: string;
  requiredQuestion: number;
  MetaOptions: MetaOption[];
}
