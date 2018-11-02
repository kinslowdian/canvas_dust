// DEBUG
var trace = function(msg){ console.log(msg); };

var canvas;
var brush;
var mouse;

var circleArray;
var timer = 0;

function pageLoad_init()
{
	trace("pageLoad_init();");

	circleArray = [];

	mouse_init();
	canvas_init();
	brush_init();

	// INIT
	animate();
}

function mouse_init()
{
	mouse = {};
	mouse.x = undefined;
	mouse.y = undefined;
}

function canvas_init()
{
	canvas = document.querySelector("#disp-canvas");
	// canvas.width = window.innerWidth;
	// canvas.height = window.innerHeight;

	canvas.width = screen.width;
	canvas.height = screen.height;

	canvas.addEventListener("mousemove", canvas_event, false);
	canvas.addEventListener("mousedown", canvas_event, false);
	canvas.addEventListener("mouseup", canvas_event, false);
}

function canvas_event(event)
{
	let etype = event.type;

	switch(etype)
	{
		case "mousemove":
		{
			mouse.x = event.x;
			mouse.y = event.y;

			timer = new Date();

			draw_engine(event);

			break;
		}

		case "mousedown":
		{
			// timer = new Date();

			// draw_engine(event);

			break;
		}

		case "mouseup":
		{

			timer = new Date();

			// let timePassed = (new Date() - timer) / 10;

			// if(timePassed > 100)
			// {
			// 	timePassed = 100;
			// }

			// let radius = timePassed;

			// timer = 0;

			// let x = event.x;
			// let y = event.y;
			// let vx = (Math.random() - 0.5) * 30;
			// let vy = (Math.random() - 0.5) * 30;

			// circleArray.push(new Circle(x, y, vx, vy, radius));

			// draw_engine(event);

			break;
		}

		default:
		{

		}
	}
}

function draw_engine(event)
{
			let timePassed = (new Date() - timer) / 10;

			if(timePassed > 100)
			{
				timePassed = 100;
			}

			// let radius = timePassed;

			let radius = 0.5;

			timer = 0;

			let x = event.x;
			let y = event.y;
			let vx = (Math.random() - 0.1) * 4;
			let vy = (Math.random() - 0.1) * 4;

			circleArray.push(new Circle(x, y, vx, vy, radius));
}


function brush_init()
{
	brush = canvas.getContext('2d');
}



function Circle(x, y, vx, vy, radius)
{
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.radius = radius;
	this.color = randColor();

	this.draw = function()
	{
		brush.beginPath();
		brush.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		brush.fillStyle = this.color;
		brush.fill();
	};

	this.update = function()
	{
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0)
		{
			this.vx = -this.vx;
		}

		if(this.y + this.radius > innerHeight || this.y - this.radius < 0)
		{
			this.vy = -this.vy;
		}

		this.x += this.vx / 10;
		this.y += this.vy / 10;

		this.draw();
	};
}

function animate()
{
	window.requestAnimationFrame(animate);

	brush.clearRect(0, 0, innerWidth, innerHeight);

	for(let i = 0; i < circleArray.length; i++)
	{
		circleArray[i].update();
	}
}


function randColor()
{
	let hexFormat = 'ABCDEF0123456789';
	let hexColor = '#';

	for(let i = 0; i < 6; i++)
	{
		hexColor += hexFormat[Math.floor(Math.random() * 16)];
	}

	return hexColor;
}

