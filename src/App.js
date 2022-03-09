import React, { useEffect, useRef } from "react";
import "./index.css";
import gsap from "gsap";

const CARDS = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1519307212971-dd9561667ffb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    title: "Love",
    subtitle: "Счастье любит тишину, но шепотом же можно"
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1541233174-d4ec9375167a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    title: "Love",
    subtitle: "Из всех ладоней в мире свое стальное сердце в твои я отдаю"
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1529305068150-201f3ded72c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    title: "Love",
    subtitle: "Моя боль в твоем сердце"
  }
];

const MediaCard = ({ data: { subtitle, title, imageUrl: src } }) => {
  const cardRef = useRef(null);
  const update = ({ x }) => {
    const bounds = cardRef.current.getBoundingClientRect();
    const center = bounds.left + bounds.width / 2;
    const newX = gsap.utils.mapRange(
      center - window.innerWidth,
      center + window.innerWidth,
      -100,
      100,
      x
    );
    gsap.set(cardRef.current, { "--x": newX });
  };
  useEffect(() => {
    window.addEventListener("pointermove", update);
    return () => {
      window.removeEventListener("pointermove", update);
    };
  }, []);
  return (
    <a ref={cardRef} className="media-card">
      <span className="media-card__img-container">
        <img src={src} alt={title} className="media-card__img" />
      </span>
      <span className="media-card__title">{title}</span>
      <span className="media-card__subtitle">{subtitle}</span>
    </a>
  );
};

export default function App() {
  return (
    <>
      {CARDS.map((card) => (
        <MediaCard key={card.id} data={card} />
      ))}
    </>
  );
}

