/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-console */
/* eslint-disable no-undef */

const assert = require('assert');
const { assertHeader } = require('./testutils');
const Website = require('./website');
const config = require('./config');

describe(`Test the static content ${config.siteURL}`, () => {
  const response = {};
  const site = new Website(config.siteURL);

  // eslint-disable-next-line func-names
  before(function (done) {
    this.timeout(config.httpRequestTimeoutMsec);
    site.getContent('/static.html', (resp) => {
      Object.assign(response, resp);
      done();
    });
  });

  it('Contains the expected static content', () => {
    assert(response.raw.includes('this is static html!'));
  });

  it('Has the correct Content-Type', () => {
    const expected = /text\/html.*/;
    assertHeader(response.headers, 'Content-Type', expected);
  });
});