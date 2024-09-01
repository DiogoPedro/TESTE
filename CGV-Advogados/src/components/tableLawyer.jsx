import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";

//Components
import ModalLawyer from "./modalLawyer";
//Models
import lawyers from "../data/lawyers.json";
import DeleteLawyer from "./deleteLawyer";

function TableLawyer() {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [products, setProducts] = useState([...lawyers]); // Dados dos advogados
  const [loading, setLoading] = useState(false);
  const footer = `Total de ${products ? products.length : 0} advogados.`;
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [sizeOptions] = useState([
    { label: "Curta", value: "small" },
    { label: "Média", value: "normal" },
    { label: "Grande", value: "large" },
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);

  const columns = [
    { field: "name", header: "Nome do Advogado" },
    { field: "seniority", header: "Senioridade" },
    { field: "address.street", header: "Logradouro" },
    { field: "address.neighborhood", header: "Bairro" },
    { field: "address.state", header: "Estado" },
    { field: "address.zip", header: "CEP" },
    { field: "address.number", header: "Número" },
    { field: "address.complement", header: "Complemento" },
  ];

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  const openCreateModal = () => {
    setSelectedLawyer(null);
    setShowModal(true);
  };

  const openEditModal = (lawyer) => {
    setSelectedLawyer(lawyer);
    setShowModal(true);
  };

  const deleteLawyer = (lawyer) => {
    setSelectedLawyer(lawyer);
    setShowDeleteModal(true);
  };

  const renderHeader = () => {
    return (
      <>
        <p className="h5">Lista de advogados</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="mt-2">
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              style={{ width: "50vw", maxWidth: "27em" }}
              placeholder="Buscar na tabela"
            />
          </div>
          <div className="d-flex align-items-center" style={{ marginInline: "0.5em" }}>
            <Button onClick={openCreateModal} className="btn-circle" style={{ padding: "0.5em 0.7em 0.5em 0.5em" }}>
              <i className="pi pi-user-plus" style={{ fontSize: "1.7rem" }}></i>
            </Button>
          </div>
        </div>
      </>
    );
  };

  const header = renderHeader();

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Button
          icon="pi pi-user-edit"
          className="btn-circle p-button-text p-button-plain mr-1"
          onClick={() => openEditModal(rowData)}
        />
        <Button
          icon="pi pi-user-minus"
          className="btn-circle p-button-text p-button-danger"
          onClick={() => deleteLawyer(rowData)}
        />
      </div>
    );
  };

  return (
    <>
      <ModalLawyer
        visible={showModal}
        visibleSet={setShowModal}
        lawyerSelected={selectedLawyer}
        setLawyerSelected={setSelectedLawyer}
      />
      <DeleteLawyer
        visible={showDeleteModal}
        visibleSet={setShowDeleteModal}
        lawyerSelected={selectedLawyer}
        setLawyerSelected={setSelectedLawyer}
      />
      <div className="card w-full">
        <DataTable
          value={products}
          header={header}
          footer={footer}
          size={size}
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          globalFilterFields={[
            "name",
            "seniority",
            "address.street",
            "address.neighborhood",
            "address.state",
            "address.zip",
            "address.number",
            "address.complement",
          ]}
          tableStyle={{ minWidth: "60rem" }}
          paginator
          emptyMessage="Nenhum dado encontrado."
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}>
          {columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} sortable />
          ))}
          <Column
            body={actionBodyTemplate}
            header="Ações"
            align="center"
            bodyStyle={{ textAlign: "center", whiteSpace: "nowrap" }}
          />
        </DataTable>
      </div>
    </>
  );
}

export default TableLawyer;
