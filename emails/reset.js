const keys = require('../keys')

module.exports = function(email , token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Восстановления доступа',
    html: `
      <h1>Вы забыли пароль?</h1>
      <p>Ссылка для воотановления пароля</p>
      <p><a href="${keys.BASE_URL}/auth/password/${token}">Восстановить доступ</a></a></p>
      <hr />
      <a href="${keys.BASE_URL}">Akylbeks app</a>
    `
  }
}