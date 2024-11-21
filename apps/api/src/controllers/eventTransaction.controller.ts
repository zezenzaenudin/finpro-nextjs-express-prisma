import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function AddEvent (req: Request, res: Response, next: NextFunction) {
  try {
    const { name, description, type, price, date, time, location, capacity, organizerId } = req.body;

    const newUser = await prisma.event.create({
        data: {
            name, 
            description, 
            type, 
            price, 
            date, 
            time, 
            location, 
            capacity,
            availableSeats:10,
            organizerId:organizerId,
        },
      });

      res.status(200).send({
        message: "success Add Event",
        data: newUser,
        });
    
  } catch (err) {
    next(err);
  }
}

async function EditEvent (req: Request, res: Response, next: NextFunction) {
  try {
      const{id}=req.params;
        const data = await prisma.event.update({
            where: {id: parseInt(id)},
            data: req.body,
        });

      res.status(200).send({
        message: "success Edit Event",
        data: data,
        });
    
  } catch (err) {
    next(err);
  }
}

async function DeleteEvent (req: Request, res: Response, next: NextFunction) {
  try {
      const{id}=req.params;
         await prisma.event.delete({
            where: {id: parseInt(id)},
        });

      res.status(200).send({
        message: "success Delete Event"
        });
    
  } catch (err) {
    next(err);
  }
}

export { AddEvent , EditEvent, DeleteEvent};