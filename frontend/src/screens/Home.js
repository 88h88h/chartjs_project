import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";
import { saveAs } from "file-saver"; // Import the file-saver library
import "./Home.css";

export default function Home() {
  const [data, setData] = useState({
    id: [],
    sensor1: [],
    sensor2: [],
    sensor3: [],
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
      const idData = responseData.map((entry) => entry.id);
      const sensor1Data = responseData.map((entry) => entry.sensor1);
      const sensor2Data = responseData.map((entry) => entry.sensor2);
      const sensor3Data = responseData.map((entry) => entry.sensor3);
      const sensor4Data = responseData.map((entry) => entry.sensor4);
      const sensor5Data = responseData.map((entry) => entry.sensor5);
      const sensor6Data = responseData.map((entry) => entry.sensor6);
      const timeData = responseData.map((entry) => entry.time);

      setData({
        id: idData,
        sensor1: sensor1Data,
        sensor2: sensor2Data,
        sensor3: sensor3Data,
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

  // Function to convert data to CSV format
  const convertToCSV = () => {
    const csvData = [];
    csvData.push([
      "id",
      "Time",
      "CO2",
      "Relative Humidity",
      "Temperature(air)",
      "pH",
      "EC",
      "Temperature",
    ]);

    for (let i = 0; i < data.time.length; i++) {
      csvData.push([
        data.id[i],
        data.time[i],
        data.sensor1[i],
        data.sensor2[i],
        data.sensor3[i],
        data.sensor4[i],
        data.sensor5[i],
        data.sensor6[i],
      ]);
    }

    return csvData.map((row) => row.join(",")).join("\n");
  };

  // Function to handle export button click
  const handleExport = () => {
    const csvContent = convertToCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "sensor_data.csv");
  };

  const sensor1Data = {
    labels: data.time,
    datasets: [
      {
        label: "CO2",
        data: data.sensor1,
        fill: false,
        borderColor: "rgb(100, 164, 250)",
        tension: 0.1,
      },
    ],
  };

  const sensor2Data = {
    labels: data.time,
    datasets: [
      {
        label: "Relative Humidity",
        data: data.sensor2,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const sensor3Data = {
    labels: data.time,
    datasets: [
      {
        label: "Temperature(air)",
        data: data.sensor3,
        fill: false,
        borderColor: "rgb(255, 205, 86)",
        tension: 0.1,
      },
    ],
  };

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
          stepSize: 0.05,
        },
      },
    },
  };

  return (
    <div>
      <div className="container">
        <button onClick={handleExport} className="export-button">
          Export to CSV
        </button>
      </div>
      <div className="chart-container">
        <div className="chart">
          <h2>CO2 vs Time</h2>
          <Line data={sensor1Data} />
        </div>
        <div className="chart">
          <h2>Relative Humidity vs Time</h2>
          <Line data={sensor2Data} />
        </div>
        <div className="chart">
          <h2>Temperature(air) vs Time</h2>
          <Line data={sensor3Data} />
        </div>
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
    </div>
  );
}
