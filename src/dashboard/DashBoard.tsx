import React, { useEffect, useState } from "react";
import Insights from "./Insights";
import AnalyticsGraph from "./AnalyticsGraph";

import RecentTranx from "./RecentTranx";
import Transaction from "./Transaction";
import axios from "axios";

const DashBoard = () => {

  const [data,setData] = useState(null)
  const getData = async () => {
    console.log(import.meta);
    const startTime = new Date().getTime();
  
    try {
      const apiUrls = [
        axios.get(import.meta.env.VITE_BASE_URL + '/api/transactions/summary'),
        axios.get(import.meta.env.VITE_BASE_URL + '/api/transactions/recent'),
        axios.get(import.meta.env.VITE_BASE_URL + '/api/transactions/monthly?year=2024'),
        // axios.get(import.meta.env.VITE_BASE_URL + "/api/transactions/by-date?startDate=2024-01-01&endDate=2024-12-01"),
      ];
  
      // Using Promise.allSettled
      const results = await Promise.allSettled(apiUrls);
  
      // Extracting results
      const insightRes = results[0].status === "fulfilled" ? results[0].value.data : null;
      const recentTransaction = results[1].status === "fulfilled" ? results[1].value.data : null;
      const graphData = results[2].status === "fulfilled" ? results[2].value.data : null;
      // const transactionData = results[3].status === "fulfilled" ? results[3].value.data : null;
  
      const obj = {
        insightData: insightRes,
        graphData: graphData,
        recentTranx: recentTransaction,
        // tranxData: transactionData,
      };
  
      setData(obj);
  
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      console.log(`API calls took ${duration} ms`);
    } catch (e) {
      console.error('An unexpected error occurred:', e);
    }
  };


  useEffect(()=>{
    getData()
  },[])


  return (
    data && <div className="px-4  py-6">
      <Insights data={data.insightData}/>
      <div className="flex gap-4 my-6">
        <AnalyticsGraph  graph={data.graphData}/>
        <RecentTranx recentTranx={data.recentTranx} />
      </div>
      <Transaction />
    </div>
  );
};

export default DashBoard;
