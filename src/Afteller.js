import React, { Component } from 'react';
const geluid = new Audio('../aftellen.wav');

class Afteller extends Component {
    constructor() {
        super();

        this.state = {
            nieuwjaar: new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0),
            huidigeTijd: new Date(),
            vuurwerk: (<div class="pyro">
                <div class="before"></div>
                <div class="after"></div>
            </div>)
        }
    }

    tick = () => {
        this.setState({ huidigeTijd: new Date() });
    }

    milliSecondenNaarTijd = (s) => {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        return String(hrs).padStart(2,0) + ':' + String(mins).padStart(2,0) + ':' + String(secs).padStart(2,0);
    }

    componentDidMount = () => {
        this.intervalID = setInterval(this.tick, 1000);
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalID);
    }

    render = () => {
        if ((this.state.nieuwjaar - this.state.huidigeTijd) <= 11000 && (this.state.nieuwjaar - this.state.huidigeTijd) >= 1) {
            geluid.play();
            console.log(this.state.nieuwjaar - this.state.huidigeTijd)
        } else if ((this.state.nieuwjaar - this.state.huidigeTijd) <= 0) {
            geluid.pause();
            geluid.currentTime = 0;
        }

        return (
            <div>
                {(this.state.nieuwjaar - this.state.huidigeTijd) >= 0 ? null : this.state.vuurwerk}
                <h1>{((this.state.nieuwjaar - this.state.huidigeTijd) >= 0 ? this.milliSecondenNaarTijd(this.state.nieuwjaar - this.state.huidigeTijd) : "Gelukkig Nieuwjaar!")}</h1>
            </div>
        );
    }
}

export default Afteller