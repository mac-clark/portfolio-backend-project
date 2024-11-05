import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/visualize.css';

ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const Visualize = () => {
  const [dateRange, setDateRange] = useState('thisWeek');
  const [customDate, setCustomDate] = useState({ startDate: '', endDate: '' });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expensesData, setExpensesData] = useState([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState({});
  const [chartColors, setChartColors] = useState([]);

  useEffect(() => {
    handleDateRangeChange('thisWeek');
  }, []);

  const handleDateRangeChange = (option) => {
    setDateRange(option);

    const today = new Date();
    let start, end;

    if (option === 'thisWeek') {
      start = new Date(today.setDate(today.getDate() - today.getDay()));
      start.setHours(0, 0, 0, 0);
      end = new Date();
      end.setHours(23, 59, 59, 999);
    } else if (option === 'lastWeek') {
      end = new Date(today.setDate(today.getDate() - today.getDay() - 1));
      end.setHours(23, 59, 59, 999);
      start = new Date(end);
      start.setDate(end.getDate() - 6);
      start.setHours(0, 0, 0, 0);
    } else if (option === 'lastMonth') {
      end = new Date(today.getFullYear(), today.getMonth(), 0);
      end.setHours(23, 59, 59, 999);
      start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      start.setHours(0, 0, 0, 0);
    } else {
      setStartDate(null);
      setEndDate(null);
      return;
    }

    setStartDate(start);
    setEndDate(end);
  };

  const handleGraphClick = async () => {
    const selectedStartDate = dateRange === 'custom' ? customDate.startDate : startDate;
    const selectedEndDate = dateRange === 'custom' ? customDate.endDate : endDate;

    if (!selectedStartDate || !selectedEndDate) {
      alert("Please select a valid date range.");
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/expenses/range', {
        params: { startDate: selectedStartDate, endDate: selectedEndDate },
        withCredentials: true
      });
      setExpensesData(response.data);

      const breakdown = {};
      const colors = [];
      const colorPalette = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

      response.data.forEach((expense, index) => {
        const category = expense.category?.name || 'Uncategorized';
        breakdown[category] = (breakdown[category] || 0) + expense.amount;

        if (!colors[category]) colors[category] = colorPalette[index % colorPalette.length];
      });

      setCategoryBreakdown(breakdown);
      setChartColors(Object.values(colors));
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const renderCustomDatePicker = () => (
    <div className="custom-date-picker">
      <label>
        Start:
        <input
          type="date"
          value={customDate.startDate}
          onChange={(e) => setCustomDate({ ...customDate, startDate: e.target.value })}
        />
      </label>
      <label>
        End:
        <input
          type="date"
          value={customDate.endDate}
          onChange={(e) => setCustomDate({ ...customDate, endDate: e.target.value })}
        />
      </label>
    </div>
  );

  const pieData = {
    labels: Object.keys(categoryBreakdown),
    datasets: [
      {
        data: Object.values(categoryBreakdown),
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      }
    ]
  };

  return (
    <div className="visualize-container">
      <h2>Visualize Expenses</h2>
      <div className="visualize-options">
        <select
          value={dateRange}
          onChange={(e) => handleDateRangeChange(e.target.value)}
        >
          <option value="thisWeek">This Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="custom">Custom</option>
        </select>

        {dateRange === 'custom' && renderCustomDatePicker()}

        <div className="selected-range">
          <p>
            {dateRange !== 'custom'
              ? `${startDate ? startDate.toDateString() : 'N/A'} - ${endDate ? endDate.toDateString() : 'N/A'}`
              : `${customDate.startDate || 'N/A'} - ${customDate.endDate || 'N/A'}`}
          </p>
        </div>

        <button onClick={handleGraphClick} className="graph-button">Graph It!</button>
      </div>

      <div className="breakdown-container">
        <div className="breakdown-list">
          <h3>Expense Breakdown</h3>
          {Object.entries(categoryBreakdown)
            .sort(([, amountA], [, amountB]) => amountB - amountA)
            .map(([category, amount], index) => (
              <p key={category} style={{ color: chartColors[index] }}>
                {category}: ${amount.toFixed(2)}
              </p>
          ))}
        </div>

        <div className="pie-chart">
          <Pie data={pieData} width={250} height={250} />
        </div>
      </div>
    </div>
  );
};

export default Visualize;
