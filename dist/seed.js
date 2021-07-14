"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _Post = require("./entity/Post");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var posts, p, posts2;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connection.manager.find(_Post.Post);

          case 2:
            posts = _context.sent;

            if (!(posts.length === 0)) {
              _context.next = 14;
              break;
            }

            console.log(posts);
            p = new _Post.Post('Post 1', '第一篇文章');
            _context.next = 8;
            return connection.manager.save(p);

          case 8:
            _context.next = 10;
            return connection.manager.find(_Post.Post);

          case 10:
            posts2 = _context.sent;
            console.log(posts2);
            _context.next = 16;
            break;

          case 14:
            _context.next = 16;
            return connection.manager.clear(_Post.Post);

          case 16:
            _context.next = 18;
            return connection.close();

          case 18:
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