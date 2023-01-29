import { Application, Graphics } from "pixi.js";
import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { SeatMap } from "../seatmap.js";
import { toSeatStr } from '../utils.js';

const seatSelect = () => {
  useEffect(() => {
    (async () => {
      const canvas = document.getElementById("canvas");
      const mouse = { x: null, y: null };
      const pointer = { x: null, y: null };
      canvas.addEventListener("mousemove", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY - (canvas?.getBoundingClientRect().y || 0);
      });
      canvas.addEventListener("pointermove", e => {
        pointer.x = e.clientX;
        pointer.y = e.clientY - (canvas?.getBoundingClientRect().y || 0);
      });
      const app = new Application({
        width: window.innerWidth,
        antialias: true,
        backgroundAlpha: 0,
        view: canvas,
        resizeTo: canvas,
      });

      const g = new Graphics();
      app.stage.addChild(g);
      app.stage.interactive = true;

      const seatMap = new SeatMap();
      await document.fonts.ready;
      seatMap.setupText(g);

      app.stage.addEventListener("click", () => {
        const seat = seatMap.handleClick(mouse.x, mouse.y);
        if (seat) {
          setSeat(toSeatStr(seat));
        }
      });
      app.stage.addEventListener("touchend", () => {
        const seat = seatMap.handleClick(pointer.x, pointer.y);
        if (seat) {
          setSeat(toSeatStr(seat));
        }
      });

      app.ticker.add(() => {
        g.clear().removeChildren();
        seatMap.draw(g, mouse);
      });
      app.ticker.add(() => {
        g.clear().removeChildren();
        seatMap.draw(g, pointer);
      });
    })();
  }, []);

  const [seat, setSeat] = useState("");
  const pClass = "w-43 p-3 text-[#195770] font-semibold text-xl animated animatedFadeInUp fadeInUp mt-4";

  const handleSubmit = e => {
    e.preventDefault();
    window.location.href = `/result?exact=${seat}`;
  };

  return (
    <div className="flex flex-col justify-start items-center md:justify-center md:items-center bg-gradient-to-b from-sky-300 to-sky-400 min-h-screen w-full">
      <h1 className="font-bold text-xl text-[#195770] mt-4 mb-2 animated animatedFadeInUp fadeInUp">Please select a seat.</h1>
      <p className="text-sm animated animatedFadeInUp fadeInUp mb-2">Hold to select seat on mobile.</p>
      <div className="animated animatedFadeInUp fadeInUp">
        <canvas id="canvas" className=" w-full pb-1 h-64 md:h-full">
        </canvas>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mt-2 items-center justify-center font-semibold text-[#195770] animated animatedFadeInUp fadeInUp">
        <p>Scroll</p>
        <span className="animate-bounce font-extrabold">{<FaArrowDown />}</span>
      </div>
      {
        seat
          ? <p className={pClass}>Selected seat: {seat}</p>
          : <p className={pClass}>Selected seat: <span style={{ fontStyle: "italic" }}>none</span></p>
      }
      <button className="w-43 p-3 rounded-xl bg-[#195770] text-white font-semibold hover:bg-[#154153] my-4 animated animatedFadeInUp fadeInUp" onClick={handleSubmit}>
        <p>Confirm</p>
      </button>
    </div>
  )
}

export default seatSelect