import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function AddPromo (req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId, code, discountRate, validUntil, maxUses, currentUses } = req.body;
  
      await prisma.$transaction(async (prisma) => {
        const findCode = await prisma.promotion.findUnique({
          where: {
            code,
          },
        });

        if (findCode) {
            throw new Error("Voucher Code already exist");
          }

      const newPromotion = await prisma.promotion.create({
          data: {
              eventId, 
              code, 
              discountRate, 
              validUntil, 
              maxUses, 
              currentUses, 
          },
        });
  
        res.status(200).send({
          message: "success Add Promotion",
          data: newPromotion,
          })
    });
      
    } catch (err) {
      next(err);
    }
  }

  async function EditPromo (req: Request, res: Response, next: NextFunction) {
    try {

        const { eventId, code, discountRate, validUntil, maxUses, currentUses } = req.body;

        await prisma.$transaction(async (prisma) => {
        const findCode = await prisma.promotion.findUnique({
          where: {
            code,
          },
        });

        if (findCode) {
            throw new Error("Voucher Code already exist");
        }

        const{id}=req.params;
        
        const data = await prisma.promotion.update({
            where: {id: parseInt(id)},
            data: req.body,
        });

        res.status(200).send({
        message: "success Edit Promotion",
        })      
      });
      
    } catch (err) {
      next(err);
    }
  }

  async function DeletePromo (req: Request, res: Response, next: NextFunction) {
    try {
        const{id}=req.params;
           await prisma.promotion.delete({
              where: {id: parseInt(id)},
          });
  
        res.status(200).send({
          message: "success Delete Promo"
          });
      
    } catch (err) {
      next(err);
    }
  }

export  {AddPromo, EditPromo, DeletePromo};