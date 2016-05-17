import React from 'react'
import ReactDOM from 'react-dom'

const root = document.querySelector('#app')
const Test = () => React.createElement(Lettering, { type: 'all' }, 'Test')

ReactDOM.render(React.createElement(Test, null), root)
