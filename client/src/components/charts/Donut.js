import React, { Fragment, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import ExpenseContext from "../../context/expenses/ExpenseContext";

const Donut = () => {
  const expenseContext = useContext(ExpenseContext);
  const { monthlyExpense } = expenseContext;

  // adding sum of all expenses based on category
  const addingUpMonthlyExpenses = () => {
    const totalSum = {
      "food & drinks": 0,
      fuel: 0,
      bills: 0,
      home: 0,
      others: 0,
      shopping: 0,
    };
    monthlyExpense.forEach((item) => {
      if (item && item.category) {
        totalSum[item.category] += item.amount;
      }
    });

    return totalSum;
  };

  const options = {
    legend: {
      position: "right",
      labels: {
        usePointStyle: true,
      },
    },
  };
  const data = {
    labels: Object.keys(addingUpMonthlyExpenses()),
    datasets: [
      {
        data: Object.values(addingUpMonthlyExpenses()),
        backgroundColor: [
          "#feb369",
          "#ffcd30",
          "#225bf9",
          "#661eee",
          "rgb(67, 196, 99)",
          "#08f6d3",
        ],
        hoverBackgroundColor: [
          "#fea261",
          "#ffaf45",
          "#29b7e7",
          "#681cf2",
          "rgb(27, 124, 51)",
          "#02f7b9",
        ],
      },
    ],
  };

  return (
    <Fragment>
      <Doughnut
        data={data}
        width={100}
        height={75}
        options={options}
      ></Doughnut>
    </Fragment>
  );
};

export default Donut;
