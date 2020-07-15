import calcScroll from './calcScroll';

const modals = () => {
    const scroll = calcScroll();

    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);
            

        trigger.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });
        });
        
        close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; 
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function callModalByTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden'; 
            document.body.style.marginRight = `${scroll}px`;
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    callModalByTime('.popup', 5000);

};

export default modals;