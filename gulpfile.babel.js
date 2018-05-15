import {Jasmine} from 'pui-react-tools';
import testWebpack from './config/webpack/test';
import requireDir  from 'require-dir';
import gulp from 'gulp';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// require('./tasks/test');
// require('./tasks/css-components');
// require('./tasks/react-components');
// require('./tasks/js-components');
// require('./tasks/dev');

Jasmine.install({
  headlessServerOptions: {
    includeStackTrace: true,
    random: false,
    isVerbose: false,
    port: 8888,
    driver: 'chrome'
  },
  appGlobs: ['./spec/pivotal-ui-react/index.js'],
  headlessSpecRunnerOptions: {profile: true},
  webpack: {test: () => testWebpack}
});

requireDir('./tasks');

gulp.task('default', gulp.series('ci'));
