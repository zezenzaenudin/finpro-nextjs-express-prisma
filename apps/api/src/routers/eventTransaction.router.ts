import { Router } from "express";
import {  AddEvent } from "../controllers/eventTransaction.controller";

const router = Router();

router.post("/addevent", AddEvent);

export default router;

//----
/*
export class SampleRouter {
    private router: Router;
    private sampleController: SampleController;
  
    constructor() {
      this.sampleController = new SampleController();
      this.router = Router();
      this.initializeRoutes();
    }
  
    private initializeRoutes(): void {
      this.router.get('/', this.sampleController.getSampleData);
      this.router.get('/:id', this.sampleController.getSampleDataById);
      this.router.post('/', this.sampleController.createSampleData);
    }
  
    getRouter(): Router {
      return this.router;
    }
  }*/