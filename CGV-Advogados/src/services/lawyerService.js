import Ajv from "ajv";
import Seniority from "./../models/seniority";
import State from "./../models/state";
import lawyersSchema from "./../data/lawyersSchema"; // Certifique-se de que este é o caminho correto para o esquema JSON

const API_BASE_URL = "https://localhost:7102/api";
const ajv = new Ajv();
const validate = ajv.compile(lawyersSchema); // Corrigido para usar a instância de `ajv`

class LawyerService {
  static LAWYER_URL = `${API_BASE_URL}/lawyer`;

  static async getAllLawyers() {
    try {
      const response = await fetch(`${this.LAWYER_URL}/getAll`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching all lawyers:", error);
      throw error;
    }
  }

  static async getLawyerById(id) {
    try {
      const response = await fetch(`${this.LAWYER_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching lawyer with ID ${id}:`, error);
      throw error;
    }
  }

  static findKeyByValue(obj, value) {
    return Object.keys(obj).find((key) => obj[key] === value);
  }

  static async createLawyer(lawyer) {
    try {
      const seniorityKey = this.findKeyByValue(Seniority, lawyer.seniority);
      const addressStateKey = this.findKeyByValue(State, lawyer.address.state);

      if (seniorityKey !== undefined) {
        lawyer.seniority = parseInt(seniorityKey, 10);
      }

      if (addressStateKey !== undefined) {
        lawyer.address.state = parseInt(addressStateKey, 10);
      }

      //Zip only numbers
      lawyer.address.zip = lawyer.address.zip.replace(/\D/g, "");

      const isValid = validate(lawyer);

      if (!isValid) {
        console.error("Validation errors:", validate.errors);
        throw new Error("Validation failed");
      }

      const response = await fetch(this.LAWYER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lawyer),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating lawyer:", errorData);
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error("Error creating lawyer:", error);
      throw error;
    }
  }

  static async updateLawyer(id, lawyer) {
    try {
      const response = await fetch(`${this.LAWYER_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lawyer),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error(`Error updating lawyer with ID ${id}:`, error);
      throw error;
    }
  }

  static async deleteLawyer(id) {
    try {
      const response = await fetch(`${this.LAWYER_URL}/ById/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error(`Error deleting lawyer with ID ${id}:`, error);
      throw error;
    }
  }
}

export default LawyerService;
