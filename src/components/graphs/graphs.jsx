import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import "./style/graphs.css";

export const Graphs = ({ objectValues, title }) => {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: 200,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        margin: "1rem",
      }}
    >
      <strong>{title}</strong>
      <ResponsiveContainer width={100} height="100%">
        <PieChart width={800} height={250} style={{ fontSize: 12 }}>
          <Pie
            data={objectValues}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={50}
            fill="#047cf8"
            dataKey="value"
          >
            {objectValues.map((entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Pie>
          <Tooltip
            itemStyle={{ color: "#fff", fontSize: 11 }}
            contentStyle={{ backgroundColor: "#009c86", borderRadius: 10 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
