const express = require("express");
const checc = require("checc/middleware");

const app = express();
app.use(express.json());

const basicInputSchema = {
  type: "string",
  minLength: 2,
  maxLength: 20,
  pattern: [/^\w*$/, "You can only include letters, digits and underscores"],
};

app.post("/", [
  checc("body", {
    firstName: basicInputSchema,
    lastName: basicInputSchema,
    username: basicInputSchema,
    password: {
      ...basicInputSchema,
      pattern: [/\d/, "Password must contain a digit"],
    },
  }),

  (req, res) => {
    if (!req.checc.isValid) {
      return res.status(400).json(req.checc.result);
    }
    res.sendStatus(200);
  },
]);

app.listen(4000, () => console.log("App running on port 4000"));
