'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var PropTypes = require('prop-types');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

/* Wraps glamor's stylesheet and exports a singleton for styled components
to use. */


var _sheet = require('../vendor/glamor/sheet');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var babelPluginFlowReactPropTypes_proptype_GlamorInsertedRule = require('../types').babelPluginFlowReactPropTypes_proptype_GlamorInsertedRule || PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_GlamorRule = require('../types').babelPluginFlowReactPropTypes_proptype_GlamorRule || PropTypes.any;

var StyleSheet = function () {
  function StyleSheet() {
    _classCallCheck(this, StyleSheet);

    /* Don't specify a maxLength for the global sheet, since these rules
     * are defined at initialization and should remain static after that */
    this.globalStyleSheet = new _sheet.StyleSheet({ speedy: false });
    this.componentStyleSheet = new _sheet.StyleSheet({ speedy: false, maxLength: 40 });
  }

  _createClass(StyleSheet, [{
    key: 'inject',
    value: function inject() {
      this.globalStyleSheet.inject();
      this.componentStyleSheet.inject();
    }
  }, {
    key: 'flush',
    value: function flush() {
      if (this.globalStyleSheet.sheet) this.globalStyleSheet.flush();
      if (this.componentStyleSheet.sheet) this.componentStyleSheet.flush();
    }
  }, {
    key: 'insert',
    value: function insert(rule) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { global: false };

      var sheet = opts.global ? this.globalStyleSheet : this.componentStyleSheet;
      return sheet.insert(rule);
    }
  }, {
    key: 'rules',
    value: function rules() {
      return this.globalStyleSheet.rules().concat(this.componentStyleSheet.rules());
    }
  }, {
    key: 'injected',
    get: function get() {
      return this.globalStyleSheet.injected && this.componentStyleSheet.injected;
    }
  }]);

  return StyleSheet;
}();

/* Export stylesheet as a singleton class */


exports.default = new StyleSheet();
module.exports = exports['default'];
