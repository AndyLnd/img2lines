interface RenderProps {
  canvas: HTMLCanvasElement;
  nodeCount: number;
  nodes: number[];
  lineWidth: number;
}

function renderLines({
  data: { canvas, nodeCount, nodes, lineWidth },
}: {
  data: RenderProps;
}) {
  const nodePosition = (index: number, count: number, r: number) => {
    const rad = (index / count) * Math.PI * 2;
    return {
      x: Math.sin(rad) * r,
      y: -Math.cos(rad) * r,
    };
  };
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const cx = ctx.canvas.width / 2;
  const cy = ctx.canvas.height / 2;
  const r = Math.min(cx, cy) - 10;
  ctx.lineJoin = "round";
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  const { x, y } = nodePosition(nodes[0], nodeCount, r);
  ctx.moveTo(x + cx, y + cy);
  for (let i = 1; i < nodes.length; i++) {
    const { x, y } = nodePosition(nodes[i], nodeCount, r);
    ctx.lineTo(x + cx, y + cy);
  }
  ctx.stroke();
}
const workFn = renderLines.toString().replace('"use strict";', "");
const workerString = `
  self.onmessage = ${workFn}`;
const workerBlob = new Blob([workerString], {
  type: "application/javascript; charset=utf-8",
});
const workerBlobURL = window.URL.createObjectURL(workerBlob);
const worker = new Worker(workerBlobURL);

workerBlob.text().then(console.log);

export async function render(
  canvas: OffscreenCanvas,
  nodeCount: number,
  nodes: number[],
  lineWidth: number
) {
  worker.postMessage({ canvas, nodeCount, nodes, lineWidth }, [canvas]);
}
