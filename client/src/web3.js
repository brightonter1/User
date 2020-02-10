const Web3 = require('web3')
const Point = require('./contracts/Point.json')

const contractAddr = '0x674b5C9DbD79B8bB2a670Cf239A01c277298cd51' // truffle migrate แล้วจะได้มา
export const web3 = new Web3('http://127.0.0.1:7545') // ใช้ Ganache local network จำลองในการรันคอนแทค
export const contract = new web3.eth.Contract(Point.abi, contractAddr) // truffie compile แล้วจะได้คอนแทคแบบ json มาเพิ่อให้ web3 เรียกใช้