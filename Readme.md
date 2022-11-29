# Intro
This is the coding challenge for the NIB code test.

### Run test
1. run command `npm run start` from root directory

### Assumptions
* Data.json is representing a db and will always return correctly formatted and required data.

### Recommendations/things I would do if this wasn't a test
* If the order run is running off a db some sort of locking system may need to be implemented (more context/research required)
* Jest unit tests
* Eslint/prettier implementation
* Ordering from third party vendor would be smarter
* Restructure product data structure to: 
```
{
  productId,
  details: {
    description
  },
  stockData: {
    quantityOnHand,
    reorderThreshold,
    reorderAmount,
    deliveryLeadTime,
  }
}
```