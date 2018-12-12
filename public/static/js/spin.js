class Spin {
    constructor(x, y, theta, image) {
        this.x = x;
        this.y = y;
        this.theta = theta;
        this.image = image;
    }

    /* TODO:
        - create single arrow image with function to rotate and set x,y
    */
    toString() {
        console.log("x: ", this.x, "y: ", this.y, "theta: ", this.theta);
    }
}