// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CanteenManagement is Ownable, ERC721URIStorage {
    struct Order {
        uint256 orderId;
        uint256 price;
        bool isPaid;
        address paidBy;
        bool purchased;
    }

    mapping(uint256 => Order) public orders;

    constructor() ERC721("CanteenNFT", "CNFT") {}

    event OrderCreated(uint256 orderId, uint256 price);
    event OrderPaid(uint256 orderId, address paidBy);
    event OrderPurchased(uint256 orderId, address paidBy);

    function createOrder(uint256 orderId, uint256 price) external onlyOwner {
        orders[orderId] = Order({
            orderId: orderId,
            price: price,
            isPaid: false,
            paidBy: address(0),
            purchased: false
        });

        emit OrderCreated(orderId, price);
    }

    function payOrder(uint256 orderId, string memory orderURI) external payable {
        Order storage order = orders[orderId];
        require(order.orderId == orderId, "Order does not exist");
        require(!order.isPaid, "Order is already paid");
        require(msg.value == order.price, "Incorrect payment amount");

        order.isPaid = true;
        order.paidBy = msg.sender;

        emit OrderPaid(orderId, msg.sender);

        _mint(msg.sender, orderId);
        _setTokenURI(orderId, orderURI);
    }

    function orderPurchased(uint256 orderId, address payer) external onlyOwner {
        Order storage order = orders[orderId];
        require(order.orderId == orderId, "Order does not exist");
        require(order.isPaid, "Order is not paid yet");
        require(order.paidBy == payer, "Invalid payer");

        order.purchased = true;

        emit OrderPurchased(orderId, order.paidBy);
    }
}
