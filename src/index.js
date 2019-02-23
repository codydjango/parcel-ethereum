import React from 'react'
import { render } from 'react-dom'

import 'babel-polyfill'
import '~/style.scss'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (<div>
            <h1>hello</h1>
        </div>)
    }
}

render(<App />, document.getElementById('root'))
