import express from "express";
import upload from "../middleware/upload.js";

import {
 addRestaurant,
 getRestaurants,
 deleteRestaurant
} from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/add",upload.single("image"),addRestaurant);

router.get("/",getRestaurants);

router.delete("/:id",deleteRestaurant);

export default router;