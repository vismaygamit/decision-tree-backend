export type DecisionTreeType = "sms" | "email" | "condition" | "loop";

export interface DecisionTreeAction {
    type: DecisionTreeType; 
}
  
export interface SendSmsAction extends DecisionTreeAction {
    type: "sms";
    phoneNumber: string;
}
  
export interface SendEmailAction extends DecisionTreeAction {
    type: "email";
    sender: string;
    receiver: string;
}
  
export interface ConditionAction extends DecisionTreeAction {
    type: "condition";
    condition: string;
}
  
export interface LoopAction extends DecisionTreeAction {
    type: "loop";
    iterations: number;
    condition: string;
}
  
export type DecisionTree = DecisionTreeAction; // This remains unchanged
