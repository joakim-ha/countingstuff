const addRowValidation = (name, countables, index) => {
  if (name === "") {
    console.warn("Item name cannot be empty.");
    return false;
  }

  if (
    countables.some((countable, i) => countable.name === name && i !== index)
  ) {
    console.warn("Item already exists.");
    return false;
  }
  return true;
};

const ValidationService = {
  addRowValidation,
};

export default ValidationService;
