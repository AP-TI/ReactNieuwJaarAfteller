import React, { useState, useEffect } from 'react'

function Afteller() {
    const nieuwjaar = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0)
    const [nu, setNu] = useState(new Date())
    const vuurwerk = <div class="pyro">
        <div class="before"></div>
        <div class="after"></div>
    </div>;

    const tick = () => {
        setNu(new Date());
    }

    const milliSecondenNaarTijd = (s) => {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return hrs + ':' + mins + ':' + secs;
    }

    useEffect(() => {
        setInterval(tick, 1000)
    })

    return (
        <div>
            {(nieuwjaar - nu) >= 0 ? null : vuurwerk}
            <h1>{((nieuwjaar - nu) >= 0 ? milliSecondenNaarTijd(nieuwjaar - nu) : "Gelukkig Nieuwjaar!")}</h1>
        </div>
    )

}

export default Afteller