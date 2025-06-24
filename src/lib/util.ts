export function createCanvas(size: number): CanvasRenderingContext2D {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  return canvas.getContext("2d", { willReadFrequently: true })!;
}

function loadImage(imgFile: File): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = URL.createObjectURL(imgFile);
  });
}

export async function imgToCanvas(
  imgFile: File,
  size: number
): Promise<CanvasRenderingContext2D> {
  const ctx = createCanvas(size);
  const img = await loadImage(imgFile);
  ctx.drawImage(img, 0, 0);
  return ctx;
}
