import React from 'react'
import { render } from 'react-dom'

import 'babel-polyfill'
import '~/style.scss'
import web3Init from '~/web3Init'

window.web3 = web3Init(window)

const contractAddress = '0x35122239ed172a4537D382AC449A6941a94e5E51'
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

const Contract = window.web3.eth.contract(contractAbi)

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.contract = Contract.at(contractAddress)
        this.textInput = React.createRef()

        this.focusTextInput = this.focusTextInput.bind(this)
        this.handleSetMessage = this.handleSetMessage.bind(this)

        console.log(this.contract)
    }

    componentDidMount() {
    	this.focusTextInput()
    }

    focusTextInput() {
		this.textInput.current.focus()
    }

    handleSetMessage() {
    	const value = this.textInput.value
    	console.log('value', value)
    	this.contract.setMessage(value)
    }

    render() {
        return (<div>
	        <h1>Ethereum Secret Messenger</h1>
    	    <hr />
        	<label htmlFor="userInput">This site writes a secret message to the Ethereum blockchain!</label>
	        <input ref={ this.textInput } id="userInput" type="text" />
    	    <button id="setMessageButton" onClick={ this.handleSetMessage }>Set secret message</button>
        </div>)
    }
}

render(<App />, document.getElementById('root'))
