type SvgInHtml = HTMLElement & SVGElement;

// // Get the canvas element and set up the context
// const canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;
// const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const svgImage = document.getElementById('svgImage') as SvgInHtml;
const colorInput = document.getElementById('colorPicker') as HTMLInputElement;
const undoButton = document.getElementById('undoButton') as HTMLInputElement;

let rectColor : string = 'red';

// Set the canvas size to match the window size
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

var x_down : number = 0;
var y_down : number = 0;

class Rectangle {
  private x: number;
  private y: number;
  private w: number;
  private h: number;
  private color: string;

  public constructor(x: number, y: number, w: number, h: number, c: string) {
    if (w < 0) {
      x = x + w;
      w = -w;
    }
    if (h < 0) {
      y = y + h;
      h = -h;
    }
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = c;
  }

  // public draw() {
  //   context.beginPath();
  //   context.rect(this.x, this.y, this.w, this.h);
  //   context.fillStyle = this.color;
  //   context.fill();
  //   context.closePath();
  // }

  public getSvgString() : string {
    return `<rect x="${this.x}" y="${this.y}" width="${this.w}" height="${this.h}" fill="${this.color}"></rect>\n`;
  }

  public isInside(x: number, y: number) {
    return x >= this.x && y >= this.y && x <= this.x + this.w && y <= this.y + this.w;
  }
}

var all_rectangles : Rectangle[] = [];

/*svg_text = f'<svg width="{obrazek.width}" height="{obrazek.height}" viewBox="0 0 {obrazek.width} {obrazek.height}" version="1.1" xmlns="http://www.w3.org/2000/svg">\n'
    for p in prostkaty:
        svg_text += f'<rect x="{p.x}" y="{p.y}" width="{p.width}" height="{p.height}" fill="{p.color}"></rect>\n'
    svg_text += '</svg>'*/

function generate_image() {
  let result : string = "";
  for (var rectangle of all_rectangles) {
    result = result + rectangle.getSvgString();
  }
  svgImage.innerHTML = result;
}

// function drawRectangle(x1: number, y1: number, x2: number, y2: number) {
//   context.beginPath();
//   context.rect(x1, y1, x2 - x1, y2 - y1);
//   context.fillStyle = 'green';
//   context.fill();
//   context.closePath();
// }

// Event listener for mouse click
svgImage.addEventListener('click', function(event: MouseEvent) {
    const rect = svgImage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // drawCircle(x, y);
});

// Event listener for mouse down
svgImage.addEventListener('mousedown', function(event: MouseEvent) {
  const rect = svgImage.getBoundingClientRect();
  x_down = event.clientX - rect.left;
  y_down = event.clientY - rect.top;
});

// Event listener for mouse up
svgImage.addEventListener('mouseup', function(event: MouseEvent) {
  const rect = svgImage.getBoundingClientRect();
  const x_up = event.clientX - rect.left;
  const y_up = event.clientY - rect.top;
  // drawRectangle(x_down, y_down, x_up, y_up);
  let new_rect = new Rectangle(x_down, y_down, x_up - x_down, y_up - y_down, rectColor);
  all_rectangles.push(new_rect);
  // new_rect.draw();
  generate_image();
});

// Adjust canvas size when window is resized
// window.addEventListener('resize', function() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// });

// Event listener for color input change
colorInput.addEventListener('input', function() {
  rectColor = colorInput.value;
});

undoButton.addEventListener('click', function() {
  all_rectangles.pop();
  generate_image();
});