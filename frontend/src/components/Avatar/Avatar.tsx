import React from "react";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  rounded?: boolean;
  className?: string;
  onClickHandler?: () => void;     
  ariaLabel?: string;         
}

const sizeMap: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-14 h-14 text-lg",
};

const getInitials = (fullName: string | undefined) => {
  if (!fullName) return "";
  const parts = fullName.trim().split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts[1]?.[0] ?? "";
  return (first + last).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = "md",
  rounded = true,
  className = "",
  onClickHandler,
  ariaLabel,
}) => {
  const initials = getInitials(name);

  const baseClasses = `
    flex items-center justify-center 
    bg-white text-gray-700 font-semibold 
    overflow-hidden
    ${sizeMap[size]}
    ${rounded ? "rounded-full" : "rounded-md"}
    ${className}
  `;

  if (onClickHandler) {
    return (
      <button
        type="button"
        onClick={onClickHandler}
        aria-label={ariaLabel ?? name ?? "Avatar"}
        className={baseClasses}
      >
        {src ? (
          <img src={src} alt={name ?? "Avatar"} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </button>
    );
  }

  return (

    <div className={baseClasses}>
      {src ? (
        <img src={src} alt={name ?? "Avatar"} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}  
    </div>
    
  );
};

export default Avatar;
