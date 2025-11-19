// src/components/PhotoStars.jsx
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";

export default function PhotoStars({ items }) {
  const wrapperRef = useRef(null);
  const modalRef = useRef(null);
  const [openItem, setOpenItem] = useState(null);

  // animación flotado + parpadeo
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const dots = gsap.utils.toArray(".photo-dot");

      // aparición inicial
      gsap.from(dots, {
        opacity: 0,
        scale: 0.4,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      });

      // flotado suave + parpadeo
      dots.forEach((dot) => {
        // movimiento
        gsap.to(dot, {
          y: "+=12",
          x: "+=6",
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 2),
        });

        // parpadeo
        gsap.to(dot, {
          opacity: () => gsap.utils.random(0.4, 1),
          duration: gsap.utils.random(1.5, 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // animación del modal
  useLayoutEffect(() => {
    if (!openItem || !modalRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.35,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [openItem]);

  return (
    <>
      {/* contenedor de puntitos */}
      <div ref={wrapperRef} className="photo-stars-wrapper">
        {items.map((item, i) => (
          <button
            key={i}
            className="photo-dot"
            style={{
              top: `${item.y}%`,
              left: `${item.x}%`,
            }}
            onClick={() => setOpenItem(item)}
          >
            <span className="photo-dot-hit" />
          </button>
        ))}
      </div>

      {/* modal */}
      {openItem && (
        <div
          className="photo-modal-backdrop"
          onClick={() => setOpenItem(null)}
        >
          <div
            className="photo-modal-content"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={openItem.src}
              alt={openItem.label}
              className="photo-modal-img"
            />
            <p className="photo-modal-label">{openItem.label}</p>

            <button
              className="photo-modal-close"
              onClick={() => setOpenItem(null)}
            >
              Cerrar ✨
            </button>
          </div>
        </div>
      )}
    </>
  );
}
