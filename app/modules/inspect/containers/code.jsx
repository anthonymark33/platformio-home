/**
 * Copyright (c) 2014-present PlatformIO <contact@platformio.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CodeDefects } from '@inspect/components/code-defects.jsx';
import { DefectType } from '@inspect/types';
import PropTypes from 'prop-types';
import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { selectCodeCheckDefects } from '@inspect/selectors';

class CodePage extends React.PureComponent {
  static propTypes = {
    defects: PropTypes.arrayOf(DefectType)
  };

  render() {
    const { defects } = this.props;

    return (
      <div className="inspect-code-page">
        {!defects && (
          <div className="text-center">
            <Spin tip="Loading..." size="large" />
          </div>
        )}
        {defects && defects.length === 0 && (
          <ul className="background-message text-center">
            <li>No Defects</li>
          </ul>
        )}
        {defects && defects.length !== 0 && <CodeDefects defects={defects} />}
      </div>
    );
  }
}

// Redux
function mapStateToProps(state) {
  return {
    defects: selectCodeCheckDefects(state)
  };
}

export default connect(mapStateToProps)(CodePage);