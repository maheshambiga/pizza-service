import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { singUpController, singInController } from "./auth.controller";

const router = Router();

router.post(
  "/signup",
  celebrate({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().optional()
    })
  }),
  singUpController
);

router.post(
  "/login",
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required()
    })
  }),
  singInController
);

export default router;
