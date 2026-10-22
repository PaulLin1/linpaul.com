
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface PositionedImage {
  image: string;
  top: number;
  left: number;
  fadeInDuration: number;
  fadeOutDuration: number;
  visibleDuration: number;
  delay: number;
}

export default function ImageRenderer({ images }: { images: string[] }) {
  const [positions, setPositions] = useState<PositionedImage[]>([]);

  useEffect(() => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);

    setPositions(
      shuffled.slice(0, 15).map((image) => ({
        image,
        top: Math.random() * 650,
        left: Math.random() * 100,
        fadeInDuration: 0.5 + Math.random() * 3,
        fadeOutDuration: 0.5 + Math.random() * 3,
        visibleDuration: 2 + Math.random() * 10,
        delay: Math.random() * 5,
      })),
    );
  }, [images]);

  return (
    <div className="relative h-[800px] w-full overflow-hidden">
      {positions.map((item, i) => {
        const total =
          item.fadeInDuration +
          item.visibleDuration +
          item.fadeOutDuration;

        return (
          <motion.div
            key={item.image}
            className="absolute"
            style={{
              top: `${item.top}px`,
              left: `${item.left}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: total,
              delay: item.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              times: [
                0,
                item.fadeInDuration / total,
                (item.fadeInDuration + item.visibleDuration) / total,
                1,
              ],
            }}
          >
            <Image
              src={`/backgroundImages/${item.image}`}
              alt={`Project screenshot ${i + 1}`}
              width={250}
              height={180}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
