import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";

import "primeicons/primeicons.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  // const data = {
  //   id: "1000",
  //   code: "f230fh0g3",
  //   name: "Bamboo Watch",
  //   description: "Product Description",
  //   image: "bamboo-watch.jpg",
  //   price: 65,
  //   category: "Accessories",
  //   quantity: 24,
  //   inventoryStatus: "INSTOCK",
  //   rating: 5,
  // };

  const data = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1001",
      code: "g330fh0g3",
      name: "AAAAA Watch",
      description: "Product Description",
      image: "Aamboo-watch.jpg",
      price: 100,
      category: "Accessories",
      quantity: 34,
      inventoryStatus: "INSTOCK",
      rating: 7,
    },
  ];

  const [products, setProducts] = useState([...data]);
  const columns = [
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
  ];

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Products</span>
      <Button icon="pi pi-refresh" rounded raised />
    </div>
  );

  const [sizeOptions] = useState([
    { label: "Small", value: "small" },
    { label: "Normal", value: "normal" },
    { label: "Large", value: "large" },
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);

  const footer = `In total there are ${
    products ? products.length : 0
  } products.`;

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
        alt={product.image}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card">
        {/* <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable> */}

        <div className="d-flex justify-content-center align-items-center  mb-4">
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
          tableStyle={{ minWidth: "60rem" }}
          options={sizeOptions}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          {columns.map((col, i) => (
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

export default App;
