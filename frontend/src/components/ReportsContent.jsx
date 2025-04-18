import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartColors = [
  "rgba(71, 85, 246, 0.7)", // primary
  "rgba(138, 93, 246, 0.7)", // secondary
  "rgba(16, 185, 129, 0.7)", // accent
  "rgba(239, 68, 68, 0.7)", // danger
  "rgba(245, 158, 11, 0.7)", // yellow
  "rgba(59, 130, 246, 0.7)", // blue
  "rgba(217, 70, 239, 0.7)", // purple
  "rgba(236, 72, 153, 0.7)", // pink
];

const ReportsContent = ({ expenses }) => {
  const [chartType, setChartType] = useState("doughnut");
  const [timeRange, setTimeRange] = useState("all");

  const getFilteredExpenses = () => {
    if (timeRange === "all") return expenses;

    const today = new Date();
    const startDate = new Date();

    if (timeRange === "week") {
      startDate.setDate(today.getDate() - 7);
    } else if (timeRange === "month") {
      startDate.setMonth(today.getMonth() - 1);
    } else if (timeRange === "year") {
      startDate.setFullYear(today.getFullYear() - 1);
    }

    return expenses.filter(
      (expense) =>
        new Date(expense.date) >= startDate && new Date(expense.date) <= today
    );
  };

  const filteredExpenses = getFilteredExpenses();

  // By Category
  const categoryTotals = filteredExpenses.reduce((totals, expense) => {
    const category = expense.category || "Uncategorized";
    totals[category] = (totals[category] || 0) + (expense.amount || 0);
    return totals;
  }, {});

  // By Month (for past year)
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const getMonthlyData = () => {
    const currentDate = new Date();
    const lastYearData = {};

    // Initialize all months with zero
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentDate.getMonth() - i + 12) % 12;
      lastYearData[monthNames[monthIndex]] = 0;
    }

    // Fill in expense data
    filteredExpenses.forEach((expense) => {
      if (!expense.date) return;

      const expenseDate = new Date(expense.date);
      const monthsAgo =
        (currentDate.getFullYear() - expenseDate.getFullYear()) * 12 +
        (currentDate.getMonth() - expenseDate.getMonth());

      if (monthsAgo >= 0 && monthsAgo < 12) {
        const monthIndex = (currentDate.getMonth() - monthsAgo + 12) % 12;
        lastYearData[monthNames[monthIndex]] += expense.amount || 0;
      }
    });

    return lastYearData;
  };

  const monthlyData = getMonthlyData();

  // Chart Data
  const doughnutData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: chartColors.slice(
          0,
          Object.keys(categoryTotals).length
        ),
        borderColor: chartColors.map((color) => color.replace("0.7", "1")),
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Total Expenses by Category",
        data: Object.values(categoryTotals),
        backgroundColor: chartColors.slice(
          0,
          Object.keys(categoryTotals).length
        ),
        borderColor: chartColors.map((color) => color.replace("0.7", "1")),
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: Object.keys(monthlyData).reverse(),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyData).reverse(),
        backgroundColor: "rgba(71, 85, 246, 0.2)",
        borderColor: "rgba(71, 85, 246, 1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 15,
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
    scales:
      chartType !== "doughnut"
        ? {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `$${value}`,
              },
            },
          }
        : undefined,
  };

  // Get total of all expenses
  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + (expense.amount || 0),
    0
  );

  // Render the active chart
  const renderChart = () => {
    const height = 300;

    switch (chartType) {
      case "doughnut":
        return (
          <Doughnut
            data={doughnutData}
            options={chartOptions}
            height={height}
          />
        );
      case "bar":
        return <Bar data={barData} options={chartOptions} height={height} />;
      case "line":
        return <Line data={lineData} options={chartOptions} height={height} />;
      default:
        return (
          <Doughnut
            data={doughnutData}
            options={chartOptions}
            height={height}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Visualize and understand your spending patterns
        </p>
      </div>

      {/* Chart Controls */}
      <div className="card bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setChartType("doughnut")}
              className={`btn ${
                chartType === "doughnut" ? "btn-primary" : "btn-outline"
              }`}
            >
              Pie
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`btn ${
                chartType === "bar" ? "btn-primary" : "btn-outline"
              }`}
            >
              Bar
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`btn ${
                chartType === "line" ? "btn-primary" : "btn-outline"
              }`}
            >
              Timeline
            </button>
          </div>

          <div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input"
            >
              <option value="all">All Time</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        {filteredExpenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No data available
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {timeRange !== "all"
                ? "No expenses found in the selected time period"
                : "Add some expenses to see your spending patterns"}
            </p>
          </div>
        ) : (
          <div className="h-[350px] pt-4">{renderChart()}</div>
        )}
      </div>

      {/* Expense Summary */}
      {filteredExpenses.length > 0 && (
        <div className="card bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Expense Breakdown
          </h3>
          <div className="overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Category
              </span>
              <div className="flex space-x-4">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Amount
                </span>
                <span className="font-medium text-gray-700 dark:text-gray-300 w-20">
                  % of Total
                </span>
              </div>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {Object.entries(categoryTotals)
                .sort((a, b) => b[1] - a[1])
                .map(([category, amount]) => {
                  const percentage = (amount / totalExpenses) * 100;
                  return (
                    <li
                      key={category}
                      className="px-4 py-3 flex justify-between items-center"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {category}
                      </span>
                      <div className="flex space-x-4">
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${amount.toFixed(2)}
                        </span>
                        <span className="font-medium text-primary-600 dark:text-primary-400 w-20">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </li>
                  );
                })}
              <li className="px-4 py-3 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
                <span className="font-bold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  ${totalExpenses.toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsContent;
