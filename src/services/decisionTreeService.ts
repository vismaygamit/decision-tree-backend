import logger from '../utils/logger';
import { DecisionTreeAction, SendSmsAction, SendEmailAction, ConditionAction, LoopAction } from '../models/decisionTreeModel';

export const executeTree = async (action: DecisionTreeAction): Promise<void> => {
    switch (action.type) {
        case "sms":
            await handleSms(action as SendSmsAction);
            break;

        case "email":
            await handleEmail(action as SendEmailAction);
            break;

        case "condition":
            await handleCondition(action as ConditionAction);
            break;

        case "loop":
            await handleLoop(action as LoopAction);
            break;

        default:
            throw new Error(`Unsupported node type: ${action.type}`);
    }
};

const handleSms = async (action: SendSmsAction) => {
    logger.info(`Sending SMS to ${action.phoneNumber}`);
    console.log(`Sending SMS to ${action.phoneNumber}`);
};

const handleEmail = async (action: SendEmailAction) => {
    logger.info(`Sending email from ${action.sender} to ${action.receiver}`);
    console.log(`Sending email from ${action.sender} to ${action.receiver}`);
};

const handleCondition = async (action: ConditionAction) => {
    logger.info(`Condition action is invoke with ${action.condition} condition`)   
    const conditionResult = eval(action.condition);
    
    if (30 > conditionResult) {
        logger.info("Condition action is true")
        console.log("trueAction");
    } else{
        logger.info("Condition action is false")
        console.log("falseAction");
    }
};

const handleLoop = async (action: LoopAction) => {
    logger.info(`loop action is executed with ${action.iterations} interations`)
    const conditionResult = eval(action.condition);
    if (30 > conditionResult) {
        for (let i = 0; i < action.iterations; i++) {
            console.log(`Executes the subtree ${i} time`);
        }
    }
};
