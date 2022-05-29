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
          callback();
        }
      })
      .catch((err) => console.log(err));
  },
};

export default authentication;
