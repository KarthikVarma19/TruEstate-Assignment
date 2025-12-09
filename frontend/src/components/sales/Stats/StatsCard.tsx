import React from "react";
import { Tooltip } from "../../ui/Tooltip";
import { InfoCircle } from "iconsax-react";

interface IStatsCardProps {
  title: string;
  value: string | number;
  highlight?: boolean;
  tooltip?: string;
}

const StatsCard: React.FC<IStatsCardProps> = ({
  title,
  value,
  highlight = true,
  tooltip,
}) => {
  return (
    <div className="flex flex-col justify-between stats-card">
      {/* Top: title + info icon */}
      <div className="flex items-center gap-[8px] stats-card-title-container">
        <span className="stats-card-title">{title}</span>
        <div className="ml-auto">
          <Tooltip content={tooltip}>
            <InfoCircle size={16} color="#5584FF" variant="Linear" />
          </Tooltip>
        </div>
      </div>

      {/* Bottom: value */}
      <div className="flex items-center">
        <span className={`${highlight ? "font-semibold text-[14px]" : "font-medium text-[16px]"} text-[#101017] whitespace-nowrap`}>
          {value.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;