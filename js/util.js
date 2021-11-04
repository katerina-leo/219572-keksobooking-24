const ALERT_SHOW_TIME = 5000;


//шаблон сообщения при успешной отправке формы
const createSuccessTemplate = () =>{
  const successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successMessageElement = successMessageTemplate.cloneNode(true);
  return successMessageElement;
};

//шаблон сообщения - при отправке формы произошла ошибка запроса

const createErrorTemplate = () =>{
  const successMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  const errorMessageElement = successMessageTemplate.cloneNode(true);
  return errorMessageElement;
};

//сообщение при ошибке загрузки

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//сообщение на весь экран при успешной отправке и его закрытие
const fullScreenSuccess = (createMessageTemplate) => {
  const template = createMessageTemplate();
  document.body.appendChild(template);

  const successElement = document.querySelector('.success');
  successElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    successElement.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successElement.remove();
    }
  });
};


//сообщение на весь экран об ошибке  и его закрытие

const fullScreenError = (createMessageTemplate) => {
  const template = createMessageTemplate();
  document.body.appendChild(template);

  const errorElement = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    errorElement.remove();
  });
  errorElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    errorElement.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorElement.remove();
    }
  });
};

export { showAlert, createSuccessTemplate, createErrorTemplate, fullScreenSuccess, fullScreenError };
