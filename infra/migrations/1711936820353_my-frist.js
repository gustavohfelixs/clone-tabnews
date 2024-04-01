/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("test", {
    firstRow: "integer",
    secoundRow: "integer",
  });
};

exports.down = (pgm) => {};
