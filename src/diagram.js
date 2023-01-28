import '@fontsource/poppins';
import {Application, Graphics, Text} from 'pixi.js';
import {testSeatingChart} from './seatmap.js';

/**
 * The position of the mouse, relative to the upper-left corner of the page.
 */
const mouse = {x: 0, y: 0};
window.addEventListener('mousemove', e => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

const app = new Application({
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundColor: 0,
	antialias: true,
	view: document.getElementById('canvas'),
	resizeTo: document.getElementById('canvas'),
});

const seatMap = testSeatingChart();
const g = new Graphics();
app.stage.addChild(g);


app.ticker.add(() => {
	g.clear()
		.removeChildren();
	seatMap.draw(g, mouse);
});

export default app;
