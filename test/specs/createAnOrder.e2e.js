const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
// selecting the supportive plan
    it('should click Supportive Plan button', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeDisplayed();
    })
//using the selectPaymentMethod and fillCard modules to link a credit card
    it('should add a credit card number and CVV in payment modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectPaymentMethod();
        await page.fillCard();
        await $(page.linkButton).click();
        await expect($(page.addedCard)).toBeDisplayed();

    });
// using the fillMessageToDriver module to add a message to the driver
    it('should add message to the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillMessageToDriver();
        await expect($(page.comment)).toBeDisplayed('Get me something');
    });
// Selecting the blanket and handkerchief option in the Suppotive Plan
    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const blanketAndHankerchiefButton = await $(page.blanketAndHankerchiefButton);
        await blanketAndHankerchiefButton.waitForDisplayed();
        await blanketAndHankerchiefButton.click();
        await expect($(page.blanketSwitch)).toBeChecked();
    });
// adding 2 ice creams to the supportive plan items
    it('should order 2 ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const plusIceCream = await $(page.plusIceCream);
        await plusIceCream.waitForDisplayed();
        await plusIceCream.click();
        await plusIceCream.click();
        const iceCreamCount = await $(page.iceCreamCount).getText();
        await expect(iceCreamCount).toBe('2');
    });
// selecting the business plan and ordering the ride
    it('should order a ride and the car search modal appears', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectBusiness();
        const smartButtonMain = await $(page.smartButtonMain);
        await smartButtonMain.waitForDisplayed();
        await smartButtonMain.click();
        const carSearchModal = await $(page.carSearchModal);
        await carSearchModal.waitForDisplayed();
        await expect(carSearchModal).toBeDisplayed();
    });
})

