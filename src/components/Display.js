import React from "react";
import { Table } from "react-bootstrap";

const Dislpay = (props) => {
  if (props.loading) {
    return <h2>Loading...</h2>;
  }

  let keys = [];
  let values = {};
  for (let xx in props.item) {
    let tt = props.item[xx];
    for (let a in tt) {
      keys.push(a);
      values[a] = tt[a];
    }
  }

  return (
    <Table className="mt-4" striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((v, i) => {
          return (
            <tr key={i}>
              <td>{v}</td>
              <td>{values[v]}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Dislpay;
