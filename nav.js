const nav__bar = document.querySelector('.nav__bar');
const nav__home = document.querySelector('.nav__home');

const nav__barSpan = document.querySelectorAll('.nav__bar span');
const nav__homeSpan = document.querySelectorAll('.nav__home span');

const nav__menuMobile = document.querySelector('.nav__menuMobile');
const nav = document.querySelector('nav');
const header = document.querySelector('header');

var header_height = header.clientHeight;
var navHeight = nav.clientHeight;

window.onscroll = () => {
    // if (window.scrollY >= header_height - navHeight) {
    //     nav.style.backgroundColor = '#002106';
    // } else {
    //     nav.style.backgroundColor = 'transparent';
    // }
    
    // if (nav__menuMobile.style.display === 'flex') {
    //     nav.style.backgroundColor = '#002106';
    // }
    header_height = header.clientHeight;
    navHeight = nav.clientHeight;

    if (window.scrollY >= header_height - navHeight) {
        nav.style.backgroundColor = '#002106';
    } else {
        nav.style.backgroundColor = 'transparent';
    }
};

nav__bar.addEventListener('click', () => {
    
    if (nav__menuMobile.style.display === 'none') {
        nav__menuMobile.style.display = 'flex';
        if (document.documentElement.scrollTop <= header_height - navHeight) {
            nav.style.backgroundColor = '#002106';
        }
    } else {
        nav__menuMobile.style.display = 'none';
        if (document.documentElement.scrollTop <= header_height - navHeight) {
            nav.style.backgroundColor = 'transparent';
        }
    }
});
