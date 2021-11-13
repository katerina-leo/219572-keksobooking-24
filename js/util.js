const ALERT_SHOW_TIME = 5000;

const createSuccessTemplate = () =>{
  const successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successMessageElement = successMessageTemplate.cloneNode(true);
  return successMessageElement;
};

const createErrorTemplate = () =>{
  const successMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  const errorMessageElement = successMessageTemplate.cloneNode(true);
  return errorMessageElement;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error__message--show');
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccessMessage = (createMessageTemplate) => {
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

const showErrorMessage = (createMessageTemplate) => {
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

export { showAlert, createSuccessTemplate, createErrorTemplate, showSuccessMessage, showErrorMessage };
