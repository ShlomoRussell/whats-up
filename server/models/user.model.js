export default class UserModel {
  constructor({ user_id, username, password, email, img }) {
    this.id = user_id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.image = img;
  }
}
