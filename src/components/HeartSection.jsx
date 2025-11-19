import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeartSection() {
  const sectionRef = useRef(null);
  const heartRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 🔹 Latido infinito del corazón
      gsap.to(heartRef.current, {
        scale: 1.1,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 🔹 Entrada del texto
      gsap.from(textRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });

      // 🔹 ScrollTrigger para morph de estrellas
      const trigger = sectionRef.current;

      ScrollTrigger.create({
        trigger,
        start: "top 80%",     // cuando la sección entra casi al viewport
        end: "bottom 30%",    // mientras la sección está en pantalla
        onEnter: () => morphStarsToHeart(),
        onEnterBack: () => morphStarsToHeart(),
        onLeave: () => morphStarsToOriginal(),
        onLeaveBack: () => morphStarsToOriginal(),
      });

      function morphStarsToHeart() {
        const stars = gsap.utils.toArray(".bg-star");
        if (!stars.length) return;

        const heartPoints = generateHeartPoints(stars.length);

        stars.forEach((star, i) => {
          const target = heartPoints[i % heartPoints.length];

          gsap.to(star, {
            top: `${target.y}%`,
            left: `${target.x}%`,
            duration: 1.8,
            ease: "power3.inOut",
            delay: i * 0.005,
          });
        });
      }

      function morphStarsToOriginal() {
        const stars = gsap.utils.toArray(".bg-star");
        if (!stars.length) return;

        stars.forEach((star, i) => {
          const origX = star.getAttribute("data-x");
          const origY = star.getAttribute("data-y");

          if (origX == null || origY == null) return;

          gsap.to(star, {
            top: `${origY}%`,
            left: `${origX}%`,
            duration: 1.4,
            ease: "power2.inOut",
            delay: i * 0.003,
          });
        });
      }

      // genera puntos distribuidos en forma de corazón ❤️
      function generateHeartPoints(count) {
        const points = [];

        for (let i = 0; i < count; i++) {
          const t = (i / count) * Math.PI * 2;

          // ecuación paramétrica del corazón
          const x = 50 + 30 * Math.pow(Math.sin(t), 3);
          const y =
            50 -
            (15 * Math.cos(t) -
              5 * Math.cos(2 * t) -
              2 * Math.cos(3 * t) -
              Math.cos(4 * t));

          points.push({ x, y });
        }

        return points;
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="heart-section">
      <div ref={textRef} className="heart-text">
        <h2>Te amo mamol 💕</h2>
        <p>
          Gracias por siempre hacerme los mejores matecitos, te voy a hacer algo mejor aun otro dia i lov iu
        </p>
      </div>
    </div>
  );
}
