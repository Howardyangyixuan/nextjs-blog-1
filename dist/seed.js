"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _Post = require("./entity/Post");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var posts, i, p, posts2;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.manager.find(_Post.Post);

          case 2:
            posts = _context.sent;

            if (!(posts.length === 0)) {
              _context.next = 17;
              break;
            }

            console.log(posts);
            i = 1;

          case 6:
            if (!(i < 12)) {
              _context.next = 13;
              break;
            }

            p = new _Post.Post("Post ".concat(i), "\u7B2C".concat(i, "\u7BC7\u6587\u7AE0"));
            _context.next = 10;
            return connection.manager.save(p);

          case 10:
            i++;
            _context.next = 6;
            break;

          case 13:
            _context.next = 15;
            return connection.manager.find(_Post.Post);

          case 15:
            posts2 = _context.sent;
            console.log(posts2);

          case 17:
            _context.next = 19;
            return connection.close();

          case 19:
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