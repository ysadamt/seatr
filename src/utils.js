/**
 * Linearly interpolate a value from `n1` to `n2` by a constant `t`.
 * @param {number} n1
 * @param {number} n2
 * @param {number} t
 */
export function lerp(n1, n2, t) {
	return t * (n2 - n1) + n1;
}

/**
 * Linearly interpolate a vector from `c1` to `c2` by a constant `t`.
 * @param {{r: number, g: number, b: number}} c1
 * @param {{r: number, g: number, b: number}} c2
 * @param {number} t
 */
export function lerpColor(c1, c2, t) {
	return {
		r: lerp(c1.r, c2.r, t),
		g: lerp(c1.g, c2.g, t),
		b: lerp(c1.b, c2.b, t),
	};
}

/**
 * Convert an RGB object to its hex equivalent.
 * @param {{r: number, g: number, b: number}} color
 */
export function rgbToHex(color) {
	return color.r << 16 | color.g << 8 | color.b;
}

/**
 * Convert a hex number to an RGB object.
 * @param {number} hex
 */
export function hexToRGB(hex) {
	return {
		r: hex >> 16 & 0xff,
		g: hex >> 8 & 0xff,
		b: hex & 0xff,
	};
}
