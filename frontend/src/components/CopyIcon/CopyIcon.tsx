import { useState } from "react";
import { Copy } from "iconsax-react";

interface Props {
  value: string;
  onCopied?: () => void;
}

const CopyIcon: React.FC<Props> = ({ value, onCopied }) => {
  const [show, setShow] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setShow(true);
    onCopied?.();
    setTimeout(() => setShow(false), 1200);
  };

  return (
    <div className="relative flex items-center justify-center">
      <button type="button" onClick={handleCopy} className="p-1 rounded-full hover:bg-[#F1F2F8]">
        <Copy size={16} color="#515162" variant="Linear" className="cursor-pointer" />
      </button>

      {show && <span className="absolute -top-7 bg-black text-white text-[10px] px-2 py-[2px] rounded shadow animate-fade-in-out">Copied!</span>}
    </div>
  );
};

export default CopyIcon;
