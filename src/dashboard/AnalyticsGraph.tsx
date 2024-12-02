import { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Card from "../components/Card";
import axios from "axios";

// Register required components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsGraph = ({ graph }:any) => {
  const [year, setYear] = useState("2024");
  const [graphData, setGraphData] = useState(graph);
  const data = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Expense",
        data: graphData.expenses,
        fill: true,
        borderColor: "#1FCB4F",
        tension: 0.5,
      },
      {
        label: "Revenue",
        data: graphData.revenue,
        fill: true,
        borderColor: "#FFC01E",
        tension: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      subtitle: {
        display: true,
        text: "Custom Chart Subtitle",
      },
      title: {
        display: true,
        text: "Overview",
        padding: {
          top: 20,
          bottom: 30,
          left: 30,
        },
        align: "start",
        font: {
          size: 24,
        },
        color: "#ffffff",
      },
      legend: {
        align: "end",
        labels: {
          color: "#9A9A9A",
          useBorderRadius: true,
          borderRadius: 5,
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context:any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
        backgroundColor: function (context:any) {
          if (
            context.tooltip.dataPoints &&
            context.tooltip.dataPoints.length > 0
          ) {
            if (context.tooltip.dataPoints.length > 1) {
              return "#cccccc"; // Gray for multiple datasets
            } else {
              const datasetIndex = context.tooltip.dataPoints[0].datasetIndex;
              const dataset = context.chart.data.datasets[datasetIndex];
              if (dataset.label === "Expense") {
                return "#1FCB4F4D"; // Expense dataset color
              } else if (dataset.label === "Revenue") {
                return "#FFC01E4D"; // Revenue dataset color
              } else {
                return "#ffffff"; // Default color
              }
            }
          } else {
            return "#ffffff"; // Default color
          }
        },
      },
    },
    elements: {
      point: {
        radius: 2,
        hoverRadius: 5,
      },
    },
  };

  const yearHandler = async (year: string) => {
    try {
      setYear(year);
      const res = await axios.get(
//@ts-ignore
        import.meta.env.VITE_BASE_URL + "/api/transactions/monthly?year=" + year
      );
      setGraphData(res.data);
    } catch (e) {
      return e;
    }
  };
  return (
    <Card styles="relative w-[70%] px-6 flex items-center justify-between h-[50vh] max-h-[60vh]">
      <div className="dropdown dropdown-bottom absolute top-4 right-4 dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          {year}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li onClick={() => yearHandler("2024")}>
            <a>2024</a>
          </li>
          <li onClick={() => yearHandler("2023")}>
            <a>2023</a>
          </li>
          <li onClick={() => yearHandler("2022")}>
            <a>2022</a>
          </li>
        </ul>
      </div>
      {/*@ts-ignore*/}
      <Line data={data} options={options} />
    </Card>
  );
};

export default AnalyticsGraph;
