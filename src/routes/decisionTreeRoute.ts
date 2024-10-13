import express from "express";
// import { executeAction } from "../controllers/decisionTreeController";
import  { executeAction } from "../controllers/decisionTreeController";

const router = express.Router();

router.post("/action", executeAction);

export default router;
