import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
require("dotenv").config();

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string),
    host: process.env.DB_HOST,
    keepAlive: true,
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public getDoctors = async () => {
    try {
      const result = await this.pool.query("SELECT * FROM medecins");
      if (result && result.rows.length > 0) {
        return result.rows;
      } else {
        throw new Error("Failed to get medecins");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  public getDoctorById = async (id: number) => {
    try {
      const result = await this.pool.query(
        "SELECT * FROM medecins WHERE idmedecin = $1",
        [id]
      );
      if (result && result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Failed to get medecin");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  public addDoctor = async (newDoctorValues: any) => {
    let id = Math.floor(Math.random() * 1000000);
    const existingDoctors = await this.getDoctors();
    const idExists = existingDoctors.some((doctor) => doctor.idmedecin === id);
    while (idExists) {
      id = Math.floor(Math.random() * 1000000);
    }
    newDoctorValues.idmedecin = id;
    try {
      const result = await this.pool.query(
        "INSERT INTO medecins (idmedecin, prenom, nom, specialite, anneesexperience, idservice) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          newDoctorValues.idmedecin,
          newDoctorValues.prenom,
          newDoctorValues.nom,
          newDoctorValues.specialite,
          newDoctorValues.anneesexperience,
          newDoctorValues.idservice,
        ]
      );
      if (result && result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Failed to add medecin");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  public updateDoctor = async (newDoctorValues: any, id: number) => {
    newDoctorValues.idmedecin = id;
    try {
      const result = await this.pool.query(
        "UPDATE medecins SET prenom = $2, nom = $3, specialite = $4, anneesexperience = $5, idservice = $6 WHERE idmedecin = $1 RETURNING *",
        [
          newDoctorValues.idmedecin,
          newDoctorValues.prenom,
          newDoctorValues.nom,
          newDoctorValues.specialite,
          newDoctorValues.anneesexperience,
          newDoctorValues.idservice,
        ]
      );
      if (result && result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Failed to modify medecin");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  public deleteDoctor = async (id: number) => {
    try {
      await this.deleteRelatedRecords(id);
      const result = await this.pool.query(
        "DELETE FROM medecins WHERE idmedecin = $1 RETURNING *",
        [id]
      );
      if (result && result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Failed to delete medecin");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  private async deleteRelatedRecords(id: any) {
    await this.pool.query("DELETE FROM RendezVous WHERE idmedecin = $1", [
      id,
    ]);
  }
}
