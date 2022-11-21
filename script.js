const canvas = document.getElementById("spiral");
let context = document.querySelector("canvas").getContext("2d");
context.scale(1, 1);

canvas.width = window.innerWidth;
canvas.height = Math.round(window.outerHeight * 1.1);

const total = 2 * 3.1415;
const degree = 2 * 3.1415 / 360;

let degreeX1 = degree;
let degreeY1 = degree;
let ratioX1 = 100;
let ratioY1 = 0;
let centerX = canvas.width / 2;
let centerY = Math.round(canvas.height / 2 * 0.9);
let r1 = canvas.height / 3;

const values = {
	clr0 : '#ff00ff',
	hex : ["0", "1", "2", "3", "4", "5", "6", "7", 
	       "8", "9", "a", "b", "c", "d", "e", "f"],
	clrcount : 0,
	clrRising : false,
	hexnumber : 1,
}


function getX(value, r, ratio) {
	var x = Math.cos(value);
	return x * r * (ratio / 100);
}

function getY(value, r, ratio) {
	var y = Math.sin(value);
	return y * r * (ratio / 100);
}

document.addEventListener('click', (event) => {
	drawPlane();
});

function drawPlane() {

	for (var i = 0; i < 1260; i++) {

		var x1 = getX(degreeX1, r1, ratioX1);
		var y1 = getY(degreeY1, r1, ratioY1);

		context.fillStyle = values.clr0;
		context.fillRect(centerX + x1, centerY + y1, 1, 1);
    
		degreeY1 += degree * 2;
		ratioY1 += 4;
		ratioX1 += 4;
		degreeX1 += degree * 2;

    		/*if (degreeY1 > total || degreeY1 < -total) {
      			degreeY1 = degree;
    		}
    		if (degreeX1 > total || degreeX1 < -total) {
      			degreeX1 = degree;
    		}*/
    		if (ratioY1 > 700 || ratioY1 < -700) {
      			ratioY1 = ratioY1 * -1;
    		}
    		if (ratioX1 > 700 || ratioX1 < -700) {
      			ratioX1 = ratioX1 * -1;
    		}
  	}
  	clr();
  	draw();
}

function draw() {
  	setTimeout(() => {
    		window.requestAnimationFrame(drawPlane);
  	}, 100);
}

function clr() {
  	var arr = values.clr0.split("");
  	var hex = values.hex;
  	if (values.clrcount === 16) {
    		if (values.hexnumber < 6) {
      			values.hexnumber += 1;
    		}
    		else {
      			values.hexnumber = 1;
    		}
    		values.clrcount = 0;
    		if (values.hexnumber % 2 === 0) {
    			(values.clrRising) ? values.clrRising = false : 
					     values.clrRising = true;
    		}
  	}
  	if (values.clrRising) {
    		arr[values.hexnumber] = hex[values.clrcount];
  	}
  	else {
    		arr[values.hexnumber] = hex[15-values.clrcount];
  	}
  	values.clr0 = arr[0]+arr[1]+arr[2]+arr[3]+arr[4]+arr[5]+arr[6];
  	values.clrcount += 1;
}

