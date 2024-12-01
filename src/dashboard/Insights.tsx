import React from "react";
import Card from "../components/Card";
//@ts-ignore
import wallet from "../assets/wallet_color.svg";
//@ts-ignore
import revenue from "../assets/revenue.svg";
//@ts-ignore
import expenses from "../assets/expenses.svg";
//@ts-ignore
import dollar from "../assets/dollar.svg";

const iconData = {
  'balance': wallet,
  'revenue': revenue,
  'expenses': expenses,
  'savings': dollar
};

interface InsightsData {
  balance: number;
  revenue: number;
  expenses: number;
  savings: number;
}

const Insights: React.FC<{ data: InsightsData }> = ({ data }) => {
  const dataKeys = Object.keys(data);
  return (
    <div className="flex justify-between">
      {dataKeys.map((dataKey) => (
        <Card key={dataKey}>
          <div className="flex gap-4 items-center">
            <Card styles="bg-secondary_la p-2">
                {/*@ts-ignore**/}
              <img src={iconData[dataKey.toLowerCase()]} alt={`icon-${dataKey}`} />
            </Card>
            <div className="px-6">
              <p className="text-text-nwf2 text-grey_la">{dataKey}</p>
                {/*@ts-ignore**/}
              <div className="text-text-swf3 text-white_la">${data[dataKey].toLocaleString('en-IN')}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Insights;