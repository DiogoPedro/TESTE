import Address from "./address";
import Seniority from "./seniority";
import State from "./state";

class Lawyer {
  constructor(id, name, seniority, address) {
    this.id = id;
    this.name = name;
    this.seniority = Seniority[seniority]; // Mapeia o enum
    this.address = {
      street: address.street,
      neighborhood: address.neighborhood,
      state: State[address.state], // Mapeia o enum
      zip: address.zip,
      number: address.number,
      complement: address.complement,
    };
  }

  validateSeniority() {
    return Object.values(Seniority).includes(this.seniority);
  }
}

export default Lawyer;
