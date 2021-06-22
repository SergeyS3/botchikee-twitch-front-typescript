import React from 'react'
import { render } from 'react-dom'
import App from './App'

import './dist/materialize'

render(<App />, document.body.appendChild(document.createElement('div')))
