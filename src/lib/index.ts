import { renderLines, clear } from "./render";
import { getGreyValues, squareDiffSum } from "./calc";

export function getConnections(nodes: number[], current: number): number[] {
  const connected = nodes.reduce(
    (cons: Set<number>, node: number, index: number) => {
      if (node !== current) {
        return cons;
      }
      nodes[index - 1] && cons.add(nodes[index - 1]);
      nodes[index + 1] && cons.add(nodes[index + 1]);
      return cons;
    },
    new Set([current])
  );
  return [...connected];
}

export const allOtherNodes = (
  nodeCount: number,
  nodes: number[],
  currentNode: number
): number[] => {
  const connections = getConnections(nodes, currentNode);
  const allNodes = Array(nodeCount)
    .fill(0)
    .map((_, i) => i);
  const filtered = allNodes.filter((n) => !connections.includes(n));

  if (filtered.length > 0) {
    return filtered;
  }

  return allNodes.filter((n) => n !== currentNode);
};
export function getBestFit(
  nodeCount: number,
  nodes: number[],
  varis: number[],
  varCtx: CanvasRenderingContext2D,
  imgValues: Uint8ClampedArray
) {
  const variDiffs = varis.map((vari) => {
    clear(varCtx);
    renderLines(varCtx, nodeCount, [...nodes, vari], 0.2);
    const varValues = getGreyValues(varCtx);
    return squareDiffSum(varValues, imgValues);
  });
  const best = variDiffs.reduce(
    (min, curr, i) => (curr < variDiffs[min] ? i : min),
    0
  );
  return varis[best];
}
