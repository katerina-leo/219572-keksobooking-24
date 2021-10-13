const getRandomArbitrary = (min, max, digits) => {
  if (min >= max || min < 0) {
    return 'Задан неверный диапазон! Укажите другие числа.';
  }
  return (Math.random() * (max - min) + min).toFixed(digits);
};

export { getRandomArbitrary };
