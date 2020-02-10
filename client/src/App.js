import React from 'react'
import { web3, contract } from './web3'

class App extends React.Component {

    state = {
        point: '',
        account: '',
        users: [],
        isLoading: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            [e.target.id]: e.target.value
        })
    }

    componentDidMount() {
        this.fetchAccount()
    }

    async fetchAccount() {
        const accounts = await web3.eth.getAccounts()
        console.log("Account 1 : ", accounts[0])
        this.setState({
            account: accounts[0]
        })

        const data = []
        const len = await contract.methods.getCount().call()
        console.log("size of users : ", len)
        for (var i = 0; i < len; i++) {
            var user = await contract.methods.getUser(i).call()
            this.state.users.push(user)
        }
        this.setState({ isLoading: true })

    }

    addUser = async (e) => {
        e.preventDefault()
        await contract.methods.addUser(this.state.name).send({
            from: this.state.account
        }).then(() => {
            console.log("Added")
        })
    }


    onClick = async (e) => {
        e.preventDefault()
        switch (e.target.name) {
            case "increase":
                return await contract.methods.increase(e.target.value, this.state.point).send({
                    from: this.state.account
                })
            case "decrease":
                return await contract.methods.decrease(e.target.value, this.state.point).send({
                    from: this.state.account
                })
            default:
                return null
        }
    }

    renderForm() {
        return (
            <form className="ui form">
                <div className="equal width fields">
                    <div className="field">
                        <label for="form-subcomponent-shorthand-input-first-name">ชื่อพนักงาน</label>
                        <div className="ui fluid input">
                            <input
                                type="text"
                                placeholder="ชื่อพนักงาน"
                                id="name"
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                    </div>

                </div>
                <button className="ui primary button" name="add" onClick={e => this.addUser(e)}>เพิ่มพนักงาน</button>                
            </form>
        )
    }

    renderList() {
        return (
            <table className="ui large table">
                <thead className="">
                    <tr className="">
                        <th className="">ชื่อพนักงาน</th>
                        <th className="">แต้มทั้งหมด</th>
                        <th></th>
                        <th></th>
                        <th></th>

                    </tr>
                </thead>
                <tbody className="">
                    {this.state.users.map((data, index) => {
                        return (
                            <tr className="" key={index}>
                                <td className="">{data[0]}</td>
                                <td className="">{data[1]}</td>
                                <td className="">
                                    <div className="ui point">
                                        <input
                                            type="number"
                                            id="point"
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </div>
                                </td>
                                <td className="">
                                    <button className="ui green button" name="increase" value={index} onClick={(e) => this.onClick(e)}>เพิ่มคะแนน</button>
                                </td>
                                <td className="">
                                    <button className="ui red button" name="decrease" value={index} onClick={(e) => this.onClick(e)}>หักคะแนน</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
                <tfoot className="">
                    <tr className="">
                        <th className="">{this.state.users.length} People</th>
                        <th className="">2 Approved</th>
                        <th className=""></th>
                    </tr>
                </tfoot>
            </table>
        )
    }


    render() {
        if (this.state.isLoading) {
            return (
                <div className="ui container"><br></br><br></br>
                    {this.renderForm()}
                    {this.renderList()}
                </div>
            )
        } else {
            return "Loading.."
        }

    }
}

export default App