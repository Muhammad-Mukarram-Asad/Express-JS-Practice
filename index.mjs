import express from "express";
const app = express();
const port = 3000;
const mockCustomers = [
  { id: 1, name: "ali", age: 20 },
  { id: 2, name: "mukii", age: 22 },
  { id: 3, name: "babar", age: 24 },
  { id: 4, name: "chanda", age: 26 },
  { id: 5, name: "rohit", age: 28 },
  { id: 6, name: "virat", age: 30 },
  { id: 7, name: "rabada", age: 32 },
];

const mockProducts = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mobile", price: 2000 },
  { id: 3, name: "TV", price: 3000 },
  { id: 4, name: "Washing Machine", price: 4000 },
  { id: 5, name: "Refrigerator", price: 5000 },
  { id: 6, name: "Microwave", price: 6000 },
  { id: 7, name: "Oven", price: 7000 },
  { id: 8, name: "Dishwasher", price: 8000 },
  { id: 9, name: "Fridge", price: 9000 },
  { id: 10, name: "Air Conditioner", price: 10000 },
];
// Tutorial:2 Get request

app.get("/", (request, response) => {
  // response.send("Hello World!");
  response.status(200).send({ message: "Hello World!" });
});

app.get("/api/customers", (request, response) => {
  console.log("request query: ", request.query);
  const {
    query: { key, value },
  } = request;

  if (key && value) {
    console.log(
      "key = ",
      key,
      ", value = ",
      value,
      "value lowercase = ",
      value.toLowerCase()
    );
    let result = mockCustomers.filter(
      (customer) => customer[key] === value.toLowerCase() || customer[key] === value.toUpperCase()
    );
    return response.send(result);
  } else response.status(200).send(mockCustomers);
});

app.get("/api/products", (request, response) => {
  console.log("request query: ", request.query);
  const {
    query: { key, value },
  } = request;

  if (key && value) {
    console.log(
      "key = ",
      key,
      ", value = ",
      value,
      "value lowercase = ",
      value.toLowerCase()
    );
    let result = mockProducts.filter(
      (prod) => prod[key] == parseInt(value)
    );
    return response.send(result);
  } else response.status(200).send(mockProducts);
});

// Tutorial:3 Route Parameters:

app.get("/api/customers/:id", (request, response) => {
  console.log(
    "id",
    request.params.id,
    "type of id = ",
    typeof request.params.id
  );
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId)) {
    return response
      .status(400)
      .send({ message: "Invalid Request! Id must be a number" });
  } else {
    const customer = mockCustomers.find((customer) => customer.id === parsedId);
    if (!customer) {
      return response.status(404).send({ message: "Customer not found" });
    }

    response.send(customer);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// Saylani Training of Node & Express.js by Sir Inzemam Malik
