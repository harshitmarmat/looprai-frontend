import React from "react";
import Card from "../components/Card";
import Profile from "../components/Profile";

const RecentTranx = ({ recentTranx }) => {

  return (
    <Card styles="w-[30%] h-fit">
      <div className="flex items-end justify-between">
        <p className="text-white_la text-text-swf2">Recent Transaction</p>
        <p className="text-green_la text-text-nwf2">See all</p>
      </div>
      <div className="mt-2">
        {recentTranx.map((tranx) => {
          const {user_profile , category, user_id , amount} = tranx;
          const isExpenses = category.toLowerCase()==='expense'
          return (
            <div className="flex justify-between items-center border-b-[1px] py-4 border-darkgrey_la">
              <div className="flex gap-4">
                <Profile img_src={user_profile} />
                <div className="flex flex-col justify-between">
                  <p className="text-grey_la text-text-nwf1">{isExpenses?"Transfers to":"Transfers from"}</p>
                  <p className="text-white_la text-text-nwf2">
                    {user_id}
                  </p>
                </div>
              </div>
              <p className={`text-text-swf1 ${isExpenses?'text-yellow_la':'text-green_la'}`}>{isExpenses?'-':'+'}${amount}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RecentTranx;
