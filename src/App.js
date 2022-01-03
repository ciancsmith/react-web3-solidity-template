import React, { useEffect, useState, Component } from "react";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';

class App extends Component {
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadBlockchainData() {
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        console.log("Accounts: ", accounts);
        this.setState({ account: accounts[0] });
        const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
        this.setState({ todoList });
        const taskCount = await todoList.methods.taskCount().call();
        this.setState({ taskCount });
        this.setState({ loading: false });
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            account: "",
            token: {},
            ethSwap: {},
            ethBalance: "0",
            tokenBalance: "0",
            loading: true,
        };
    }

    render() {
        return (
            <div className="Container">
                <h2>Hello World!</h2>
                <p>Your account id is: {this.state.account}</p>
            </div>
        );
    }
}

export default App;
