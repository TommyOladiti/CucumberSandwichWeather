const Browser = require("./Browser");
const browser = new Browser();
const timeout = 20000;

beforeAll(async () => {
    browser.browserBuild();
}, timeout);

beforeEach(async () => {
    await browser.browserNavigate('http://localhost:8080');
}, timeout);

afterAll(async () => {
    await browser.browserExit();
}, timeout);

test("Initially has a header", async () => {
        const element = await browser.getElementByCss('h1');
        const tagName = await element.getTagName();
        expect(tagName).toBe('h1');
})



test("Location heading correct after a search", async () => {
    const newItem = "Weetabix";

    //
    // Emulate searching for the location
    //

    const searchInput = await browser.getElementByCss('#new-item');
    const searchSubmit = await browser.getElementByCss('#create-item');

    await searchInput.sendKeys(newItem);
    await searchSubmit.click();
    await browser.waitForElementByCss('#action-4', timeout/2);

    //
    // Check location heading exists
    //

    const element = await browser.getElement("item-1");
    const tagName = await element.getTagName();
    expect(tagName).toBe('item');

    //
    // Check location heading matches
    //

    const text = await element.getText();

    //
    // Originally just compared text with location
    // But weather warnings were unaccounted for!
    // E.g., Bridgnorth - Weather warnings issued
    // So switched to matching start of string
    //
    
    expect(text.startsWith(newItem)).toBe(true);
}, timeout);

//Remove

// test("Location heading correct after a search", async () => {
//     const remove = "A dozen eggs";

//     //
//     // Emulate searching for the location
//     //

//     const removeSubmit = await browser.getElementByCss('#action-2');

//     await removeSubmit.click();
//     await browser.waitForElementByCss('#action-4', timeout/2);

//     //
//     // Check location heading exists
//     //

//     const element = await browser.getElement("item-1");
//     const tagName = await element.getTagName();
//     expect(tagName).toBe('item');

//     //
//     // Check location heading matches
//     //

//     const text = await element.getText();

//     //
//     // Originally just compared text with location
//     // But weather warnings were unaccounted for!
//     // E.g., Bridgnorth - Weather warnings issued
//     // So switched to matching start of string
//     //
    
//     expect(text.startsWith(newItem)).toBe(true);
// }, timeout);

































// test("", async () => {
//     const element = await browser.getElementByCss('.orbit-header-links.domestic > ul > li:nth-child(3) > a > span');
//     const text = await element.getText();
//     expect(text).toBe('Sport');
// })

// test("Initially has a search bar", async () => {
//     const element = await browser.getElement("ls-c-search__input-label");
//     const tagName = await element.getTagName();
//     expect(tagName).toBe('input');
// });

// test("Initially has a search submit button", async () => {
//     const element = await browser.getElementByCss('button.ls-c-search__submit');
//     const tagName = await element.getTagName();
//     expect(tagName).toBe('button');
// });

// test("Initially has no location heading", async () => {
//     await expect(() => browser.getElement("wr-location-name-id")).rejects.toThrow();
// });

// test("Location heading correct after a search", async () => {
//     const location = "Bridgnorth";

//     //
//     // Emulate searching for the location
//     //

//     const searchInput = await browser.getElement('ls-c-search__input-label');
//     const searchSubmit = await browser.getElementByCss('button.ls-c-search__submit');

//     await searchInput.sendKeys(location);
//     await searchSubmit.click();
//     await browser.waitForElementByCss('.wr-c-observations__heading', timeout/2);

//     //
//     // Check location heading exists
//     //

//     const element = await browser.getElement("wr-location-name-id");
//     const tagName = await element.getTagName();
//     expect(tagName).toBe('h1');

//     //
//     // Check location heading matches
//     //

//     const text = await element.getText();

//     //
//     // Originally just compared text with location
//     // But weather warnings were unaccounted for!
//     // E.g., Bridgnorth - Weather warnings issued
//     // So switched to matching start of string
//     //
    
//     expect(text.startsWith(location)).toBe(true);
// }, timeout);