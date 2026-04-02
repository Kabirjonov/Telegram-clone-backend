import { Router } from "express";
import messageController from "../controller/message.controller";

const router = Router();

router.get("/message/:contactId", messageController.getMessage);
router.post("/create-message", messageController.create);
router.post("/reaction", messageController.reaction);
router.post("/read/:messageId", messageController.read);
router.put("/update/:messageId", messageController.update);
router.delete("/delete/:messageId", messageController.delete);

export default router;
