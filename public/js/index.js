"use strict";

$(document).ready(function () {
  var n = io.connect();n.emit("init", {}).on("response", function () {});
});