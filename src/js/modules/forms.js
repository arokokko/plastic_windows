const forms = (state) => {
    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input'),
        phoneInput = document.querySelectorAll('input[name="user_phone"]'),
        select = document.querySelector('#view_type'),
        tabs = document.querySelectorAll('.balcon_icons_img'),
        content = document.querySelectorAll('.big_img > img');

    phoneInput.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^\+\d]/, '');
        });
        
    });

    const message = {
        loading: 'Идет загрузка...',
        success: 'Сообщение отправлено. Скоро мы с вами свяжемся!',
        failure: 'Сообщение не отправлено. Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInput = () => {
        input.forEach(item => {
            //очистка инпутов куда вводятся данные
            item.value = '';
            // очистка чекбоксов
            if (item.getAttribute('type') == 'checkbox') {
                item.checked = false;
            }
        });
        // установка селекта в первоначальное значение
        select.value = 'default';
    };

    //функция установки табов в модальном окне в первоначальное значение
    const hideAndShowTabs = () => {
        content.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove('do_image_more');
        });
    
        content[0].style.display = 'inline-block';
        tabs[0].classList.add('do_image_more');
    };

    //фукция удаления свежесозданных дивов в модальных окнах
    const removeAddedDivs = (warn) => {
        if (warn){
            warn.forEach(item => {
                item.remove();
            });
        }
    };
    

    form.forEach(item => {
       item.addEventListener('submit', (e) => {
           e.preventDefault();
           let warning = document.querySelectorAll('.status1'),  
               warning1 = document.querySelectorAll('.status2');
           let messageStatus = document.createElement('div');
           messageStatus.classList.add('status');
           item.appendChild(messageStatus);

           const formData = new FormData(item);
           if (item.getAttribute('data-calc') === 'end') {
               for (let key in state) {
                   formData.append(key, state[key]);
               }
           }

           postData('assets/server.php', formData)
            .then(res => {
                console.log(res);
                document.querySelector('.status').textContent = message.success;
                //при успешной отправке очищаем инпуты
                clearInput();
                //устанавливаем табы в первоначальное значение
                hideAndShowTabs();
                // удаляем все свойства из объекта modalState
                for (let key in state) {
                    delete state[key];
                }
            })
            .catch(() => document.querySelector('.status').textContent = message.failure)
            .finally(() => {
                //при любом раскладе удаляем warning warning1 messageStatus 
                removeAddedDivs(warning);
                removeAddedDivs(warning1);
                setTimeout(() => {
                    messageStatus.remove();
                }, 5000);
            });

       });

    });

};

export default forms;