import { useSales } from "../../../context/salesContext";
import StatsCard from "./StatsCard";
import { formatCurrency } from "../../../utils/formatCurrency";

const Stats: React.FC = () => {
  const { stats } = useSales(); 
  console.debug("SalesProvider - updated stats:", stats);

  return (
    <div className="flex flex-wrap stats-bar">
      <StatsCard title="Total units sold" value={stats.totalUnitsSold} tooltip="Total Quantity Sold" />
      <StatsCard title="Total Amount" value={formatCurrency(stats.totalAmount)} tooltip="Total Sales Amount" />
      <StatsCard title="Total Discount" value={formatCurrency(stats.totalDiscount)} tooltip="Total Discount Amount" />
    </div>
  );
};

export default Stats;
