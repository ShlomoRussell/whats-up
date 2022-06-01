const authentication = {
  loggedIn: false,
  token: "",
  async signIn({ username, password }, callback) {
    return await fetch("http://localhost:5782/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: Number(password),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jRes) => {
        if (jRes.loggedIn) {
          authentication.loggedIn = true;
          authentication.token = jRes.token;
          jRes.friends.forEach(element => {
            console.log(element.id)
          });
          authentication.id=jRes.id
          callback();
        }
      })
      .catch((err) => console.log(err));
  },
  async register(data, callback) {
    return await fetch("http://localhost:5782/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jRes) => {
        if (jRes.loggedIn) {
          authentication.loggedIn = true;
          authentication.token = jRes.token;
          callback();
        }
      })
      .catch((err) => console.log(err));
  }
};

export default authentication;
