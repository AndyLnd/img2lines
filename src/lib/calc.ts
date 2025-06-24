export function getGreyValues(
  ctx: CanvasRenderingContext2D
): Uint8ClampedArray {
  const { width, height } = ctx.canvas;
  const iData = ctx.getImageData(0, 0, width, height).data;
  const values = new Uint8ClampedArray(iData.length / 4);
  for (let i = 0; i < iData.length; i += 4) {
    const r = iData[i];
    const g = iData[i + 1];
    const b = iData[i + 2];
    values[i / 4] = r * 0.3 + g * 0.6 + b * 0.1;
  }
  return values;
}

export function squareDiffSum(
  values1: Uint8ClampedArray,
  values2: Uint8ClampedArray
): number {
  const length = Math.min(values1.length, values2.length);
  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += (values1[i] - values2[i]) ** 2;
  }
  return sum;
}

export function maxContrast(values: Uint8ClampedArray): Uint8ClampedArray {
  const min = values.reduce((m, v) => (v < m ? v : m), values[0]);
  const max = values.reduce((m, v) => (v > m ? v : m), values[0]);
  const scale = 255 / (max - min);
  return values.map((v) => (v - min) * scale);
}
