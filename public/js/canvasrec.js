// DEBUG
var trace = function(msg){ console.log(msg); };

var canvas;
var brush;
var mouse;

var circleArray;
var timer = 0;

var greyARR;

var displayOnly = true;

function pageLoad_init()
{
	trace("pageLoad_init();");

	dust_init();

	canvas_init();

	if(displayOnly)
	{
		demo();
	}

	else
	{
		mouse_init();	
	}

	brush_init();

	// INIT
	animate();
}

function dust_init()
{
	circleArray = [];

	greyARR = [];

	greyARR.push("#AAAAAA");
	greyARR.push("#BBBBBB");
	greyARR.push("#CCCCCC");
	greyARR.push("#DDDDDD");
	greyARR.push("#EEEEEE");
	greyARR.push("#FFFFFF");
}

function mouse_init()
{
	mouse = {};
	mouse.x = undefined;
	mouse.y = undefined;

	canvas.addEventListener("mousemove", canvas_event, false);
	canvas.addEventListener("mousedown", canvas_event, false);
	canvas.addEventListener("mouseup", canvas_event, false);
}

function canvas_init()
{
	canvas = document.querySelector("#disp-canvas");
	// canvas.width = window.innerWidth;
	// canvas.height = window.innerHeight;

	canvas.width = screen.width;
	canvas.height = screen.height;
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

function demo()
{

	for(let i = 0; i < 6000; i++)
	{
		let fakeEvent = {};

		fakeEvent.x = randomRange((canvas.width - 2), 2);
		fakeEvent.y = randomRange((canvas.height -2), 2);

		draw_engine(fakeEvent);

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

			// let radius = 0.5;

			let radius = 0.5;

			timer = 0;

			let x = event.x;
			let y = event.y;
			let vx = (Math.random() - 0.1) * 4;
			let vy = (Math.random() - 0.1) * 4;

			circleArray.push(new Circle(x, y, vx, vy, radius, true));
}


function brush_init()
{
	brush = canvas.getContext('2d');
	// brush.filter = 'blur(2px)';
	// brush.globalAlpha = 0.2;
}



function Circle(x, y, vx, vy, radius, useGrey)
{
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.harshEase = randomRange(20, 8);
	this.radius = radius;
	
	if(useGrey)
	{
		// this.color = randGrey();
		this.color = randRGBA();
	}

	else
	{
		this.color = randColor();
	}

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

function randRGBA()
{
	let set_c = randomRange(255, 100);
	let set_a = randomRange(100, 30) / 100;

	let rgba = 'rgba(' + set_c + ', ' + set_c + ', ' + set_c + ', ' + set_a + ')';

	return rgba;
}

function randGrey()
{
	let hexGrey = greyARR[Math.floor(Math.random() * greyARR.length)];

	return hexGrey;
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

function randomRange(numH, numL)
{
	let n = Math.round(Math.random() * (numH - numL) + numL);

	return n;
}

