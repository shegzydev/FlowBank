import { useContext, useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import "./Analytics.css";
import TransactionContext from "../../context/TransactionContext";

Chart.register(...registerables);

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

function DailyChart({ breakpoint, transactions }) {
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

function CategoryBarChart({ breakpoint, transactions }) {
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
  const { transactions } = useContext(TransactionContext);

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

      <DailyChart breakpoint={breakpoint} transactions={transactions} />
      <CategoryBarChart breakpoint={breakpoint} transactions={transactions} />

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
