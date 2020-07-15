import calcScroll from './calcScroll';

const images = () => {
    const imgPopup = document.createElement('div'),
        workSection = document.querySelector('.works'),
        bigImg = document.createElement('img'),
        scroll = calcScroll();

    imgPopup.classList.add('popup_img');
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImg);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;
        if(target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
            let path = target.parentNode.getAttribute('href');
            bigImg.setAttribute('src', path);
        }

        if(target && target.matches('div.popup_img')) {
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }
    });
};

export default images;