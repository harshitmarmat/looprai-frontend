import React, { useState } from "react";
import Card from "../components/Card";
import wallet from "../assets/wallet_color.svg";
import revenue from "../assets/revenue.svg";
import expenses from "../assets/expenses.svg";
import dollar from "../assets/dollar.svg";

const insightData = [
  {
    amount: "$41,210",
    name: "Balance",
    icon: wallet,
  },
  {
    amount: "$41,210",
    name: "Revenue",
    icon: revenue,
  },
  {
    amount: "$41,210",
    name: "Expenses",
    icon: expenses,
  },
  {
    amount: "$41,210",
    name: "Savings",
    icon: dollar,
  },
];

const iconData = {
  'balance' : wallet,
  'revenue' : revenue,
  'expenses' : expenses,
  'savings' : dollar
}

const Insights = ({data}:any) => {
  const [insightData,setData] = useState(data);

  const dataKeys = Object.keys(insightData)
  return (
    <div className="flex  justify-between">
      {dataKeys.map((dataKey) => (
        <Card>
          <div className="flex gap-4 items-center">
            <Card styles="bg-secondary_la p-2">
              <img src={iconData[dataKey.toLowerCase()]} alt="icon-insight" />
            </Card>
            <div className="px-6">
                <p className="text-text-nwf2 text-grey_la">{dataKey}</p>
                <div className="text-text-swf3 text-white_la">{insightData[dataKey]}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Insights;
