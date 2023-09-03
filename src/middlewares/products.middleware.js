const yup = require("yup");

const schema = yup.object().shape({
  name: yup
     .string()
    .required("Nome do produto é obrigatório"),
  name: yup.number()
    .required("Preço obrigatório"),   
});

const productsValidation = (req, res, next) => {
  try {
    schema.validateSync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = productsValidation;
