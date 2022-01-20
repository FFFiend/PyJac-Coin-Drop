export class Vector {
    
    constructor(x,y) {
        //initializing position.
        this.horizontal_pos = x;
        this.vertical_pos = y;
        this.initialmag = (this.horizontal_pos*this.horizontal_pos + this.vertical_pos*this.vertical_pos)**0.5
    }

    add(other){
        this.horizontal_pos = this.horizontal_pos + other.horizontal_pos;
        this.vertical_pos = this.vertical_pos + other.vertical_pos;
        this.calculate_mag()

    }

    sub(other){
        this.horizontal_pos = this.horizontal_pos - other.horizontal_pos;
        this.vertical_pos = this.vertical_pos - other.vertical_pos;
        this.calculate_mag()

    }

    mult(scalar){
        this.horizontal_pos  = this.horizontal_pos * scalar;
        this.vertical_pos = this.vertical_pos * scalar;
        this.calculate_mag()
    }

    calculate_mag(){
        this.magnitude = (this.horizontal_pos*this.horizontal_pos + this.vertical_pos*this.vertical_pos)**0.5

    }


    normalize(){
        if (this.magnitude != 0){
            this.horizontal_pos = this.horizontal_pos / this.magnitude
            this.vertical_pos = this.vertical_pos / this.magnitude
        }



    }

    // saved rotate() method for when we work with angles.













}
