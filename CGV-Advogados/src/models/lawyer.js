import Address from "./address";
import Seniority from "./seniority";

class Lawyer {
  constructor(name, seniority, address) {
    this.name = name;
    this.seniority = Seniority[seniority];
    this.address =
      address instanceof Address ? address : new Address(...address);
  }

  validateSeniority() {
    return Object.values(Seniority).includes(this.seniority);
  }

  // updateLawyer({ name, seniority, address }) {
  //   if (name) this.name = name;
  //   if (seniority && Seniority[seniority])
  //     this.seniority = Seniority[seniority];
  //   if (address) this.address.updateAddress(address);
  // }

  // getDetails() {
  //   return {
  //     name: this.name,
  //     seniority: this.seniority,
  //     address: this.address.getFullAddress(),
  //   };
  // }
}

export default Lawyer;
