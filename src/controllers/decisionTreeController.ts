import { Request, Response, NextFunction } from "express";
import { executeTree } from "../services/decisionTreeService";
import validateActionData from "../helpers/validation";
import logger from "../utils/logger";

export const executeAction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const actionType = req.body;
    const isPayloadValid = await validateActionData(actionType);
   
    if (!isPayloadValid) {
      res.status(400).json({ message: "Invalid action inputs" });
      logger.warn("Invalid action inputs")
      return;
    } else {
      await executeTree(actionType);
      logger.info(`${actionType.type} action of decision tree executed successfully`)
      res.status(200).json({
        message: `${actionType.type} action of decision tree executed successfully`,
      });
    }
  } catch (error) {
    const err = error as Error;
    logger.error("Error executing decision tree")
    console.error(`Error executing tree: ${err.message}`);
    res.status(500).json({
      message: "Error executing decision tree",
    });
  }
};