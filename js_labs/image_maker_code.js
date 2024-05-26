// // Get the canvas element and set up the context
// const canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;
// const context = canvas.getContext('2d') as CanvasRenderingContext2D;
var svgImage = document.getElementById('svgImage');
var colorInput = document.getElementById('colorPicker');
var undoButton = document.getElementById('undoButton');
var rectColor = 'red';
// Set the canvas size to match the window size
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
var x_down = 0;
var y_down = 0;
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, w, h, c) {
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
    Rectangle.prototype.getSvgString = function () {
        return "<rect x=\"".concat(this.x, "\" y=\"").concat(this.y, "\" width=\"").concat(this.w, "\" height=\"").concat(this.h, "\" fill=\"").concat(this.color, "\"></rect>\n");
    };
    Rectangle.prototype.isInside = function (x, y) {
        return x >= this.x && y >= this.y && x <= this.x + this.w && y <= this.y + this.w;
    };
    return Rectangle;
}());
var all_rectangles = [];
/*svg_text = f'<svg width="{obrazek.width}" height="{obrazek.height}" viewBox="0 0 {obrazek.width} {obrazek.height}" version="1.1" xmlns="http://www.w3.org/2000/svg">\n'
    for p in prostkaty:
        svg_text += f'<rect x="{p.x}" y="{p.y}" width="{p.width}" height="{p.height}" fill="{p.color}"></rect>\n'
    svg_text += '</svg>'*/
function generate_image() {
    var result = "";
    for (var _i = 0, all_rectangles_1 = all_rectangles; _i < all_rectangles_1.length; _i++) {
        var rectangle = all_rectangles_1[_i];
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
svgImage.addEventListener('click', function (event) {
    var rect = svgImage.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    // drawCircle(x, y);
});
// Event listener for mouse down
svgImage.addEventListener('mousedown', function (event) {
    var rect = svgImage.getBoundingClientRect();
    x_down = event.clientX - rect.left;
    y_down = event.clientY - rect.top;
});
// Event listener for mouse up
svgImage.addEventListener('mouseup', function (event) {
    var rect = svgImage.getBoundingClientRect();
    var x_up = event.clientX - rect.left;
    var y_up = event.clientY - rect.top;
    // drawRectangle(x_down, y_down, x_up, y_up);
    var new_rect = new Rectangle(x_down, y_down, x_up - x_down, y_up - y_down, rectColor);
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
colorInput.addEventListener('input', function () {
    rectColor = colorInput.value;
});
undoButton.addEventListener('click', function () {
    all_rectangles.pop();
    generate_image();
});
