import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import React, { useEffect } from "react";

function DeleteLawyer({ visible, visibleSet, lawyerSelected, setLawyerSelected }) {
  const DeleteLawyerSelected = () => {};
  const CloseModal = () => visibleSet(false);

  useEffect(() => {
    console.log(lawyerSelected);
    if (lawyerSelected) {
    }
  }, [lawyerSelected]);

  return (
    <Dialog
      header="Atenção, deseja realmente apagar?"
      visible={visible}
      style={{ width: "35vw", height: "45vh", minWidth: "20em", minHeight: "17em" }}
      onHide={CloseModal}>
      <div className="p-fluid">
        <div>
          <p>
            Nome do Advogado(a) selecionado:{" "}
            {lawyerSelected != null ? lawyerSelected.name + " com nível: " + lawyerSelected.seniority : ""}
          </p>
          <p>Estado: {lawyerSelected != null ? lawyerSelected.address.state : ""}</p>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Button
            className="btn-circle btn btn-danger"
            style={{ borderRadius: "0.5em", width: "50vw", maxWidth: "8em" }}
            label="Apagar"
            icon="pi pi-trash"
            onClick={() => DeleteLawyerSelected()}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteLawyer;
