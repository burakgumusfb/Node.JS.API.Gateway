module.exports = {
  name: 'custom-auth',
  policy: (actionParams) => {
    const that = this;
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization').split(' ')[1];
            if (!token) {
                res.status(401).send('Unauthorized');
            } else {
                const payload = await jwt.validate(token);
                req.user = payload;
                req.user.token = token;
                next();
            }
        } catch (err) {
            res.status(401).send('Unauthorized');
        }
    };
  }
};