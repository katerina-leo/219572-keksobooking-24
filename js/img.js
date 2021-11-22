const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const adForm = document.querySelector('.ad-form');
const avatarChooser = adForm.querySelector('.ad-form__field input[type=file]');
const previewAvatar = adForm.querySelector('.ad-form-header__preview img');
const photoChooser = adForm.querySelector('.ad-form__upload input[type=file]');
const previewPhotoContainer = adForm.querySelector('.ad-form__photo');

const getLoadFile = (inputFile, preview ) => {
  const file = inputFile.files[0];
  if (!file) {
    return;
  }
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

avatarChooser.addEventListener('change', () => {
  getLoadFile(avatarChooser, previewAvatar );
});
photoChooser.addEventListener('change', () => {
  const photo = document.createElement('img');
  getLoadFile(photoChooser, photo);
  photo.width = 70;
  photo.height = 70;
  previewPhotoContainer.appendChild(photo);
});
export {previewAvatar, previewPhotoContainer};
