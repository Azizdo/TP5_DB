import { Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService)
    private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/", async (req: any, res: any) => {
      try {
        const result = await this.databaseService.getDoctors();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
      }
    });

    router.get("/:id", async (req: any, res: any) => {
      try {
        const result = await this.databaseService.getDoctorById(req.params.id);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
      }
    });

    router.post("/", async (req: any, res: any) => {
      try {
        const newDoctorValues = req.body;
        const result = await this.databaseService.addDoctor(newDoctorValues);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
      }
    }
    );

    router.put("/:id", async (req: any, res: any) => {
      try {
        const newDoctorValues = req.body;
        const result = await this.databaseService.updateDoctor(newDoctorValues, req.params.id);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
      }
    }
    );

    router.delete("/:id", async (req: any, res: any) => {
      try {
        const result = await this.databaseService.deleteDoctor(req.params.id);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
      }
    }
    );

    return router;
  }
}
