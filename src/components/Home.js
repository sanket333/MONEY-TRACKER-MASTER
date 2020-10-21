import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import TopComponent from './TopComponent';
import ExpList from './ExpList';
import ButtonSection from "./ButtonSection";
import ModalHeader from './ModalHeader';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBalance: 12000,
      income: 0,
      spendedMoney: 0,
      expenditure: [],
      showPopup: false,
      incomeType: false,
      addedMoney: 0,
      description: "",
      loaded: false
    };
  }

  handleInput = (event) => {
    const target = event.target
    const name = target.name
    this.setState({
      [name]: event.target.value
    })
  }

  componentDidMount() {
    console.log(localStorage.getItem('spendedMoney'))
    const expende = JSON.parse(localStorage.getItem('expenditure'));
    if (localStorage.getItem('spendedMoney')) {
      this.setState({
        spendedMoney: localStorage.getItem('spendedMoney'),
        income: localStorage.getItem('income'),
        currentBalance: localStorage.getItem('currentBalance'),
        expenditure: expende
      })
    }
  }


  getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today
  }

  updateSpendMoney = (money) => {
    var updateMoney = this.state.spendedMoney - money
    localStorage.setItem('spendedMoney', updateMoney);
    const spendMon = localStorage.getItem('spendedMoney')
    this.setState({
      spendedMoney: spendMon
    })
  }

  updateIncome = (money) => {
    var updateMoney = +this.state.income + +money
    console.log(money, "money")
    localStorage.setItem('income', updateMoney);
    const incMony = localStorage.getItem('income')
    this.setState({
      income: incMony
    })
  }

  calculateBalance = (money, spended) => {
    console.log(spended)
    const currentBal = spended ? this.spendedMoney(money) : this.incomeMoney(money)
    console.log(currentBal, "currentBal")
    // const currentBalance = localStorage.getItem('currentBalance');
    localStorage.setItem('currentBalance', currentBal);
    this.setState({
      currentBalance: localStorage.getItem('currentBalance')
    }, () => {
      localStorage.setItem('currentBalance', this.state.currentBalance);
    })
    spended ? this.updateSpendMoney(money) : this.updateIncome(money)

  }

  spendedMoney = (spendMoney) => {
    console.log(this.state.currentBalance - spendMoney, "<-=--=-=-=")
    return this.state.currentBalance - spendMoney;
  }

  incomeMoney = (addedMoney) => {
    console.log(+this.state.currentBalance + +addedMoney, addedMoney, "-=--=-")
    return (+this.state.currentBalance + +addedMoney);
  }

  handleSubmit = () => {
    var date = this.getDate()
    const moneyObj = {
      moneyValue: this.state.addedMoney,
      description: this.state.description,
      spended: this.state.incomeType,
      date: date
    }
    localStorage.setItem('expenditure', JSON.stringify(this.state.expenditure));
    this.setState({
      expenditure: this.state.expenditure.concat(moneyObj),
      showPopup: false,
      loaded: true
    }, () => {
      localStorage.setItem('expenditure', JSON.stringify(this.state.expenditure));
      this.calculateBalance(this.state.addedMoney, this.state.incomeType)

    })
  }

  showModal = () => {
    return (
      <Modal show={this.state.showPopup} >
        <Modal.Header >
          <Modal.Title>{this.state.incomeType ? "Add Spended Money" : "Add Received Money"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleFormSubmit}>
            <label>
              {this.state.incomeType ? "Spended Money" : "Add Money"}    : <input name="addedMoney" type="number" onChange={this.handleInput} />
            </label>
            <label>
              Add Description: <input name="description" type="text" onChange={this.handleInput} />
            </label>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.setState({ showPopup: false })} >
            Close
        </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Save Changes
        </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  popShow = (type) => {
    this.setState({
      showPopup: true,
      incomeType: type == "Add" ? false : true
    })
  }

  setPopopFalse =() => {
    this.setState({ showPopup: false })
  }

  render() {

    return (
      <Container >
        {/* {this.showModal()} */}
        <ModalHeader showPopup = {this.state.showPopup} incomeType = {this.state.incomeType} handleForm = {this.handleFormSubmit} handleInput = {this.handleInput} handleSubmit = {this.handleSubmit} setPopopFalse = {this.setPopopFalse} />
        <TopComponent/>
        <ExpList expend = {this.state.expenditure} />
       
        <ButtonSection popMethod = {()=>this.popShow("Add")} variant = {'success'} text = {'Add Money (+)'} />
        <ButtonSection popMethod = {() => this.popShow()} variant = {'danger'} text = {'spended Money (+)'}/>
        
      </Container>
    );
  }
}

export default Home;
