//Pierre MARZIN for Neha 14/04/2017
var worms;
var nworms = 0;
var maxspeed = 5;
var dg;
var MWidth;
var MHeight;
var mode;

var step;


var particles_a = [];
var particles_b = [];
var particles_c = [];
var particles_d = [];
var particles_e = [];
var nums = 800
var noiseScale = 800;


var xx;
var yy;
var tt;
var rr;

function setup() {
  createCanvas(windowWidth, windowHeight);
  MWidth = windowWidth;
  MHeight = windowHeight;
  imageMode(CENTER);
  noStroke();
  dg = createGraphics(width, height);
  dg.colorMode(HSB, 360, 255, 255, 255);
  dg.noStroke();
  dg.background(0, 0);
  worms = [];
  for (var i = 0; i < nworms; i++) {
    worms.push(new Worm());
  }

  stroke(random(50) + 50,random(50),10)
  noFill()
  ellipseMode(RADIUS)
  //noLoop()
  step = 0

  background(0);

  tt = 0;
  rr = 10;

  for(var i = 0; i < nums; i++){
    particles_a[i] = new Particle(random(0, width),random(0,height));
    particles_b[i] = new Particle(random(0, width),random(0,height));
    particles_c[i] = new Particle(random(0, width),random(0,height));
    particles_d[i] = new Particle(random(0, width),random(0,height));
    particles_e[i] = new Particle(random(0, width),random(0,height));
}

}

function draw() {
  if (mode === 1) {
    blendMode(NORMAL)
    colorMode(RGB);
    push();
        translate(width/2, height/2);
        
        // t = 0 -> x = 210 , y = 160
        xx = rr *(16 * sin(tt) * sin(tt) * sin(tt)) + random(-5, 5);
        yy = -1 * rr * (13 * cos(tt) - 5 * cos(2*tt) - 2 * cos(3 * tt) - cos(4 * tt) ) +  random(-5, 5);
    
        noStroke();
        fill(255, random(255), 255);
        ellipse(xx, yy, 10, 10);
    
        strokeWeight(random(2, 10));
        stroke(255, random(255), 255, 10);
        line(0, 0, xx, yy);
    
    pop();
  
    tt += 0.01;
  }
  else if (mode === 2) {
        colorMode(RGB);
        fill(100, 0, 0)
        blendMode(ADD)
        const xs = []
        const ys = [] 
        for (let i = 0; i < 20; i ++) {
        const theta = i * TAU / 20
        const x = sin(theta)
        const y = cos(theta)
        const r = noise(1.23 + x * 0.5, 4.85 + y * 0.5, step * 0.01) * 2 * step
        xs.push(x * r)
        ys.push(y * r)
        }
        beginShape()
            for (let i = 0; i < 23; i ++) {
                curveVertex(width * 0.5 + xs[i % 20], height * 0.5 + ys[i % 20])
            }
        endShape()
        step += 0.5
  }
  else if (mode === 3) {
    background(0);
    colorMode(RGB);
    blendMode(ADD)
	noStroke();
	smooth();
		for(var i = 0; i < nums; i++){
            var radius = map(i,0,nums,1,4);
            var alpha = map(i,0,nums,0,225);
            
            fill(0,225,225,alpha);
            particles_a[i].move();
            particles_a[i].display(radius);
            particles_a[i].checkEdge();
                
            fill(0,0,225,alpha);
            particles_b[i].move();
            particles_b[i].display(radius);
            particles_b[i].checkEdge();
                
            fill(0,127,225,alpha);
            particles_c[i].move();
            particles_c[i].display(radius);
            particles_c[i].checkEdge();
                
            fill(255,255,255,alpha);
            particles_d[i].move();
            particles_d[i].display(radius);
            particles_d[i].checkEdge();
            
            fill(0,0,127,alpha);
            particles_e[i].move();
            particles_e[i].display(radius);
            particles_e[i].checkEdge();
	}  
  }
  else if (mode === 4) {
    background(0); //350,150,255);
    blendMode(NORMAL);
    colorMode(HSB, 360, 255, 255, 255);
    image(dg, width / 2, height / 2);
    for (var i = 0; i < worms.length; i++) {
      worms[i].run();
    }
    if (worms.length < 60) {
        worms.push(new Worm());
        worms[worms.length - 1].pos.x = random(MWidth);
        worms[worms.length - 1].pos.y = random(MHeight);
    }
  }

}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        mode = 1;
        console.log(1);
    } 
    if (keyCode === UP_ARROW) {
        mode = 2;
        console.log(2);
    } 
    if (keyCode === DOWN_ARROW) {
        mode = 3;
        console.log(3);
    } 
    if (keyCode === RIGHT_ARROW) {
        mode = 4;
        console.log(4);
    }

    return false;
}

function keyTyped() {
    if (key === 'a') {
        location.reload();
        console.log(5)
    }
}

function Worm() {
  this.pos = createVector(random(width), random(height));
  this.radius = random(3, 15);
  this.circledistance = 50;
  this.sparks = [];
  this.value = random(360);
  this.speed = createVector(random(1) > .5 ? random(1, maxspeed) : random(-maxspeed, -1), random(1) > .5 ? random(1, maxspeed) : random(-maxspeed, -1));
  this.sm = this.speed.mag();
  this.img = loadImage("0" + str(int(random(4))) + ".png");
}
Worm.prototype.run = function() {
  this.update();
  this.display();
}
Worm.prototype.update = function() {
  this.speed.setMag(this.circledistance);
  this.alpha = random(TWO_PI);
  this.speed = this.speed.add(createVector(this.radius * sin(this.alpha), this.radius * cos(this.alpha)));
  this.speed.setMag(this.sm);
  this.pos.add(this.speed);
  if (this.pos.x < 0 || this.pos.x > width) this.speed.x *= -1;
  if (this.pos.y < 0 || this.pos.y > height) this.speed.y *= -1;
}
Worm.prototype.display = function() {
  for (var i = 0; i < this.sparks.length; i++) {
    this.sparks[i].display();
    if (this.sparks[i].life-- <= 0) this.sparks.splice(i, 1);
  }
  push();
  translate(this.pos.x, this.pos.y);
  rotate(HALF_PI + atan2(this.speed.y, this.speed.x));
  tint(this.value, 255, 255);
  image(this.img, 0, 0);
  dg.fill(this.value, 255, 255, 15);
  dg.ellipse(this.pos.x, this.pos.y, this.sm, this.sm);
  this.sparks.push(new Spark(this.pos.copy(), createVector(random(-.1, .1) - this.speed.x, random(-.1, .1) - this.speed.y), this.value));

  pop();

}

function Spark(pos, speed, value) {
  this.pos = pos;
  this.speed = speed;
  this.value = value;
  this.life = 10;
}
Spark.prototype.display = function() {
  this.speed.x = (10 - this.life) * sin(this.life) * sin(millis() * .01); // random(-.5, .5);
  this.speed.y = (10 - this.life) * cos(this.life) * cos(millis() * .01); // += random(-.5, .5);
  this.pos.add(this.speed);
  fill(this.value, 255, 255, 255); //this.life);
  ellipse(this.pos.x, this.pos.y, this.life, this.life);
}

function Particle(x, y){
	this.dir = createVector(0, 0);
	this.vel = createVector(0, 0);
	this.pos = createVector(x, y);
	this.speed = 0.2;

	this.move = function(){
		var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
	}

	this.checkEdge = function(){
		if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
			this.pos.x = random(50, width);
			this.pos.y = random(50, height);
		}
	}

	this.display = function(r){
		ellipse(this.pos.x, this.pos.y, r, r);
	}
}