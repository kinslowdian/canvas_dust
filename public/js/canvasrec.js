var canvas;
var brush;

var circleArray;

function pageLoad_init()
{
	circleArray = [];

	canvas_init();

	brush_init();

	demo();

	// INIT
	animate();
}

function canvas_init()
{
	canvas = document.querySelector("#disp-canvas");

	canvas.width = screen.width;
	canvas.height = screen.height;
}

function brush_init()
{
	brush = canvas.getContext('2d');
}

function demo()
{

	for(let i = 0; i < 6000; i++)
	{
		let dust = {};

		dust.x = randomRange((canvas.width - 2), 2);
		dust.y = randomRange((canvas.height -2), 2);

		draw_engine(dust);

	}
}

function draw_engine(dustOBJ)
{
	let radius = 0.5;

	let x = dustOBJ.x;
	let y = dustOBJ.y;
	let vx = (Math.random() - 0.1) * 4;
	let vy = (Math.random() - 0.1) * 4;

	circleArray.push(new Circle(x, y, vx, vy, radius, true));
}



function Circle(x, y, vx, vy, radius, useGrey)
{
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.harshEase = randomRange(20, 8);
	this.radius = radius;
	this.color = randRGBA();

	this.draw = function()
	{
		brush.beginPath();
		brush.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		brush.fillStyle = this.color;
		brush.fill();
	};

	this.update = function()
	{
		// REVERSE X ON EDGE

		if(this.x + this.radius > innerWidth || this.x - this.radius < 0)
		{
			this.vx = -this.vx;
		}

		// REVERSE Y ON EDGE

		if(this.y + this.radius > innerHeight || this.y - this.radius < 0)
		{
			this.vy = -this.vy;
		}

		this.x += this.vx / this.harshEase;
		this.y += this.vy / this.harshEase;

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

// UTILS

function randomRange(numH, numL)
{
	let n = Math.round(Math.random() * (numH - numL) + numL);

	return n;
}

function randRGBA()
{
	let set_c = randomRange(255, 100);
	let set_a = randomRange(100, 30) / 100;

	let rgba = 'rgba(' + set_c + ', ' + set_c + ', ' + set_c + ', ' + set_a + ')';

	return rgba;
}

