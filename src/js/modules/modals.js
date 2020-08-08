import calcScroll from './calcScroll';

const modals = (state) => {
    const scroll = calcScroll();

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]');


        trigger.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
				}
                
                let warning = document.createElement('div');
                warning.classList.add('status1');
                let warning1 = document.createElement('div');
                warning1.classList.add('status2');

				const hideAndShow = () => {
                    windows.forEach(item => {
					    item.style.display = 'none';
				    });
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                };

                // проверка на заполненность полей ввода
                // проверка через наличие или отсутствие соответствующих свойств у объекта modalState
                if (modalSelector == '.popup_calc_profile' && ( !state.width || !state.height)) {
                // если поля поля ширины и высоты в первом модальном незаполнены, то добавляется warning с требованием 
                    item.parentNode.appendChild(warning);
                    document.querySelector('.status1').textContent = 'Укажите форму и размеры окна';
                } else if (modalSelector == '.popup_calc_end' && (!state.type || !state.profile)) {
                // если не выбран тип и профиль, то добавляется warning1   
                    item.parentNode.appendChild(warning1);
                    document.querySelector('.status2').textContent = 'Укажите тип и профиль остекления';
                } else {
                    
                    hideAndShow();
                }
            });
        });
        
        close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
			});

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {

				windows.forEach(item => {
					item.style.display = 'none';
				});

                modal.style.display = 'none';
                document.body.style.overflow = ''; 
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function callModalByTime(selector, time) {
        setTimeout(() => {

            let display;
            
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = true;
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden'; 
                document.body.style.marginRight = `${scroll}px`;
            }

            
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    callModalByTime('.popup', 60000);

};

export default modals;