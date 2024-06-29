///
///  Copyright 2023 The original authors
///
///  Licensed under the Apache License, Version 2.0 (the "License");
///  you may not use this file except in compliance with the License.
///  You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
///  Unless required by applicable law or agreed to in writing, software
///  distributed under the License is distributed on an "AS IS" BASIS,
///  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
///  See the License for the specific language governing permissions and
///  limitations under the License.
///

import * as fs from 'node:fs';
const fileName = Bun.argv[2];

const stream = fs.createReadStream(fileName, {
  start: 66000, // does not emit any data nor exits nor throw error
  // if set to more than the size of buffer

  end: 12415863003,
});

let count = 0;

stream.on('data', (buff) => {
  if (++count > 1) {
    stream.destroy();
    return;
  }
  console.log(buff);
});
