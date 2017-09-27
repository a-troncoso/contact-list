import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import './sass/bulma.sass'

import App from './components/App'

render(<App />, document.getElementById('root'))
