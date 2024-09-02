// import State from "./models/State";

class Address {
  constructor(state, cep, street, neighborhood, number, complement = "") {
    this.street = street;
    this.neighborhood = neighborhood;
    this.state = state;
    this.cep = cep;
    this.number = number;
    this.complement = complement;
  }

  validateCep() {
    const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
    return cepRegex.test(this.cep);
  }
}

export default Address;
