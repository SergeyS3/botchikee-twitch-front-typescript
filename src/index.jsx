import React from 'react'
import { render } from 'react-dom'

import './dist/materialize'

import App from './App'

render(<App />, document.body.appendChild(document.createElement('div')))
