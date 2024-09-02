import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import InputMask from "react-input-mask";
import LawyerService from "../services/lawyerService";
import Seniority from "../models/seniority";
import State from "../models/state";

function ModalLawyer({ visible, visibleSet, lawyerSelected, setLawyerSelected }) {
  const [name, setName] = useState("");
  const [seniority, setSeniority] = useState(null);
  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    state: "",
    zip: "",
    number: "",
    complement: "",
  });

  useEffect(() => {
    if (lawyerSelected) {
      setName(lawyerSelected.name);
      setAddress(lawyerSelected.address);
      setSeniority(Object.keys(Seniority).find((key) => Seniority[key] === lawyerSelected.seniority));
    }
  }, [lawyerSelected]);

  const CloseModal = () => {
    visibleSet(false);
    setLawyerSelected(null);
    setName("");
    setSeniority(null);
    setAddress({
      street: "",
      neighborhood: "",
      state: "",
      zip: "",
      number: "",
      complement: "",
    });
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Nome é obrigatório.";
    if (!seniority) newErrors.seniority = "Senioridade é obrigatória.";
    if (!address.street) newErrors.street = "Logradouro é obrigatório.";
    if (!address.neighborhood) newErrors.neighborhood = "Bairro é obrigatório.";
    if (!address.state) newErrors.state = "Estado é obrigatório.";
    if (!address.zip) newErrors.zip = "CEP é obrigatório.";
    if (!address.number) newErrors.number = "Número é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        const lawyerData = {
          name: name,
          seniority: Seniority[seniority], // Mapeia o valor da senioridade para o enum correto
          address: {
            street: address.street,
            neighborhood: address.neighborhood,
            state: State[address.state], // Mapeia o valor do estado para o enum correto
            zip: address.zip,
            number: address.number,
            complement: address.complement,
          },
        };

        if (lawyerSelected) {
          // Se estiver editando um advogado existente
          await LawyerService.updateLawyer(lawyerSelected.id, lawyerData);
        } else {
          // Se estiver criando um novo advogado
          await LawyerService.createLawyer(lawyerData);
        }

        CloseModal();
      } catch (error) {
        console.error("Erro ao salvar o advogado:", error);
      }
    }
  };
  return (
    <Dialog
      header="Adicionar um novo advogado:"
      visible={visible}
      style={{ width: "75vw", maxWidth: "45em" }}
      onHide={CloseModal}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="name">Nome do Advogado*</label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "p-invalid mt-1" : "mt-1"}
          />
          {errors.name && <small className="p-error ml-2">{errors.name}</small>}
        </div>

        <div className="p-field mt-2">
          <label htmlFor="seniority">Senioridade*</label>
          <Dropdown
            id="seniority"
            value={seniority}
            options={Object.keys(Seniority).map((key) => ({
              label: Seniority[key],
              value: key,
            }))}
            onChange={(e) => setSeniority(e.value)}
            placeholder="Selecione a Senioridade"
            className={errors.seniority ? "p-invalid mt-1" : "mt-1"}
          />
          {errors.seniority && <small className="p-error">{errors.seniority}</small>}
        </div>

        <div className="p-field mt-2">
          <label htmlFor="state">Estado*</label>
          <Dropdown
            id="state"
            value={address.state}
            options={Object.keys(State).map((key) => ({
              label: State[key],
              value: key,
            }))}
            onChange={(e) => setAddress({ ...address, state: e.value })}
            placeholder="Selecione o Estado"
            className={errors.state ? "p-invalid mt-1" : "mt-1"}
          />
          {errors.state && <small className="p-error">{errors.state}</small>}
        </div>

        <div className="p-field mt-2">
          <label htmlFor="neighborhood">Bairro*</label>
          <InputText
            id="neighborhood"
            value={address.neighborhood}
            onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
            className={errors.neighborhood ? "p-invalid mt-1" : "mt-1"}
          />
          {errors.neighborhood && <small className="p-error">{errors.neighborhood}</small>}
        </div>

        <div className="p-field mt-2">
          <label htmlFor="street">Logradouro*</label>
          <InputText
            id="street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            className={errors.street ? "p-invalid mt-1" : "mt-1"}
          />
          {errors.street && <small className="p-error">{errors.street}</small>}
        </div>

        <div className="p-field mt-2">
          <label htmlFor="zip">CEP*</label>
          <InputMask
            id="zip"
            mask="99999-999"
            value={address.zip}
            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            className={`form-control ${errors.zip ? "p-invalid mt-1" : "mt-1"}`}
            placeholder="Digite o CEP"
          />
          {errors.zip && <small className="p-error">{errors.zip}</small>}
        </div>

        <div className="p-field mt-2">
          <label htmlFor="number">Número*</label>
          <InputText
            id="number"
            value={address.number}
            onChange={(e) => setAddress({ ...address, number: e.target.value.replace(/\D/, "") })}
            className={errors.number ? "p-invalid mt-1" : "mt-1"}
            keyfilter="int"
          />
          {errors.number && <small className="p-error">{errors.number}</small>}
        </div>

        <div className="p-field mt-2">
          <label htmlFor="complement">Complemento</label>
          <InputText
            id="complement"
            value={address.complement}
            onChange={(e) => setAddress({ ...address, complement: e.target.value })}
          />
        </div>

        <div className="mt-4 d-flex justify-content-center">
          <Button
            style={{ borderRadius: "0.5em", width: "50vw", maxWidth: "20em" }}
            label="Salvar"
            icon="pi pi-check"
            iconPos="right"
            onClick={handleSave}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default ModalLawyer;
