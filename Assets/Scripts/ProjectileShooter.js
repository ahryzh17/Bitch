#pragma strict

var projectile : Transform;
var timeBetweenShots : float = 0.5;
var timeBetweenWaves : float = 1.0;
enum direction { left, right };

function Start () {
	FireSpreads(1.0, 6, 3, direction.left);
}

function Update () {
}

function FireSpreads (z : float, number_of_shots : int, number_of_waves: int, angle : direction) {
	for (var i = 0; i < number_of_waves; i++) {
		FireSpread(z, number_of_shots, angle);
		yield WaitForSeconds(timeBetweenWaves);
	}
}

function FireSpread (z : float, number_of_shots : int, angle : direction) {
	for (var i = 0; i < number_of_shots; i++) {
		var x : float = number_of_shots/2 - number_of_shots + i;
		if (angle == direction.left) { x = -x; }
		yield WaitForSeconds(timeBetweenShots);
		Fire(x/10, z);
	}
}

function Fire (x : float, z : float) {
	var bullet = Instantiate(projectile, Vector3(transform.position.x, transform.position.y, transform.position.z - 1.0), transform.rotation);
	var movement = bullet.GetComponent(BulletMovement);
	movement.velocityX = x;
	movement.velocityZ = z;
}
