import { Router } from "express";
import messageController from "../controller/message.controller";
import { authMiddleware } from "../middlewares/auth.middlewate";

const router = Router();

router.get("/message/:contactId", authMiddleware, messageController.getMessage);
router.post("/create-message", authMiddleware, messageController.create);
router.post("/reaction", authMiddleware, messageController.reaction);
router.post("/read/:messageId", authMiddleware, messageController.read);
router.put("/update/:messageId", authMiddleware, messageController.update);
router.delete("/delete/:messageId", authMiddleware, messageController.delete);

export default router;
