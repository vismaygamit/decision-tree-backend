import {
  DecisionTreeAction,
  SendSmsAction,
  SendEmailAction,
  ConditionAction,
  LoopAction,
} from "../models/decisionTreeModel";

const validateActionData = async (
  action: DecisionTreeAction
) => {
  try {
    switch (action.type) {
      case "sms":
        return await validateSmsNode(action as SendSmsAction);
      case "email":
        return await validateEmailNode(action as SendEmailAction);
      case "condition":
        return await validateConditionNode(action as ConditionAction);
      case "loop":
        return await validateLoopNode(action as LoopAction);
      default:
        return false; // Unsupported node type
    }
  } catch (err) {
    return false;
  }
};

const validateSmsNode = (action: SendSmsAction): boolean => {
  return (
    typeof action.phoneNumber === "string" &&
    /^[0-9]+$/.test(action.phoneNumber)
  );
};

const validateEmailNode = (action: SendEmailAction): boolean => {
  if (action.sender && action.receiver) {
    return (
      typeof action.sender === "string" &&
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(action.sender) &&
      typeof action.receiver === "string" &&
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(action.receiver)
    );
  }
  else{
    return false
  }
};

const validateConditionNode = (action: ConditionAction): boolean => {
  return (
    typeof action.condition === "string"
  );
};

const validateLoopNode = (action: LoopAction): boolean => {
  return (
    typeof action.iterations === "number" &&
    action.iterations > 0 &&
    typeof action.condition === "string"
  );
};

export default validateActionData;