function request(order)
{console.log("customer order",order);
response(function()
{
console.log("Deliverde data",order);
});
}

function response(callback)
{
setTimeout(callback,5000);
}
request(1);
request(2);
request(3);
request(4);
request(5);
request(6);
request(7);
request(8);
request(9);
