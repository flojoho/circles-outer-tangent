import Vector from "./vector";

const fps = 60;

class Circle {
  position: Vector;
  radius: number;
  
  constructor(position: Vector, radius: number) {
    this.position = position;
    this.radius = radius;
  }
}

class Point {
  x: number;
  y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

let x = 100;
let y = 100;
let vx = 1;
let vy = 1;

const startAnimation = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')!;

  const loop = () => {
    x += vx;
    y += vy;


    
    const circle1 = new Circle(new Vector(300, 300), 150);
    const circle2 = new Circle(new Vector(x, y), 100);
    const circles = [
      circle1,
      circle2
    ];

    if(circle2.position.x >= canvas.width - circle2.radius) vx = -vx;
    if(circle2.position.y >= canvas.height - circle2.radius) vy = -vy;
    if(circle2.position.x <= circle2.radius) vx = -vx;
    if(circle2.position.y <= circle2.radius) vy = -vy;




    const d = circle1.position.to(circle2.position);
    const dSquared = d.lengthSquared();
    const radiusDifference = circle1.radius - circle2.radius;
    const t = Math.sqrt(dSquared - radiusDifference * radiusDifference)

    const offset = new Vector(
      circle1.radius/dSquared * (radiusDifference*d.x - d.y*t),
      circle1.radius/dSquared * (radiusDifference*d.y + d.x*t)
    );
    const tangentPoint1 = circle1.position.plus(offset);
    const tangentPoint2 = circle2.position.plus(offset.times(circle2.radius/circle1.radius));
    const points = [
      tangentPoint1,
      tangentPoint2,
      circle1.position,
      circle2.position
    ];
    console.log(offset)
    
    
    
    
    
    const renderedPoints = points.map(point => {
      return new Point(
        point.x,
        canvas.height - point.y
      )
    });
    const renderedCircles = circles.map(circle => {
      return new Circle(
        new Vector(
          circle.position.x,
          canvas.height - circle.position.y
        ),
        circle.radius
      )
    });
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(const circle of renderedCircles) {
      const { position, radius } = circle;
      let { x, y } = position;

      ctx.fillStyle = 'hsla(0, 0%, 100%, 0.2)';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(renderedPoints[0].x, renderedPoints[0].y);
    ctx.lineTo(renderedPoints[1].x, renderedPoints[1].y);
    ctx.stroke();

    for(const point of renderedPoints) {
      let { x, y } = point;
      const pointRadius = 5;

      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  setInterval(loop, 1000/fps);

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  resize();

  return {
    destroy() {
      observer.disconnect();
    }
  };
};

export default startAnimation;
