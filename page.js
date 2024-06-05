module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number',
    cardCodeField: '.card-second-row #code',
    comment: '#comment',
    iceCreamCount:'.counter-value',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton: 'div=Supportive',
    businessPlanButton: 'div=Business',
    paymentMethodButton: '.pp-text',
    addCardButton: 'div=Add card',
    messageToDriver: 'label=Message to the driver...',
    linkButton: 'button=Link',
    blanketAndHankerchiefButton: '.r-sw',
    blanketSwitch: '.switch-input',
    addedCard: 'div=Card',
    plusIceCream: 'div=+',
    smartButtonMain: '.smart-button-wrapper',
    // Modals
    phoneNumberModal: '.modal',
    carSearchModal: '.order-body',  
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addCreditCard: async function() {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
       // const paymentMethodModal = await $(this.paymentMethodModal);
      //  await paymentMethodModal.waitForDisplayed()
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
       // await cardNumberField.click();
        //await cardNumberField.setValue(this.placeholder);
    },
    fillMessageToDriver: async function() {
        const comment = await $(this.comment);
        await comment.waitForDisplayed();
        const messageToDriver = await $(this.messageToDriver)
        await messageToDriver.click();
        // adding comment in the input field
        await comment.setValue('Get me something');
    },
    selectSupportive: async function() {
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeDisplayed();
    },
    // clicking through payment modal to get to card details
    selectPaymentMethod: async function() {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
    },
    fillCard: async function() {
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        const cardCodeField = await $(this.cardCodeField);
        //setting the card value
        await cardNumberField.setValue('123400004321');
        await cardCodeField.click();
        //setting the CVV value
        await cardCodeField.setValue('12');
        await cardNumberField.click();
    },
    selectBusiness: async function() {
        const businessPlanButton = await $(this.businessPlanButton);
        await businessPlanButton.waitForDisplayed();
        await businessPlanButton.click();
        await expect(businessPlanButton).toBeDisplayed();
    },
};