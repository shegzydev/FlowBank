import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import "./Analytics.css";

Chart.register(...registerables);

const transactions = [
  {
    date: "2025-12-28",
    description: "Phone Bill",
    category: "Utilities",
    type: "expense",
    amount: -55,
  },
  {
    date: "2025-12-30",
    description: "Bonus",
    category: "Salary",
    type: "income",
    amount: 2000,
  },
  {
    date: "2026-01-01",
    description: "Rent Payment",
    category: "Housing",
    type: "expense",
    amount: -1200,
  },
  {
    date: "2026-01-02",
    description: "Dividend Payment",
    category: "Investment",
    type: "income",
    amount: 150,
  },
  {
    date: "2026-01-03",
    description: "Gym Membership",
    category: "Health",
    type: "expense",
    amount: -50,
  },
  {
    date: "2026-01-04",
    description: "Online Shopping",
    category: "Shopping",
    type: "expense",
    amount: -230,
  },
  {
    date: "2026-01-05",
    description: "Gas Station",
    category: "Transport",
    type: "expense",
    amount: -45,
  },
  {
    date: "2026-01-06",
    description: "Client Payment",
    category: "Freelance",
    type: "income",
    amount: 1200,
  },
  {
    date: "2026-01-07",
    description: "Internet Bill",
    category: "Utilities",
    type: "expense",
    amount: -60,
  },
  {
    date: "2026-01-08",
    description: "Investment Return",
    category: "Investment",
    type: "income",
    amount: 320,
  },
  {
    date: "2026-01-09",
    description: "Restaurant",
    category: "Food",
    type: "expense",
    amount: -65,
  },
  {
    date: "2026-01-10",
    description: "Electric Bill",
    category: "Utilities",
    type: "expense",
    amount: -85,
  },
  {
    date: "2026-01-11",
    description: "Freelance Project",
    category: "Freelance",
    type: "income",
    amount: 800,
  },
  {
    date: "2026-01-12",
    description: "Grocery Shopping",
    category: "Food",
    type: "expense",
    amount: -150,
  },
  {
    date: "2026-01-13",
    description: "Salary Deposit",
    category: "Salary",
    type: "income",
    amount: 5000,
  },
];

const BAR_COLORS = [
  "#3266ad",
  "#1D9E75",
  "#D85A30",
  "#7F77DD",
  "#BA7517",
  "#D4537E",
  "#639922",
];
const INC_COLORS = ["#1D9E75", "#3266ad", "#7F77DD", "#BA7517"];

const BREAKPOINTS = { mobile: 480, tablet: 768 };

function useBreakpoint() {
  const getBreakpoint = () => {
    const w = window.innerWidth;
    if (w <= BREAKPOINTS.mobile) return "mobile";
    if (w <= BREAKPOINTS.tablet) return "tablet";
    return "desktop";
  };
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);
  useEffect(() => {
    const handler = () => setBreakpoint(getBreakpoint());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return breakpoint;
}

function useChart(ref, configFn, deps) {
  useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, configFn());
    return () => chart.destroy();
  }, deps);
}

function MetricCard({ label, value, color }) {
  return (
    <div className="metric-card">
      <p className="metric-label">{label}</p>
      <p className="metric-value" style={{ color: color || "whitesmoke" }}>
        {value}
      </p>
    </div>
  );
}

function Legend({ items, colors }) {
  return (
    <div className="legend">
      {items.map((item, i) => (
        <span key={item} className="legend-item">
          <span
            className="legend-dot"
            style={{ background: colors[i % colors.length] }}
          />
          {item}
        </span>
      ))}
    </div>
  );
}

function SectionTitle({ children }) {
  return <p className="section-title">{children}</p>;
}

function DailyChart({ breakpoint }) {
  const ref = useRef();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "mobile";
  //   const isTablet = breakpoint === "tablet";

  useChart(
    ref,
    () => ({
      type: "bar",
      data: {
        labels: transactions.map((t) => t.date.slice(5)),
        datasets: [
          {
            label: "Income",
            data: transactions.map((t) => (t.type === "income" ? t.amount : 0)),
            backgroundColor: "#1D9E7566",
            borderColor: "#1D9E75",
            borderWidth: 1.5,
            borderRadius: 3,
          },
          {
            label: "Expense",
            data: transactions.map((t) =>
              t.type === "expense" ? Math.abs(t.amount) : 0,
            ),
            backgroundColor: "#D85A3066",
            borderColor: "#D85A30",
            borderWidth: 1.5,
            borderRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: {
              font: { size: isMobile ? 9 : isTablet ? 10 : 11 },
              color: "#fafafa",
              autoSkip: isMobile,
              maxTicksLimit: isMobile ? 7 : isTablet ? 10 : 15,
              maxRotation: 45,
            },
            grid: { display: false },
          },
          y: {
            ticks: {
              font: { size: isMobile ? 9 : isTablet ? 10 : 11 },
              color: "#fafafa",
              callback: (v) => "₦" + v,
            },
            grid: { color: "#88888822" },
          },
        },
      },
    }),
    [breakpoint],
  );

  return (
    <div className="section">
      <SectionTitle>Income vs Expenses — Daily</SectionTitle>
      <Legend items={["Income", "Expense"]} colors={["#1D9E75", "#D85A30"]} />
      <div className="chart-wrap chart-wrap--daily">
        <canvas ref={ref} />
      </div>
    </div>
  );
}

function CategoryBarChart({ breakpoint }) {
  const ref = useRef();
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";

  const catTotals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      catTotals[t.category] = (catTotals[t.category] || 0) + Math.abs(t.amount);
    });
  const catLabels = Object.keys(catTotals).sort(
    (a, b) => catTotals[b] - catTotals[a],
  );
  const catVals = catLabels.map((c) => catTotals[c]);

  useChart(
    ref,
    () => ({
      type: "bar",
      data: {
        labels: catLabels,
        datasets: [
          {
            data: catVals,
            backgroundColor: BAR_COLORS.slice(0, catLabels.length),
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: {
              font: { size: isMobile ? 9 : isTablet ? 10 : 11 },
              color: "#fafafa",
              callback: (v) => "₦" + v,
            },
            grid: { color: "#fafafa22" },
          },
          y: {
            ticks: {
              font: { size: isMobile ? 9 : isTablet ? 10 : 11 },
              color: "#fafafa",
            },
            grid: { display: false },
          },
        },
      },
    }),
    [breakpoint],
  );

  return (
    <div className="section">
      <SectionTitle>Spending by Category</SectionTitle>
      <div className="chart-wrap chart-wrap--catbar">
        <canvas ref={ref} />
      </div>
    </div>
  );
}

function DoughnutChart({ title, labels, values, colors }) {
  const ref = useRef();

  useChart(
    ref,
    () => ({
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors.slice(0, labels.length),
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => ` ₦${ctx.parsed}` } },
        },
        cutout: "60%",
      },
    }),
    [],
  );

  return (
    <div className="section">
      <SectionTitle>{title}</SectionTitle>
      <Legend
        items={labels.map((l, i) => `${l} ₦${values[i]}`)}
        colors={colors}
      />
      <div className="chart-wrap chart-wrap--donut">
        <canvas ref={ref} />
      </div>
    </div>
  );
}

export default function Analytics() {
  const breakpoint = useBreakpoint();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  const catTotals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      catTotals[t.category] = (catTotals[t.category] || 0) + Math.abs(t.amount);
    });
  const expCatLabels = Object.keys(catTotals).sort(
    (a, b) => catTotals[b] - catTotals[a],
  );
  const expCatVals = expCatLabels.map((c) => catTotals[c]);

  const incCats = {};
  transactions
    .filter((t) => t.type === "income")
    .forEach((t) => {
      incCats[t.category] = (incCats[t.category] || 0) + t.amount;
    });
  const incLabels = Object.keys(incCats);
  const incVals = incLabels.map((c) => incCats[c]);

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        <MetricCard
          label="Total Income"
          value={`₦${totalIncome.toLocaleString()}`}
          color="#1D9E75"
        />
        <MetricCard
          label="Total Expenses"
          value={`₦${totalExpenses.toLocaleString()}`}
          color="#D85A30"
        />
        <MetricCard
          label="Net Balance"
          value={`₦${netBalance.toLocaleString()}`}
          color="#1D9E75"
        />
        <MetricCard label="Transactions" value={transactions.length} />
      </div>

      <DailyChart breakpoint={breakpoint} />
      <CategoryBarChart breakpoint={breakpoint} />

      <div className="doughnuts-grid">
        <DoughnutChart
          title="Expense Breakdown"
          labels={expCatLabels}
          values={expCatVals}
          colors={BAR_COLORS}
        />
        <DoughnutChart
          title="Income Sources"
          labels={incLabels}
          values={incVals}
          colors={INC_COLORS}
        />
      </div>
    </div>
  );
}
