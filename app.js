const express = require("express");
const checc = require("checc/middleware");

const app = express();
app.use(express.json());

const basicInputSchema = {
  type: "string",
  minLength: 2,
  maxLength: 20,
  pattern: [/^[A-Za-z]*$/, "You can only include letters"],
};

app.post("/", [
  checc("body", {
    firstName: basicInputSchema,
    lastName: basicInputSchema,
    username: {
      ...basicInputSchema,
      pattern: [
        /^\w*$/,
        "You can only include letters, digits and underscores",
      ],
    },
    password: {
      ...basicInputSchema,
      pattern: [/\d/, "Password must contain a digit"],
    },
  }),

  (req, res) => {
    const { isValid, errors } = req.checc.body;
    if (!isValid) {
      return res.status(400).json(errors);
    }
    res.sendStatus(200);
  },
]);

app.listen(4000, () => console.log("App running on port 4000"));
