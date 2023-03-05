const Router = require("express");
const authControllers = require("../controllers/usersControllers");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.get("/", authMiddleware, authControllers.auth);
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
    check(
      "nameOrganization",
      "Назва організації не заповнена, поерніться назад і введіть назву для реєстрації користувача"
    ).notEmpty(),
  ],
  authControllers.registration
);
router.post("/login", authControllers.login);
router.get("/users", authMiddleware, authControllers.getUsers);

module.exports = router;
