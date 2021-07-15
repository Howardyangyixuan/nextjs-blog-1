"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _Post = require("./entity/Post");

var _User = require("./entity/User");

var _Comment = require("./entity/Comment");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var user, user1, i, post, comment;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.manager.find(_User.User);

          case 2:
            user = _context.sent;

            if (!(user.length === 0)) {
              _context.next = 18;
              break;
            }

            user1 = new _User.User('howard', '123');
            _context.next = 7;
            return connection.manager.save(user1);

          case 7:
            i = 1;

          case 8:
            if (!(i < 12)) {
              _context.next = 18;
              break;
            }

            post = new _Post.Post(user1, "Howard Post ".concat(i), "howard\u7684\u7B2C".concat(i, "\u7BC7\u6587\u7AE0"));
            _context.next = 12;
            return connection.manager.save(post);

          case 12:
            comment = new _Comment.Comment(user1, post, "\u6B22\u8FCE\u5173\u6CE8\u548C\u8F6C\u53D1howard\u7684\u7B2C".concat(i, "\u7BC7\u6587\u7AE0!"));
            _context.next = 15;
            return connection.manager.save(comment);

          case 15:
            i++;
            _context.next = 8;
            break;

          case 18:
            _context.next = 20;
            return connection.close();

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});