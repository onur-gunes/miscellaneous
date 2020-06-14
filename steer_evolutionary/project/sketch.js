var vehicles = [];
var food = [];
var poison = [];

var debug;

function setup() {
    createCanvas( 640 * 2, 360 * 2 );
    for ( var i = 0; i < 50; i++ ) {
        var x = random( width );
        var y = random( height );
        vehicles[ i ] = new Vehicle( x, y );
    }

    for ( let i = 0; i < 40; i++ ) {
        let x = random( width );
        let y = random( height );
        food.push( createVector( x, y ) );
    }
    for ( let i = 0; i < 20; i++ ) {
        let x = random( width );
        let y = random( height );
        poison.push( createVector( x, y ) );
    }

    debug = createCheckbox();

}

function mouseDragged() {
    vehicles.push( new Vehicle( mouseX, mouseY ) );
}

function draw() {
    background( 51 );
    /*
        let target = createVector( mouseX, mouseY );

        // Draw an ellipse at the mouse position
        fill( 127 );
        stroke( 200 );
        strokeWeight( 2 );
        ellipse( target.x, target.y, 48, 48 );
        */

    if ( random( 1 ) < 0.1 ) {
        let x = random( width );
        let y = random( height );
        food.push( createVector( x, y ) );
    }
    if ( random( 1 ) < 0.01 ) {
        let x = random( width );
        let y = random( height );
        poison.push( createVector( x, y ) );
    }

    for ( let i = 0; i < food.length; i++ ) {
        fill( 0, 255, 0 );
        noStroke();
        ellipse( food[ i ].x, food[ i ].y, 4, 4 );
    }

    for ( let i = 0; i < poison.length; i++ ) {
        fill( 255, 0, 0 );
        noStroke();
        ellipse( poison[ i ].x, poison[ i ].y, 4, 4 );
    }

    // Call the appropriate steering behaviors for our agents

    for ( var i = vehicles.length - 1; i >= 0; i-- ) {
        vehicles[ i ].boundaries();
        vehicles[ i ].behaviors( food, poison );
        vehicles[ i ].update();
        vehicles[ i ].display();

        var newVehicle = vehicles[ i ].clone();
        if ( newVehicle != null ) {
            vehicles.push( newVehicle );
        }

        if ( vehicles[ i ].dead() ) {
            food.push( createVector( vehicles[ i ].position.x, vehicles[ i ].position.y ) );
            vehicles.splice( i, 1 );
        }


    }
}