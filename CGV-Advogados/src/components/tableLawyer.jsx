import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import lawyers from "../data/lawyers.json";
import "primeicons/primeicons.css";

function TableLawyer() {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [products, setProducts] = useState([...lawyers]); // Dados dos advogados

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

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">Lista de advogados</span>
        <div className="d-flex justify-content-between">
          <div className="">
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Buscar na tabela"
              className="p-inputtext-sm"
            />
          </div>
          <Button className="btn-circle" icon="pi pi-refresh" rounded raised />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  const [loading, setLoading] = useState(false);

  const [sizeOptions] = useState([
    { label: "Curta", value: "small" },
    { label: "Média", value: "normal" },
    { label: "Grande", value: "large" },
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);

  const footer = `Total de ${products ? products.length : 0} advogados.`;

  return (
    <div className="flex justify-center items-center">
      <div className="card w-full">
        <div className="flex justify-center items-center mb-4">
          <SelectButton
            value={size}
            onChange={(e) => setSize(e.value)}
            options={sizeOptions}
          />
        </div>

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
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          {columns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              sortable
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
}

export default TableLawyer;
