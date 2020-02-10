pragma solidity >=0.4.24 <0.7.0;

contract Point {
    address public manager;

    constructor() public {
        manager = msg.sender;
    }

    struct User {
        string name;
        uint256 point;
    }

    User[] public users;

    function addUser(string memory _name) public {
        User memory newUser = User({
            name: _name,
            point: 0
        });
        users.push(newUser);
    }

    function increase(uint _index, uint _point) public {
        users[_index].point += _point;
    }

    function decrease(uint _index, uint _point) public {
        users[_index].point -= _point;
    }

    function getUser(uint _index) public view returns(string memory, uint) {
        return (users[_index].name, users[_index].point);
    }

    function getCount() public view returns(uint) {
        return users.length;
    }

}
