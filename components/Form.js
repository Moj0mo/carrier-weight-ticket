import DynamicTable from "./DynamicTable";
import React, { useState } from "react";
const Form = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [tableData, setTableData] = useState({});
  const [itemTableData, setItemTableData] = useState(null);
  const [shipper, setShipper] = useState("");
  const [lot, setLot] = useState("");
  const [gbl, setGBL] = useState("");
  const [cos, setCOS] = useState("");
  const [carrier, setCarrier] = useState("");
  const [ssn, setSSN] = useState("");
  const [date, setDate] = useState("");

  const updateShipper = (e) => setShipper(e.target.value);
  const updateLot = (e) => setLot(e.target.value);
  const updateGBL = (e) => setGBL(e.target.value);
  const updateCOS = (e) => setCOS(e.target.value);
  const updateCarrier = (e) => setCarrier(e.target.value);
  const updateSSN = (e) => setSSN(e.target.value);
  const updateDate = (e) => setDate(e.target.value);

  const formatDate = () => {
    let monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const dateArray = date.split("-");
    let year = dateArray[0];
    let month = monthNames[parseInt(dateArray[1]) - 1];
    let day = dateArray[2];
    return day + "-" + month + "-" + year;
  };

  const handleTotalCallback = (totalChildData) => {
    console.log("inside parent");
    const { gross, tare, net, density, cube } = totalChildData;
    setTableData({
      gross: gross,
      tare: tare,
      net: net,
      density: density,
      cube: cube,
    });
  };

  const handleItemCallback = (itemChildData) => {
    setItemTableData(itemChildData);
    console.log(itemTableData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {!submitted ? (
        <form onSubmit={handleSubmit} action="#">
          <div className="mb-3 row">
            <label htmlFor="shipperName" className="col-sm-1 col-form-label">
              Shipper
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="shipperName"
                name="shipperName"
                value={shipper}
                onChange={updateShipper}
              />
            </div>
            <label htmlFor="lotNumber" className="col-sm-1 col-form-label">
              Lot #
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="lotNumber"
                name="lotNumber"
                value={lot}
                onChange={updateLot}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="gblNumber" className="col-sm-1 col-form-label">
              GBL
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="gblNumber"
                name="gblNumber"
                value={gbl}
                onChange={updateGBL}
              />
            </div>
            <label htmlFor="codeOfService" className="col-sm-1 col-form-label">
              COS
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="codeOfService"
                name="codeOfService"
                value={cos}
                onChange={updateCOS}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="carrierScac" className="col-sm-1 col-form-label">
              Carrier
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                id="carrierScac"
                name="carrierScac"
                value={carrier}
                onChange={updateCarrier}
              />
            </div>
            <label htmlFor="ssn" className="col-sm-1 col-form-label">
              SSN
            </label>
            <div className="col-sm-5">
              <div className="input-group mb-3">
                <span className="input-group-text" id="ssn">
                  XXX-XX-
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="ssn"
                  aria-describedby="ssn"
                  name="ssn"
                  value={ssn}
                  onChange={updateSSN}
                />
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="date" className="col-sm-1 col-form-label">
              Date
            </label>
            <div className="col-sm-5">
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={date}
                onChange={updateDate}
              />
            </div>
          </div>
          <h2 className="text-center">Summary of Weights and Pieces</h2>
          <DynamicTable
            tableCallback={handleTotalCallback}
            itemCallback={handleItemCallback}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={itemTableData == null ? true : false}
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          <div className="mb-3 row">
            <label htmlFor="shipperName" className="col-sm-1 col-form-label">
              Shipper
            </label>
            <div className="col-sm-5">
              <p className="form-control" id="shipperName">
                {shipper}
              </p>
            </div>
            <label htmlFor="lotNumber" className="col-sm-1 col-form-label">
              Lot #
            </label>
            <div className="col-sm-5">
              <p className="form-control" id="lotNumber">
                {lot}
              </p>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="gblNumber" className="col-sm-1 col-form-label">
              GBL
            </label>
            <div className="col-sm-5">
              <p className="form-control" id="gblNumber">
                {gbl}
              </p>
            </div>
            <label htmlFor="codeOfService" className="col-sm-1 col-form-label">
              COS
            </label>
            <div className="col-sm-5">
              <p className="form-control" id="codeOfService">
                {cos}
              </p>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="carrierScac" className="col-sm-1 col-form-label">
              Carrier
            </label>
            <div className="col-sm-5">
              <p className="form-control" id="carrierScac">
                {carrier}
              </p>
            </div>
            <label htmlFor="ssn" className="col-sm-1 col-form-label">
              SSN
            </label>
            <div className="col-sm-5">
              <div className="input-group mb-3">
                <span className="input-group-text" id="ssn">
                  XXX-XX-
                </span>
                <p className="form-control" id="ssn" aria-describedby="ssn">
                  {ssn}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="date" className="col-sm-1 col-form-label">
              Date
            </label>
            <div className="col-sm-5">
              <p className="form-control" id="date">
                {formatDate(date)}
              </p>
            </div>
          </div>
          <h2 className="text-center">Summary of Weights and Pieces</h2>
          <div className="row d-flex">
            <div className="col-sm-8 mx-auto">
              <table className="table table-striped mapped">
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
                  {itemTableData.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.seal}</td>
                        <td>{value.gross}</td>
                        <td>{value.tare}</td>
                        <td>{value.net}</td>
                        <td>{value.length}</td>
                        <td>{value.width}</td>
                        <td>{value.height}</td>
                        <td>{value.cube}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-sm-8 mx-auto">
              <table className="table notmapped">
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
                    <td>{itemTableData.length}</td>
                    <td>{tableData.gross}</td>
                    <td>{tableData.tare}</td>
                    <td>{tableData.net}</td>
                    <td>{tableData.density.toFixed(2)}</td>
                    <td>{tableData.cube}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Form;
