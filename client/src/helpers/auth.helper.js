const authentication = {
  loggedIn: false,
  token: "",
  async signIn({ username, password }, setUser, callback) {
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
          authentication.id = jRes.id;
          setUser(jRes);
          callback();
        }
      })
      .catch((err) => console.log(err));
  },
  async register(data, setUser, callback) {
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
          setUser(jRes);
          callback();
        }
      })
      .catch((err) => console.log(err));
  },
};

export default authentication;
