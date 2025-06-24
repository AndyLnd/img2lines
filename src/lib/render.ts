const nodePosition = (index: number, count: number, r: number) => {
  const rad = (index / count) * Math.PI * 2;
  return {
    x: Math.sin(rad) * r,
    y: -Math.cos(rad) * r,
  };
};

export function clear(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function renderNodes(ctx: CanvasRenderingContext2D, nodeCount: number) {
  const cx = ctx.canvas.width / 2;
  const cy = ctx.canvas.height / 2;
  const r = Math.min(cx, cy) - 10;
  ctx.fillStyle = "grey";
  for (let i = 0; i < nodeCount; i++) {
    const { x, y } = nodePosition(i, nodeCount, r);
    ctx.beginPath();
    ctx.arc(x + cx, y + cy, 2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
}

export function renderLines(
  ctx: CanvasRenderingContext2D,
  nodeCount: number,
  nodes: number[],
  lineWidth = 0.5
) {
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
