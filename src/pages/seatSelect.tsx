import {Application, Graphics} from 'pixi.js';
import React, {useEffect, useState} from "react";

import {SeatMap} from '../seatmap.js';

const seatSelect = () => {
  useEffect(() => {
    (async () => {
      const canvas = document.getElementById('canvas');
      const mouse = {x: null, y: null};
      canvas.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY - (canvas?.getBoundingClientRect().y || 0);
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

      app.stage.addEventListener('click', () => {
        const seat = seatMap.handleClick(mouse.x, mouse.y);
        if (seat) {
          setSeat(String.fromCharCode(seat.column + 65) + (seat.row + 1));
        }
      });

      app.ticker.add(() => {
        g.clear().removeChildren();
        seatMap.draw(g, mouse);
      });
    })();
  }, []);

  const [seat, setSeat] = useState('');
  const pClass = 'w-43 p-3 text-white font-semibold text-xl';

  return (
    <div className="flex flex-col justify-start items-center p-8 md:justify-center md:items-center bg-gradient-to-b from-sky-300 to-sky-400 min-h-screen">
      <h1 className="font-semibold text-xl text-white my-4">Please Choose your Seat</h1>
      <canvas id="canvas">
        {/* seat map */}
      </canvas>
      {
        seat
          ? <p className={pClass}>Selected seat: {seat}</p>
          : <p className={pClass}>Selected seat: <span style={{fontStyle: 'italic'}}>none</span></p>
      }
      <button className="w-43 p-3 rounded-xl bg-[#195770] text-white font-semibold hover:bg-[#154153] my-4">
        <p>Confirm Choice</p>
      </button>
    </div>
  )
}

export default seatSelect