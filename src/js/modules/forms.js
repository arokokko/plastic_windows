const forms = (state) => {
    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input'),
        phoneInput = document.querySelectorAll('input[name="user_phone"]');

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
            item.value = '';
            if (item.getAttribute('type') == 'checkbox') {
                item.checked = false;
            }
        });
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
            })
            .catch(() => document.querySelector('.status').textContent = message.failure)
            .finally(() => {
                clearInput();
                setTimeout(() => {
                    messageStatus.remove();
                    if (warning){
                        warning.forEach(item => {
                            item.remove();
                        });
                    }
                    if (warning1){
                        warning1.forEach(item => {
                            item.remove();
                        });
                    }
                    for (let key in state) {
                        delete state[key];
                    }
                }, 5000);
            });

       });

    });

};

export default forms;