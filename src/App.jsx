import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import "./App.css";
import StarBackground from "./components/StarBackground";
import PhotoStars from "./components/PhotoStars";
import HeartSection from "./components/HeartSection";

function App() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada general
      gsap.from(".section", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="app-root">
      <StarBackground />

      {/* Sección 1: Intro */}
      <section className="section section-intro">
        <div className="section-inner">
          <p className="intro-small">Para mi princesita</p>
          <h1 className="intro-title">
            Hola amorcito
          </h1>
          <p className="intro-text">
            Te hice esta pequeña galaxia para que tengas algunos recuerdos presentes y puedas verlas cuando quieras
          </p>
        </div>
      </section>

      {/* Sección 2: Estrellas con fotos */}
      <section className="section section-photos">
        <div className="section-inner">
          <h2 className="section-title">Te hice estrellitas</h2>
          <p className="section-subtitle">
            Cada estrellita es una fotito nuestra, son 7 por ahora (las amarillitas)
          </p>

<PhotoStars
  items={[
    { src: "/photos/1.jpg", label: "Nuestros primeros regalos", x: 25, y: 30 },
    { src: "/photos/2.jpg", label: "Aesthetics nosotros", x: 70, y: 50 },
    { src: "/photos/3.jpg", label: "Juntitos con mucho amor", x: 40, y: 75 },
    { src: "/photos/4.jpg", label: "Mi fotito favorita", x: 15, y: 55 },
    { src: "/photos/5.jpg", label: "Vos toda hermosa", x: 85, y: 25 },
    { src: "/photos/6.jpg", label: "Aura a sexo nosotros", x: 55, y: 15 },
    { src: "/photos/7.jpg", label: "Esta fotito me gusta mucho, salimos lindos", x: 10, y: 80 },
  ]}
/>
        </div>
      </section>

      {/* Sección 3: Corazón final */}
      <section className="section section-heart">
        <div className="section-inner">
          <HeartSection />
        </div>
      </section>
    </div>
  );
}

export default App;
