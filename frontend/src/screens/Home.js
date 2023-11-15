import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";
import "./Home.css";

export default function Home() {
  const [data, setData] = useState({
    sensor4: [],
    sensor5: [],
    sensor6: [],
    time: [],
  });

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data/get");
      const responseData = response.data.data;

      // Extract the sensor data into separate arrays
      const sensor4Data = responseData.map((entry) => entry.sensor4);
      const sensor5Data = responseData.map((entry) => entry.sensor5);
      const sensor6Data = responseData.map((entry) => entry.sensor6);
      const timeData = responseData.map((entry) => entry.time);

      setData({
        sensor4: sensor4Data,
        sensor5: sensor5Data,
        sensor6: sensor6Data,
        time: timeData,
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Use useEffect to fetch data initially and set up a 10-second interval to update the data
  useEffect(() => {
    fetchData(); // Initial data fetch

    const interval = setInterval(() => {
      console.log("fetching");
      fetchData(); // Fetch data every 10 seconds
    }, 10000);

    return () => clearInterval(interval);
  }, [setData]);

  const sensor4Data = {
    labels: data.time,
    datasets: [
      {
        label: "pH",
        data: data.sensor4,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const sensor5Data = {
    labels: data.time,
    datasets: [
      {
        label: "EC",
        data: data.sensor5,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const sensor6Data = {
    labels: data.time,
    datasets: [
      {
        label: "Temperature",
        data: data.sensor6,
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const temperatureOptions = {
    scales: {
      y: {
        min: 28,
        max: 29,
        ticks: {
          // forces step size to be 50 units
          stepSize: 0.05,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart">
        <h2>pH vs Time</h2>
        <Line data={sensor4Data} />
      </div>
      <div className="chart">
        <h2>EC vs Time</h2>
        <Line data={sensor5Data} />
      </div>
      <div className="chart">
        <h2>Temperature vs Time</h2>
        <Bar data={sensor6Data} options={temperatureOptions} />
      </div>
    </div>
  );
}
