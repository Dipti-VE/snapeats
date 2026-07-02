import express from "express";
import { makeAdmin } from "../controllers/authController.js";

const router = express.Router();

router.put("/make-admin", makeAdmin);

export default router;