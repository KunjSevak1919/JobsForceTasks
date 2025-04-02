import './App.css';
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend as RechartsLegend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  // State to hold resume score data
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    // Simulate fetching score data manually
    const fetchScoreData = async () => {
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      //Sample Data for Test 
      const data = {
        grammar: 80,
        atsScore: 100,
        keywordMatch: 70,
      };
      setScoreData(data);
    };

    fetchScoreData();
  }, []);

  // Show a loading state if data is not yet fetched
  if (!scoreData) {
    return (
      <div className="animated-background" style={{ fontFamily: 'Arial, sans-serif' }}>
        <div className="spinner"></div>
        <p className="text-gold">Loading score data...</p>
      </div>
    );
  }

  // Prepare data for the donut chart
  const donutData = [
    { name: 'Grammar', value: scoreData.grammar },
    { name: 'ATS Score', value: scoreData.atsScore },
    { name: 'Keyword Match', value: scoreData.keywordMatch },
  ];

  // Prepare data for the bar chart
  const barData = [
    { metric: 'Grammar', score: scoreData.grammar },
    { metric: 'ATS Score', score: scoreData.atsScore },
    { metric: 'Keyword Match', score: scoreData.keywordMatch },
  ];

  // Colors for the charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="animated-background" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header>
        <h1 className="heading">Resume Score Visualization</h1>
      </header>
      <div className="charts-wrapper">
        {/* Donut Chart */}
        <div className="chart-box">
          <h2 className="chart-heading">Donut Chart</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
            <RechartsLegend />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="chart-box">
          <h2 className="chart-heading">Bar Chart</h2>
          <BarChart width={500} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default App;