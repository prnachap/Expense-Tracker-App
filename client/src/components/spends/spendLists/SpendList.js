import React, { Fragment } from "react";
import SpendItem from "../spendItem/SpendItem";
import spinner from "../../layout/spinner.gif";

const SpendList = ({ expenses, loading, edit = true }) => {
  return (
    <Fragment>
      <h3 className="heading__tertiary padding-border">
        {edit ? "Income & Expenditure" : "Expenditure"}
      </h3>
      <div className="spend__container">
        {loading ? (
          <Fragment>
            <img src={spinner} alt="loader" width="40px" />
          </Fragment>
        ) : (
          <Fragment>
            {expenses && expenses.length > 0 ? (
              expenses.map(
                (item, index) =>
                  item && <SpendItem key={index} item={item} edit={edit} />
              )
            ) : (
              <p className={"paragraph pd-sm"}>No Expense Details</p>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default SpendList;
