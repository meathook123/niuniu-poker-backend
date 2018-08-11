const User = require('../models/User');
const request = require('request');
const config = require('../config');
const errors = require('restify-errors');

exports.getAllUsers = (req, res, next) => {
  // res.send('test');
  User.find().then((users) => {
    res.send(users);
    next();
  }, (err) => {
    next(err);
  });
};

exports.login = (req, res, next) => {
  if (!req.params || !req.params.code) {
    return next(new errors.BadRequestError('code is required'))
  }
  // console.log(req.params)
  // wechat api to get openid
  request.get('https://api.weixin.qq.com/sns/jscode2session?appid=' + config.miniProgram.appid + '&secret=' + config.miniProgram.appSecret + '&js_code=' + req.params.code + '&grant_type=authorization_code', (err, response) => {
    if (err) {
      next(err);
    } else {
      const wechatRes = response.toJSON();
      if (wechatRes.statusCode === 200) {
        const wechatUser = JSON.parse(wechatRes.body);
        res.send('login');
        next();
      } else {
        next(new errors.InternalServerError('something went wrong'));
      }
    }
  });
}
