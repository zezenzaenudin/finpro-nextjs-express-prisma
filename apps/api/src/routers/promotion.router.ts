import { Router } from "express";
import { AddPromo, DeletePromo, EditPromo  } from "@/controllers/Promotion.controller";

const router = Router();

router.post('/promotion', AddPromo);

router.patch('/promotion/:id', EditPromo);

router.delete('/promotion/:id', DeletePromo);
  
export default router;