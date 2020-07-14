const timer = (id, deadline) => {
    const getTimeRemaining = (endtime) => {
        let time = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((time/1000) % 60),
            minutes = Math.floor((time/(1000 * 60)) % 60),
            hours = Math.floor((time/(1000 * 60 * 60)) % 24),
            days = Math.floor(time/(1000 * 60 * 60 * 24));
    };
};

export default timer;