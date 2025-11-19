import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const NUM_STARS = 35;

export default function StarBackground() {
  const wrapperRef = useRef(null);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const stars = gsap.utils.toArray(".bg-star");

    stars.forEach((star) => {
      // cada estrella decide si flota o no
      if (Math.random() > 0.4) {
        gsap.to(star, {
          y: "+=" + gsap.utils.random(2, 6),
          x: "+=" + gsap.utils.random(1, 4),
          duration: gsap.utils.random(3, 7),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 3),
        });
      }

      

      // cada estrella decide si parpadea o no
      if (Math.random() > 0.25) {
        gsap.to(star, {
          opacity: () => gsap.utils.random(0.4, 1),
          duration: gsap.utils.random(2, 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 2),
        });
      }
    });
  }, wrapperRef);

  return () => ctx.revert();
}, []);


  const stars = Array.from({ length: NUM_STARS });

  return (
    <div ref={wrapperRef} className="star-bg-wrapper">
{stars.map((_, i) => {
  const top = Math.random() * 100;
  const left = Math.random() * 100;

  return (
    <span
      key={i}
      className="bg-star"
      data-x={left}
      data-y={top}
      style={{
        top: `${top}%`,
        left: `${left}%`,
      }}
    />
  );
})}

    </div>
  );
}
