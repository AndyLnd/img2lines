import { renderLines, clear } from "./render";
import { getGreyValues, squareDiffSum } from "./calc";


export const nextNodeAll = (
  nodeCount: number,
  currentNode: number
): number[][] =>
  Array(nodeCount - 1)
    .fill(0)
    .map((_, i) => [(currentNode + i + 1) % nodeCount]);

export function getBestVariant(
  nodeCount: number,
  nodes: number[],
  varis: number[][],
  varCtx: CanvasRenderingContext2D,
  imgValues: Uint8ClampedArray
) {
  const variDiffs = varis.map((vari) => {
    clear(varCtx);
    renderLines(varCtx, nodeCount, [...nodes, ...vari], 0.2);
    const varValues = getGreyValues(varCtx);
    return squareDiffSum(varValues, imgValues);
  });
  const best = variDiffs.reduce(
    (min, curr, i) => (curr < variDiffs[min] ? i : min),
    0
  );
  return varis[best];
}
