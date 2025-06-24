<script lang="ts">
  import { allOtherNodes, getBestFit } from "$lib";
  import { getGreyValues, maxContrast } from "$lib/calc";
  import { clear, renderLines } from "$lib/render";
  import { createCanvas, imgToCanvas } from "$lib/util";

  let inputCanvas: HTMLCanvasElement;
  let outputCanvas: HTMLCanvasElement;
  let progressDiv: HTMLDivElement;
  let files: FileList;

  const size = 200;
  const lineCount = 1000;
  const nodeCount = 128;
  const animationStep = 20;

  async function start() {
    const file = files[0];
    const imgCtx = await imgToCanvas(file, size);
    const inputCtx = inputCanvas.getContext("2d")!;
    clear(inputCtx);
    inputCtx.drawImage(imgCtx.canvas, 0, 0);
    const imgValues = maxContrast(getGreyValues(imgCtx));
    const varCtx = createCanvas(size);
    const outputCtx = outputCanvas.getContext("2d")!;
    const nodes = [0];
    while (nodes.length < lineCount) {
      const currentNode = (nodes as any).at(-1);
      const otherNodes = allOtherNodes(nodeCount, nodes, currentNode);
      const nextNode = getBestFit(
        nodeCount,
        nodes,
        otherNodes,
        varCtx,
        imgValues
      );
      nodes.push(nextNode);

      if (nodes.length % animationStep === 0) {
        await new Promise(requestAnimationFrame);
        progressDiv.textContent = `${nodes.length} / ${lineCount}`;
        clear(outputCtx);
        renderLines(outputCtx, nodeCount, nodes, 1);
      }
    }

    progressDiv.textContent = `done`;
    clear(outputCtx);
    renderLines(outputCtx, nodeCount, nodes, 1);
  }
</script>

<div class="p-8 flex flex-col gap-4">
  <div>
    <input
      class="bg-emerald-200 border border-emerald-800 rounded p-4 inline"
      type="file"
      bind:files
    />
  </div>
  <div>
    <button
      class="bg-emerald-200 p-2 border border-emerald-800 rounded min-w-2xs disabled:opacity-50"
      on:click={start}
      disabled={files?.length < 1}>go</button
    >
  </div>
  <div bind:this={progressDiv}></div>
  <div class="flex items-center">
    <canvas bind:this={inputCanvas} width={size} height={size}></canvas>
    <canvas bind:this={outputCanvas} width={size * 3} height={size * 3}
    ></canvas>
  </div>
</div>
