import React, { useEffect, useState } from "react";

const DynamicTable = (props) => {
  // Initial states
  const [rows, setRows] = useState([
    {
      seal: "",
      gross: 0,
      tare: 0,
      net: 0,
      height: 0,
      width: 0,
      length: 0,
      cube: 0,
      edit: false,
    },
  ]);

  const [totalGross, setTotalGross] = useState(0);
  const [totalTare, setTotalTare] = useState(0);
  const [totalNet, setTotalNet] = useState(0);
  const [density, setDensity] = useState(0);
  const [cube, setCube] = useState(0);

  useEffect(() => {
    calculateTotal();
  });

  const clearTotal = () => {
    setTotalGross(0);
    setTotalTare(0);
    setTotalNet(0);
    setDensity(0);
    setCube(0);
  };

  const calculateTotal = async () => {
    clearTotal();
    let gross = 0;
    let tare = 0;
    let net = 0;
    let totalCube = 0;

    for (let i = 0; i < rows.length; i++) {
      gross = parseInt(gross) + parseInt(rows[i].gross);
      tare = parseInt(tare) + parseInt(rows[i].tare);
      net = parseInt(net) + parseInt(rows[i].net);
      totalCube = parseInt(totalCube) + parseInt(rows[i].cube);
    }

    if (totalCube == 0) {
      setDensity(0);
    } else {
      isNaN(density)
        ? setDensity(0)
        : setDensity(parseFloat(net) / parseFloat(totalCube));
    }

    setTotalGross(gross);
    setTotalTare(tare);
    setTotalNet(net);
    setCube(totalCube);

    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    props.tableCallback({
      gross: totalGross,
      tare: totalTare,
      net: totalNet,
      density: density,
      cube: cube,
    });
    props.itemCallback(rows);
  };

  const [isEdit, setEdit] = React.useState(false);
  const [editedIndex, setEditedIndex] = React.useState(0);

  // Function For adding new row object
  const handleAdd = () => {
    setRows([
      ...rows,
      {
        seal: "",
        gross: 0,
        tare: 0,
        net: 0,
        length: 0,
        width: 0,
        height: 0,
        cube: 0,
        edit: false,
      },
    ]);
  };

  // Function to handle edit
  const handleEdit = (index) => {
    // If edit mode is true setEdit will
    // set it to false and vice versa
    const list = invertEdit(index);
    setEditedIndex(index);
    setRows(list);
    setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = async () => {
    invertEdit(editedIndex);
    setEdit(!isEdit);
    setRows(rows);
    console.log("saved : ", rows);
  };

  const invertEdit = (index) => {
    const list = [...rows];
    list[index].edit = !list[index].edit;
    return list;
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...rows];
    if (name == "seal") {
      list[index][name] = value;
    } else if (name == "gross") {
      list[index][name] = parseInt(value);
      list[index].net = parseInt(value) - parseInt(list[index].tare);
    } else if (name == "tare") {
      list[index][name] = parseInt(value);
      list[index].net = parseInt(list[index].gross) - parseInt(value);
    } else if (name == "length" || name == "width" || name == "height") {
      list[index][name] = parseInt(value);
      list[index].cube = parseInt(
        (list[index].length * list[index].width * list[index].height) / 1728
      );
    } else {
      list[index][name] = parseInt(value);
    }
    setRows(list);
  };

  // Handle the case of delete specific row
  const handleDelete = (i) => {
    const list = [...rows];
    list.splice(i, 1);
    setRows(list);
  };

  return (
    <>
      <div className="btn-group" role="group" aria-label="Table controls">
        <button type="button" className="btn btn-primary" onClick={handleAdd}>
          Add
        </button>
        <button
          type="button"
          className="btn btn-success"
          disabled={isEdit ? false : true}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <table className="table table-striped">
        <caption>Lift Van(s) Information</caption>
        <thead>
          <tr>
            <th>Box</th>
            <th>Seal Number</th>
            <th>Gross Weight</th>
            <th>Tare Weight</th>
            <th>Net Weight</th>
            <th>Length</th>
            <th>Width</th>
            <th>Height</th>
            <th>Cube</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((value, index) => {
            return (
              <tr key={index}>
                {!value.edit ? (
                  <>
                    <td>{index + 1}</td>
                    <td>{value.seal}</td>
                    <td>{value.gross}</td>
                    <td>{value.tare}</td>
                    <td>{value.net}</td>
                    <td>{value.length}</td>
                    <td>{value.width}</td>
                    <td>{value.height}</td>
                    <td>{value.cube}</td>
                    <button
                      className="btn btn-warning"
                      type="button"
                      disabled={isEdit}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        value={value.seal}
                        name="seal"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={value.gross}
                        name="gross"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={value.tare}
                        name="tare"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={value.gross - value.tare}
                        name="net"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={value.length}
                        name="length"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={value.width}
                        name="width"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={value.height}
                        name="height"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={parseInt(
                          (value.length * value.width * value.height) / 1728
                        )}
                        name="cube"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <button
                      className="btn btn-warning"
                      type="button"
                      disabled={isEdit}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="table">
        <thead>
          <tr className="table-warning">
            <th>Pieces</th>
            <th>Gross Weight</th>
            <th>Tare Weight</th>
            <th>Net Weight</th>
            <th>Density</th>
            <th>Cube</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{rows.length}</td>
            <td>{totalGross}</td>
            <td>{totalTare}</td>
            <td>{totalNet}</td>
            <td>{density.toFixed(2)}</td>
            <td>{cube}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DynamicTable;
