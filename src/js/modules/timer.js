const timer = (id, deadline) => {
    const getTimeRemaining = (endtime) => {
        let time = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((time/1000) % 60),
            minutes = Math.floor((time/(1000 * 60)) % 60),
            hours = Math.floor((time/(1000 * 60 * 60)) % 24),
            days = Math.floor(time/(1000 * 60 * 60 * 24));

        return {
            total: time,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    };

    const setClock = (selector, endtime) => {
        let stopWatch = document.querySelector(selector),
            days = stopWatch.querySelector('#days'),
            hours = stopWatch.querySelector('#hours'),
            minutes = stopWatch.querySelector('#minutes'),
            seconds = stopWatch.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let time = getTimeRemaining(endtime);
            days.textContent = addZero(time.days);
            hours.textContent = addZero(time.hours);
            minutes.textContent = addZero(time.minutes);
            seconds.textContent = addZero(time.seconds);

            if (time.total <= 0) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

                clearInterval(timeInterval);
            }
        }
    };

    function addZero(number) {
        if (number <= 9) {
            return '0' + number;
        } else {
            return number;
        }
    }

    setClock(id, deadline);
};

export default timer;