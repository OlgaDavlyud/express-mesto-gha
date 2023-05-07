const { celebrate, Joi } = require('celebrate');
const { regex } = require('./validateURL');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "email" обязательное для заполнения',
      })
      .email()
      .message('Введите корректный email-адрес'),
    password: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "password" обязательное для заполнения',
      }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Минимальное количество символов - 2',
        'string.max': 'Максимальное количество символов - 30',
      }),
    about: Joi.string()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Минимальное количество символов - 2',
        'string.max': 'Максимальное количество символов - 30',
      }),
    avatar: Joi.string()
      .pattern(regex)
      .message('Введите корректный url-адрес'),
    email: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "email" обязательное для заполнения',
      })
      .email()
      .message('Введите корректный email-адрес'),
    password: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "password" обязательное для заполнения',
      }),
  }),
});

const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.empty': 'Поле "name" обязательное для заполнения',
        'string.min': 'Минимальное количество символов - 2',
        'string.max': 'Максимальное количество символов - 30',
      }),
    about: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.empty': 'Поле "about" обязательное для заполнения',
        'string.min': 'Минимальное количество символов - 2',
        'string.max': 'Максимальное количество символов - 30',
      }),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "avatar" обязательное для заполнения',
      })
      .pattern(regex)
      .message('Введите корректный url-адрес'),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Минимальное количество символов - 2',
        'string.max': 'Максимальное количество символов - 30',
        'string.empty': 'Поле "name" обязательное для заполнения',
      }),
    link: Joi.string()
      .required()
      .pattern(regex)
      .message('Введите корректный url-адрес')
      .messages({
        'string.empty': 'Поле "link" обязательное для заполнения',
      }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .length(24)
      .hex()
      .message('Обязательный формат id - hex')
      .required()
      .messages({
        'string.length': 'Фиксированное количество символов id - 24',
      }),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .length(24)
      .hex()
      .message('Обязательный формат id - hex')
      .required()
      .messages({
        'string.length': 'Фиксированное количество символов id - 24',
        'string.empty': 'Поле "link" обязательное для заполнения',
      }),
  }),
});

module.exports = {
  validateLogin,
  validateUser,
  validateUserProfile,
  validateUserAvatar,
  validateCard,
  validateUserId,
  validateCardId,
};
