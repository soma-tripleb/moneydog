import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import Root from './root/root';

// Sentry.init({dsn: 'https://30e2de5661a74b5dae833b29a037cb30@sentry.io/1553241'});

ReactDOM.render(<Root />, document.getElementById('root'));
