const login = async (req, res) => {
  try {
    console.log(req.body);
    return res.json({ msg: "메세지입니다.", result: "결과입니다." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const LoginController = {
  login,
};

module.exports = LoginController;
