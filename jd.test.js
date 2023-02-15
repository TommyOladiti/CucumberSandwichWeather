const Browser = require("./Browser");
const browser = new Browser();
const timeout = 20000;

beforeAll(async () => {
    browser.browserBuild();
}, timeout);

beforeEach(async () => {
    await browser.browserNavigate('https://www.jdsports.co.uk/page/mens/');
}, timeout);

afterAll(async () => {
    await browser.browserExit();
}, timeout);

test("Complex CSS selector", async () => {
    const element = await browser.getElementByCss('#dropNav .maxWidth>ul>li:nth-child(5)>a');
    const text = await element.getText();
    expect(text).toBe('Collections');
})

test("Initially has a search bar", async () => {
    const element = await browser.getElement("speechInput");
    const tagName = await element.getTagName();
    expect(tagName).toBe('span');
});

test("Initially has a go submit button", async () => {
    const element = await browser.getElementByCss('#signup form button');
    const tagName = await element.getTagName();
    expect(tagName).toBe('button');
});

// test("Initially has no location heading", async () => {
//     await expect(() => browser.getElement("wr-location-name-id")).rejects.toThrow();
// });

test("Location correct after a search", async () => {
    const buttonname = "M112LZ";

    //#storePageContent #storeFindContent .storeList li:nth-child(1) .storeCard .overview .storeName
    // Emulate searching for the location
    //

    const searchInput = await browser.getElementByCss('.postcode');
    const searchSubmit = await browser.getElementByCss('.postcode-go');

    await searchInput.sendKeys(buttonname);
    await searchSubmit.submit();
    await browser.waitForElementByCss('#storePageContent #storeFindContent .storeList li:nth-child(1) .storeCard.guest .overview .storeDistance', timeout/2);

    //
    // Check location heading exists
    //

    const element = await browser.getElementByCss('#storePageContent #storeFindContent .storeList li:nth-child(1) .storeCard .overview .storeName');
    const tagName = await element.getTagName();
    expect(tagName).toBe('h3');

    //
    // Check location heading matches
    //

    // const text = await element.getText();

    // //
    // // Originally just compared text with location
    // // But weather warnings were unaccounted for!
    // // E.g., Bridgnorth - Weather warnings issued
    // // So switched to matching start of string
    // //
    
    // expect(text.startsWith(buttonname)).toBe(true);
}, timeout);