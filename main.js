const form = document.querySelector('.auth-second__form');
let btnSubmit;
let checkboxBtn;
let inputCheckbox;
let userPhone;
let inputBox;
let checkboxContainer;
let inputSms;
let errorMessage;
let inputVoice;
let errorBlock;
let showBtn;
let password;
let nameInput;

if (form) {
  btnSubmit = form.querySelector('.auth-second__btn');
  checkboxBtn = form.querySelector('.cf-checkbox__span');
  inputCheckbox = form.querySelector('input[type=checkbox]');
  userPhone = form.querySelector('.js-phone');
  inputBox = form.querySelector('.input-area__input-box');
  checkboxContainer = form.querySelector('.cf-checkbox');
  inputSms = form.querySelector('.input-area__input-editor');
  errorMessage = form.querySelector('.input-area__error-message');
  inputVoice = form.querySelectorAll('.cf-input__code-field');
  errorBlock = form.querySelector('.cf-input__error-block');
  showBtn = form.querySelector('.input-area__password-icon');
  password = form.querySelector('.js-password');
  nameInput = form.querySelector('.js-name');
}

const timerSms = document.querySelector('.js-timer');
const timerBtn = document.querySelector('.js-timer-btn');
// login



//metrika

const btnNext = document.querySelector('.js-next');
const btnVoiceNext = document.querySelector('.js-voiceNext');
const voiceForm = document.querySelector('.js-voiceForm');
const inputCodeVoice = document.querySelectorAll('[data-voice]');
const inputCodeSms = document.querySelectorAll('[data-sms]');
const changePhone = document.querySelector('.js-changePhone');
const resendCode = document.querySelector('.js-resendCode');
const btnSmsNext = document.querySelector('.js-smsNext');


if (form) {
  if (nameInput) {
    nameInput.addEventListener('input', function (evt) {
      evt.target.value = evt.target.value.replace(/[0-9]/, '');
    });
  }

  if (showBtn) {
    showBtn.addEventListener('click', (evt) => {
      if (password.getAttribute('type') == 'password') {
        showBtn.classList.add('is-open');
        password.setAttribute('type', 'text');
      } else {
        showBtn.classList.remove('is-open');
        password.setAttribute('type', 'password');
      }
      return false;
    })
  }

  form.addEventListener('input', function () {
    btnSubmit.disabled = this.checkValidity() ? false : true;
    if (inputCodeVoice.length && this.checkValidity()) {
      ym(19405381, 'reachGoal', 'voiceCodeInputEnd');
    }
  })

  Array.from(form.elements).forEach((inp, i) => {
    if (inp.required) {
      if (inp.type === "checkbox") {
        inputCheckbox.checked = false;
        inp.addEventListener('click', (e) => {
          if (inp.checkValidity()) {
            checkboxBtn.classList.add('checked');
            inputCheckbox.setAttribute('checked', true);
            checkboxContainer.classList.remove('has-error');
          } else {
            checkboxBtn.classList.remove('checked');
            inputCheckbox.setAttribute('checked', false);
            checkboxContainer.classList.add('has-error');
          }
        })
      }
      if (inp.id === "phone") {
        inp.focus();
        inp.addEventListener('blur', (e) => {
          if (inp.checkValidity()) {
            inputBox.classList.add('input-area__input-box--success');
            errorMessage.style.display = 'none';
          } else {
            inputBox.classList.remove('input-area__input-box--success');
            errorMessage.style.display = 'block';
            inputBox.classList.add('input-area__input-box--error');
            inputBox.classList.toggle('animation--shake');
          }
        })
      }
      if (inp.dataset.sms === "smsCode") {
        inputCodeSms[0].focus();
        inp.addEventListener('input', (e) => {
          const value = e.target.value;
          const corrected = value.replace(/([^0-9]+)/gi, '');
          e.target.value = corrected;

          if (inp.checkValidity()) {
            /* let next = +inp.id; */
            if (inputVoice[inp.id]) {
              inputVoice[inp.id].focus();
            }
            inp.classList.add('input-area__input-box--success');
            errorBlock.style.display = 'none';

          } else {
            inp.classList.remove('input-area__input-box--success');
            errorBlock.style.display = 'block';
            inp.classList.add('cf-input--error');

          }
        })
      }
      if (inp.dataset.voice === "voiceCode") {
        inputCodeVoice[0].focus();
        inp.addEventListener('input', (e) => {
          const value = e.target.value;
          const corrected = value.replace(/([^0-9]+)/gi, '');
          e.target.value = corrected;

          if (inp.checkValidity()) {
            /* let next = +inp.id; */
            if (inputVoice[inp.id]) {
              inputVoice[inp.id].focus();
            }
            inp.classList.add('input-area__input-box--success');
            errorBlock.style.display = 'none';

          } else {
            inp.classList.remove('input-area__input-box--success');
            errorBlock.style.display = 'block';
            inp.classList.add('cf-input--error');

          }
        })
      }
    }
  })

  let maskOptions = {
    mask: '+{7} (h00) 000-00-00',

    blocks: {
      h: {
        mask: '0',
        prepare: function (str) {
          if (str !== 9) {
            return 9;
          }
        },
      },
    },

    /* lazy: false, */

    placeholderChar: ''

  };

  let maskNumber = (phone, mask) => {
    return new IMask(phone, mask);
  };

  if (userPhone) {
    maskNumber(userPhone, maskOptions);
  }
}

let timerTitle = (number, titles) => {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

if (timerSms) {
  let timer;
  let timerStart = timerSms.getAttribute('data-time');
  let countdown = () => {
    if (timerBtn) {
      timerBtn.style.display = "none";
    }
    let title = timerTitle(timerStart, ['секунда', 'секунды', 'секунд']);
    document.getElementById('timer').textContent = `${timerStart} ${title}`;
    timerStart--;
    if (timerStart < 0) {
      clearTimeout(timer);
      if (timerBtn) {
        timerBtn.style.display = "flex";
        timerSms.style.display = "none";
      } else {
        let redirectUrl = timerSms.getAttribute('data-url')
        window.location.replace(redirectUrl);
      }
    }
    else {
      timer = setTimeout(countdown, 1000);
    }
  }
  countdown();
}
