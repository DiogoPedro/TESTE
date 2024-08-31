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

  //   updateAddress(AddressAtt) {
  //     if (AddressAtt.street) this.street = AddressAtt.street;
  //     if (AddressAtt.neighborhood) this.neighborhood = AddressAtt.neighborhood;
  //     if (AddressAtt.state) this.state = AddressAtt.state;
  //     if (AddressAtt.cep) this.cep = AddressAtt.cep;
  //     if (AddressAtt.number) this.number = AddressAtt.number;
  //     if (AddressAtt.state && State[AddressAtt.state])
  //       this.state = AddressAtt.state;
  //     if (AddressAtt.complement !== undefined)
  //       this.complement = AddressAtt.complement;
  //   }
}

export default Address;
