const ALERT_SHOW_TIME = 5000;

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
//шаблон сообщения при успешной отправке формы
const createSuccessTemplate = () =>{
  const successMessageElement = successMessageTemplate.cloneNode(true);
  return successMessageElement;
};
//шаблон сообщения об отправке формы с ошибкой
const createErrorTemplate = () =>{
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  return errorMessageElement;
};
//шаблон сообщения - при отправке формы произошла ошибка запроса
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error__message--show');
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
//удаляет сообщение об успешной отправке кнопкой esk
const onSuccessPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.querySelector('.success').remove();//удаляет сообщение
    document.removeEventListener('keydown', onSuccessPopupEscKeydown);//удаляет слушатель
  }
};
//показ сообщения об успешной отправке
const showSuccessMessage = (createMessageTemplate) => {
  const template = createMessageTemplate();
  document.body.appendChild(template);

  document.querySelector('.success').addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessPopupEscKeydown);//удаляет слушатель
  });
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
};
//удаляет сообщение об отправке с ошибкой кнопкой esk
const onErrorPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorPopupEscKeydown);
  }
};
//показ сообщения об  отправке с ошибкой
const showErrorMessage = (createMessageTemplate) => {
  const template = createMessageTemplate();
  document.body.appendChild(template);
  const errorButton = document.querySelector('.error__button');

  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorPopupEscKeydown);
  });

  document.querySelector('.error').addEventListener('click', (evt) => {
    evt.preventDefault();
    const errorElement = document.querySelector('.error');
    if (errorElement) {
      errorElement.remove();
      document.removeEventListener('keydown', onErrorPopupEscKeydown);
    }
  });

  document.addEventListener('keydown',onErrorPopupEscKeydown);
};

export { showAlert, createSuccessTemplate, createErrorTemplate, showSuccessMessage, showErrorMessage };
