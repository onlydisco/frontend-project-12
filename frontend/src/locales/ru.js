export default {
  translation: {
    navbar: {
      logo: 'Hexlet Chat',
      logoutButton: 'Выйти',
    },
    loginForm: {
      header: 'Войти',
      username: {
        placeholder: 'Ваш ник',
        validation: {
          required: 'Обязательное поле для заполнения',
        },
      },
      password: {
        placeholder: 'Пароль',
        validation: {
          required: 'Обязательное поле для заполнения',
        },
      },
      authFailed: 'Неверные имя пользователя или пароль',
      submit: 'Войти',
      footer: {
        question: 'Нет аккаунта? ',
        link: 'Регистрация',
      },
    },
    signupForm: {
      header: 'Регистрация',
      username: {
        placeholder: 'Имя пользователя',
        validation: {
          required: 'Обязательное поле для заполнения',
          min: 'От 3 до 20 символов',
          max: 'Не длиннее 20 символов',
        },
      },
      password: {
        placeholder: 'Пароль',
        validation: {
          required: 'Обязательное поле для заполнения',
          min: 'Не менее 6 символов',
        },
      },
      confirmPassword: {
        placeholder: 'Подтвердите пароль',
        validation: {
          required: 'Обязательное поле для заполнения',
          confirmation: 'Пароли должны совпадать',
        },
      },
      signupFailed: 'Такой пользователь уже существует',
      submit: 'Зарегистрироваться',
    },
    channels: {
      header: 'Каналы',
      dropdownHidden: 'Управление каналом',
      channelButtons: {
        rename: 'Переименовать',
        remove: 'Удалить',
      },
    },
    messages: {
      counter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      messagesForm: {
        placeholder: 'Введите сообщение...',
        ariaLabel: 'Новое сообщение',
        submitHidden: 'Отправить',
      },
    },
    modals: {
      addChannelModal: {
        header: 'Добавить канал',
        labelHidden: 'Имя канала',
        validation: {
          required: 'Обязательное поле для заполнения',
          min: 'Не короче 3 символов',
          max: 'Не длиннее 20 символов',
          notOneOf: 'Имя канала должно быть уникальным',
        },
        buttons: {
          cancel: 'Отмена',
          submit: 'Отправить',
        },
      },
      renameChannelModal: {
        header: 'Переименовать канал',
        labelHidden: 'Имя канала',
        validation: {
          required: 'Обязательное поле для заполнения',
          min: 'Не короче 3 символов',
          max: 'Не длиннее 20 символов',
          notOneOf: 'Имя канала должно быть уникальным',
        },
        buttons: {
          cancel: 'Отмена',
          submit: 'Отправить',
        },
      },
      removeChannelModal: {
        header: 'Удалить канал',
        question: 'Уверены?',
        buttons: {
          cancel: 'Отменить',
          delete: 'Удалить',
        },
      },
    },
    notFoundPage: {
      header: 'Страница не найдена',
      description: 'Но вы можете перейти',
      link: 'на главную страницу',
    },
    notifications: {
      channelAdded: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удалён',
      connectionError: 'Ошибка соединения',
      unknownError: 'Неизвестная ошибка',
    },
  },
};
