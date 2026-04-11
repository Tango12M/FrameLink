import { useRef, useState } from "react";

const MagneticButton = ({ children, onClick, className }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.05;
    const y = (e.clientY - (top + height / 2)) * 0.05;
    setPosition({ x, y });
  };
  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`cursor-pointer w-full ${className}`}
    >
      <div
        className="transition-transform duration-100 ease-out w-full h-full"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {children}
      </div>
    </button>
  );
};

export default MagneticButton;
