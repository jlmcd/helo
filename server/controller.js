const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    const accountArr = await db.get_username({ username });
    if (accountArr.length === 0) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const profilePic = `https://robohash.org/${username}`;
      const newAcc = await db.create_user({ username, hash, profilePic });
      console.log(username, hash, profilePic);
      req.session.user = {
        id: newAcc[0].id,
        username: newAcc[0].username,
        profile_pic: newAcc[0].profile_pic
      };
      return res
        .status(200)
        .send({
          message: "account created",
          user: req.session.user,
          loggedIn: true
        });
    } else {
      return res.status(200).send({ message: "username taken" });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    const accountArr = await db.get_username({ username });
    if (!accountArr[0]) {
      return res.status(200).send({ message: "username not found." });
    }
    const result = bcrypt.compareSync(password, accountArr[0].password);
    if (!result) {
      return res.status(401).send({ message: "incorrect password" });
    }
    req.session.user = {
      id: accountArr[0].id,
      username: accountArr[0].username,
      profile_pic: accountArr[0].profile_pic
    };
    res
      .status(200)
      .send({
        message: "successfully logged in",
        user: req.session.user,
        loggedIn: true
      });
  },
  getAllPosts: async (req, res) => {
    const { userPosts, id, search } = req.query;
    // console.log(userPosts, id, search)
    const db = req.app.get("db");
    let postsArr = [];
    if (userPosts === "true" && search) {
      postsArr = await db.get_all_posts({ search: `%${search}%`, id: "0" });
    }
    if (userPosts === "false" && !search) {
      postsArr = await db.get_all_posts({ search: "%%", id: { id } });
    }
    if (userPosts === "false" && search) {
      postsArr = await db.get_all_posts({ search: `%${search}%`, id: { id } });
    }
    if (userPosts === "true" && !search) {
      postsArr = await db.get_all_posts({ search: "%%", id: "0" });
    }
    res.status(200).send(postsArr);
  },
  getPost: async (req, res) => {
    const db = req.app.get('db')
    const post = await db.get_post({ id: req.params.id })
    res.status(200).send(post)
  },
  newPost: (req, res) => {
    const { id } = req.params
    const { title, imgURL, content } = req.body
    const db = req.app.get('db')
    db.new_post({ title, imgURL, content, id })
      .then(result => {
        res.status(200).send(result)
      }
      )
  }
};
