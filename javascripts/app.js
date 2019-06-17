// Business Logic
var totalPizzaPrice = [];
function Order (size, crust) {
    this.size = size;
    this.crust = crust;
    this.pizzaPrice = 0;
    this.sidePrice = 100;
}
Order.prototype.pizzaCost = function () {
  if (this.size === "Small") {
    this.pizzaPrice += 600;
  } else if (this.size === "Medium") {
    this.pizzaPrice += 900;
  } else if (this.size === "Large") {
    this.pizzaPrice += 1200;
  }
  if (this.crust === "Gluten Free") {
    this.pizzaPrice += 100;
  } else if (this.crust === "Crispy") {
    this.pizzaPrice += 150;
  } else if (this.crust === "Stuffed") {
    this.pizzaPrice += 50;
  }
  return this.pizzaPrice;
}
Order.prototype.sideCost = function () {
  return this.sidePrice;
}

Order.prototype.finalCost = function () {
  var cartTotalPrice = 0;
  for (var arrayElement = 0; arrayElement < totalPizzaPrice.length; arrayElement ++) {
    cartTotalPrice += totalPizzaPrice[arrayElement];
  }
  return cartTotalPrice;
}

function Number (pizzaNumber){
  this.pizzaNumber = pizzaNumber;
}

Number.prototype.pizzaNumberPrice = function () {
  return pizzaNumber;
}

function Address (name, town, address) {
  this.name = name;
  this.town = town;
  this.address = address;
  this.deliveryAddress = (name + "  " + town + ", " + address);
}


//UI
var pizzaDetails;
var total;
var number;
$(document).ready(function(event) {
  $("#order-dits2").toggle();
  $("#delivery-dits").toggle();
  $("form#pizza-form").submit(function(event) {
    event.preventDefault();
    var type = $("select#Type").val();
    var size = $("select#Size").val();
    var crust = $("select#Crust").val();
    pizzaDetails = (" type: " + type + " size: " + size + " crust: " + crust);
    var newPizzaOrder = new Order(size, crust);
    newPizzaOrder.pizzaCost();
    totalPizzaPrice.push(newPizzaOrder.pizzaPrice);
    $("#pizza-details-dropdown").show();
    $("#final-cost").text(newPizzaOrder.finalCost());
    $("#pizza-details").append("<ul><li>" + pizzaDetails + "</li></ul>");
    $("#Type, #Size, #Crust" ).val("");
  });
  $("#pizza-details-dropdown").click(function() {
    $("#pizza-details").toggle();
  });

  var newSideOrder = new Order();
  $("#Mushrooms").click(function() {
    newSideOrder.sideCost();
    totalPizzaPrice.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "mushrooms topings" + "</li></ul>");
    $("#sides-details-complete").append("<ul><li>" + "mushroom topings" + "</li></ul>");
  });
    
  $("#Pepperoni").click(function() {
    newSideOrder.sideCost();
    totalPizzaPrice.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "pepperoni topings" + "</li></ul>");
    $("#sides-details-complete").append("<ul><li>" + "pepperoni" + "</li></ul>");
  });
  $("#Cheese").click(function() {
    newSideOrder.sideCost();
    totalPizzaPrice.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "Extra cheese topings" + "</li></ul>");
    $("#sides-details-complete").append("<ul><li>" + "Extra cheese topings" + "</li></ul>");
  });
  $("#sides-dropdown").click(function() {
    $("#sides-details").toggle();
  });

  $("#Order").click(function() {
    $("#order-dits").toggle();
    $("#order-dits2").toggle();
  });

  var newPizzaNumberOrder = new Order();
  $("form#pizza-number").submit(function(event) {
    event.preventDefault();
    number = $("#order-number").val();
    total = newPizzaNumberOrder.finalCost() * number;
    $("#pizza-details-dropdown").show();
    $("#total-cost").text(total);
  });
  $("#pizza-details-dropdown").click(function() {
    $("#pizza-details").toggle();
  });
  $("#Pick-up").click(function() {
    alert("we will be waiting for your arrival");
    $("#no").append("<ul><li>" + number + "</li></ul>");
    $("#pizza-details-complete").append("<ul><li>" + pizzaDetails + "</li></ul>");
    $("order-number" ).val("");
    $("#pod").append("<ul><li> pick up </li></ul>");
  });
  $("#Delivery").click(function() {
    alert("enter your address. this will cost an addition 100 bob");
    $("#Pick-up").toggle();
    $("#Delivery").toggle();
    $("#delivery-dits").toggle();
    $("#no").append("<ul><li>" + number + "</li></ul>");
  });
  $("form#delivery-dits").submit(function(event) {
    event.preventDefault();
    var name = $("#Name").val();
    var town = $("#Town").val();
    var address = $("#Address").val();
    total = total + 100;
    $("#total-cost").text(total);
    deliveryDetails = (" Name: " + name + " Town: " + town + " Address: " + address);
    $("#pizza-details-complete").append("<ul><li>" + pizzaDetails + "</li></ul>");
    $("#pod").append("<ul><li>" + deliveryDetails + "</li></ul>");
    $("order-number" ).val("");
  });
  