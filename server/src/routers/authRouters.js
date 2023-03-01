const Router = require("express");
const authControllers = require("../controllers/authControllers");
const { check } = require("express-validator");
const router = new Router();

router.post(
  "/registration",
  [
    check(
      "email",
      "Поле E-mail не може бути пустим, або не вказаний достовірний E-mail"
    )
      .notEmpty()
      .isEmail(),
    check("password", "Поле пароль, не може бути меньше 6 симвволів").isLength({
      min: 6,
    }),
  ],
  authControllers.registration
);
router.post("/login", authControllers.login);
router.get("/users", authControllers.getUsers);

module.exports = router;
