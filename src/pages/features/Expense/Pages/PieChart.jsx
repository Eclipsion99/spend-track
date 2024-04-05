import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const PieChart = ({ chartData }) => {
  const options = {
    plugins: {
      datalabels: {
        color: 'white', // Customize label color
        formatter: (value, ctx) => {
          return ctx.chart.data.labels[ctx.dataIndex] + ': ' + value; // Customize label format
        }
      }
    }
  };

  return (
    <Doughnut data={chartData} options={options} />
  );
};

export default PieChart;
