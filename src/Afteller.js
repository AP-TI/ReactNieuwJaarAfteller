import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const geluid = new Audio('./aftellen.wav');

class Afteller extends Component {
    constructor() {
        super();


        this.state = {
            open: true,
            nieuwjaar: new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0),
            huidigeTijd: new Date(),
            vuurwerk: (<div className="pyro">
                <div class="before"></div>
                <div class="after"></div>
            </div>)
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    };
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
        return String(hrs).padStart(2, 0) + ':' + String(mins).padStart(2, 0) + ':' + String(secs).padStart(2, 0);
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
                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Nieuwjaar aftelklok"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Druk op "OK" om te starten.
          </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                OK
          </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default Afteller