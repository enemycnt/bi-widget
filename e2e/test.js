import { Selector } from 'testcafe'; 

fixture `Main Page`// 
    .page `http://localhost:3000`;  

test('Select BNB category', async t => {
  const category = Selector('[data-testid="simple-category"]').withExactText(
    "BNB"
  );

  await t
    .click(category)
    .expect(category.getStyleProperty("background-color"))
    .eql("rgb(242, 242, 242)");
  const productName = Selector('[data-testid="product-name"]');
  const productNameCount = await productName.count;

  for (let i = 0; i < productNameCount; i++) {
    await t.expect(Selector(productName).nth(i).textContent).contains("/BNB");
  }
})

test('Search for eth/btc', async t => {
  const searchField = Selector('[data-testid="search-input"]')
  const productName = Selector('[data-testid="product-name"]');
  const productNameFirst = Selector('[data-testid="product-name"]').nth(0);


  await t
    .typeText(searchField, 'eth/btc')
    .hover(productNameFirst)
    .expect(productNameFirst.textContent).contains("ETH/BTC")

    const productNameCount = await productName.count;
    await t.expect(productNameCount).eql(1)

})