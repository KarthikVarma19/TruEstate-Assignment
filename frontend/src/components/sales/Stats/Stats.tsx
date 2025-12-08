import StatsCard from "./StatsCard";

const Stats: React.FC = () => {
  return (
    <div className="flex flex-wrap stats-bar">
      <StatsCard title="Total units sold" value={10} tooltip="Total Quantity Sold" />
      <StatsCard title="Total Amount" value="₹89,000" tooltip="Total Sales Amount" />
      <StatsCard title="Total Discount" value="₹15,000" tooltip="Total Discount Amount" />
    </div>
  );
};

export default Stats;
