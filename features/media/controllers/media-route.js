'use strict';

module.exports = {
  url: '/media/:file',

  enter: [function() {
    window.page.stop();
    window.location.replace(window.location.href);
  }]
};
