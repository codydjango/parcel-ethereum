import React from 'react'
import { render } from 'react-dom'

import 'babel-polyfill'
import '~/style.scss'
import web3Init from '~/web3Init'

window.web3 = web3Init(window)
console.log(web3.version)

const contractOptions = {
    from: '0x48e74B904c1729D4bfDF7BcbeC08e1029230f88D',
    gasPrice: '20000000000',
    gas: '3000000'
}
const contractAddress = '0x3c948fDE44E111Af10ed9760BC3bcf8bf900f31B'
const contractAbi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "x",
                "type": "string"
            }
        ],
        "name": "setMessage",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getMessage",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]


class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = { currentMessage: '' }
        this.contract = new web3.eth.Contract(contractAbi, contractAddress, contractOptions)
        this.textInput = React.createRef()

        this.focusTextInput = this.focusTextInput.bind(this)
        this.handleSetMessage = this.handleSetMessage.bind(this)
    }

    componentDidMount() {
        this.focusTextInput()
        this.updateMessage()
    }

    focusTextInput() {
        this.textInput.current.focus()
    }

    async updateMessage() {
        try {
            this.setState({ currentMessage: (await this.contract.methods.getMessage().call()) })
        } catch (err) {
            console.log('err', err)
        }
    }

    async handleSetMessage() {
        try {
            const userAccount = (await window.web3.eth.getAccounts())[0]
            const transaction = this.contract.methods.setMessage(this.textInput.current.value)
            const receipt = await transaction.send({
                from: userAccount
            })
        } catch (err) {
            console.log('err', err)
        }
    }

    render() {
        return (<div>
            <h1>Ethereum Secret Messenger</h1>
            <hr />

            <h5>current message: { this.state.currentMessage }</h5>
            <label htmlFor="userInput">This site writes a secret message to the Ethereum blockchain!</label>
            <input ref={ this.textInput } id="userInput" type="text" />
            <button id="setMessageButton" onClick={ this.handleSetMessage }>Set secret message</button>
        </div>)
    }
}

render(<App />, document.getElementById('root'))
