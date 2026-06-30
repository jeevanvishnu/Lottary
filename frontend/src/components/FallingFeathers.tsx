import { useEffect, useState } from "react";
import feather01 from "@/assets/feather01.png";
import feather02 from "@/assets/feather02.png";

export const FallingFeathers = () => {
  const [feathers, setFeathers] = useState<any[]>([]);

  useEffect(() => {
    // Generate feathers with random properties
    const featherCount = 18;
    const newFeathers = Array.from({ length: featherCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${12 + Math.random() * 18}s`,
      animationDelay: `-${Math.random() * 20}s`,
      size: `${35 + Math.random() * 45}px`,
      image: Math.random() > 0.5 ? feather01 : feather02,
      swayDuration: `${3 + Math.random() * 5}s`,
      rotationDuration: `${8 + Math.random() * 12}s`,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));
    setFeathers(newFeathers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {feathers.map((f) => (
        <div
          key={f.id}
          className="absolute top-[-10%] animate-fall"
          style={{
            left: f.left,
            animationDuration: f.animationDuration,
            animationDelay: f.animationDelay,
          }}
        >
          <div
            className="animate-sway"
            style={{
              animationDuration: f.swayDuration,
              animationDelay: f.animationDelay,
            }}
          >
            <img
              src={f.image}
              alt="feather"
              className="object-contain"
              style={{
                width: f.size,
                height: f.size,
                mixBlendMode: 'screen',
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
