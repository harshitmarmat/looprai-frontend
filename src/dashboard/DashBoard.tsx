import React, { useEffect, useState } from "react";
import Insights from "./Insights.tsx";
import AnalyticsGraph from "./AnalyticsGraph";

import RecentTranx from "./RecentTranx.tsx";
import TransactionComp from "./Transaction.tsx";
import axios, { AxiosResponse } from "axios";
// Define interfaces for data structures
interface InsightData {
  balance: number;
  revenue: number;
  expenses: number;
  savings: number;
}

interface GraphData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

interface RecentTranxData {
  transactions: Transaction[];
}

interface Transaction {
  // Define transaction properties as needed
}

interface DashboardData {
  insightData: InsightData;
  graphData: GraphData;
  recentTranx: RecentTranxData;
  // tranxData: any; // Uncomment if needed
}
const DashBoard = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  const apiUrls = [
    axios.get<InsightData>(import.meta.env.VITE_BASE_URL + '/api/transactions/summary'),
    axios.get<RecentTranxData>(import.meta.env.VITE_BASE_URL + '/api/transactions/recent'),
    axios.get<GraphData>(import.meta.env.VITE_BASE_URL + '/api/transactions/monthly?year=2024'),
    // axios.get<any>(import.meta.env.VITE_BASE_URL + "/api/transactions/by-date?startDate=2024-01-01&endDate=2024-12-01"),
  ];
  const getData = async () => {
    console.log(import.meta);
    const startTime = new Date().getTime();
  
    try {
      const results = await Promise.allSettled(apiUrls);
  
      const insightRes = (results[0] as PromiseFulfilledResult<AxiosResponse<InsightData>>).status === "fulfilled"
        ? (results[0] as PromiseFulfilledResult<AxiosResponse<InsightData>>).value.data
        : null;
  
      const recentTransaction = (results[1] as PromiseFulfilledResult<AxiosResponse<RecentTranxData>>).status === "fulfilled"
        ? (results[1] as PromiseFulfilledResult<AxiosResponse<RecentTranxData>>).value.data
        : null;
  
      const graphData = (results[2] as PromiseFulfilledResult<AxiosResponse<GraphData>>).status === "fulfilled"
        ? (results[2] as PromiseFulfilledResult<AxiosResponse<GraphData>>).value.data
        : null;
  
      // const transactionData = results[3].status === "fulfilled" ? results[3].value.data : null;
  
      const obj: DashboardData = {
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
      <div className="flex gap-6 justify-between my-6">
        <AnalyticsGraph  graph={data.graphData}/>
        <RecentTranx recentTranx={data.recentTranx} />
      </div>
      <TransactionComp />
    </div>
  );
};

export default DashBoard;
