import { element, by, promise, ElementFinder } from 'protractor';

export class DinosaurComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-dinosaur div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class DinosaurUpdatePage {
    pageTitle = element(by.id('jhi-dinosaur-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    weightInput = element(by.id('field_weight'));
    lengthInput = element(by.id('field_length'));
    dietSelect = element(by.id('field_diet'));
    insertDtInput = element(by.id('field_insertDt'));
    modifiedDtInput = element(by.id('field_modifiedDt'));
    eraSelect = element(by.id('field_era'));
    cladeSelect = element(by.id('field_clade'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setWeightInput(weight): promise.Promise<void> {
        return this.weightInput.sendKeys(weight);
    }

    getWeightInput() {
        return this.weightInput.getAttribute('value');
    }

    setLengthInput(length): promise.Promise<void> {
        return this.lengthInput.sendKeys(length);
    }

    getLengthInput() {
        return this.lengthInput.getAttribute('value');
    }

    setDietSelect(diet): promise.Promise<void> {
        return this.dietSelect.sendKeys(diet);
    }

    getDietSelect() {
        return this.dietSelect.element(by.css('option:checked')).getText();
    }

    dietSelectLastOption(): promise.Promise<void> {
        return this.dietSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setInsertDtInput(insertDt): promise.Promise<void> {
        return this.insertDtInput.sendKeys(insertDt);
    }

    getInsertDtInput() {
        return this.insertDtInput.getAttribute('value');
    }

    setModifiedDtInput(modifiedDt): promise.Promise<void> {
        return this.modifiedDtInput.sendKeys(modifiedDt);
    }

    getModifiedDtInput() {
        return this.modifiedDtInput.getAttribute('value');
    }

    eraSelectLastOption(): promise.Promise<void> {
        return this.eraSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    eraSelectOption(option): promise.Promise<void> {
        return this.eraSelect.sendKeys(option);
    }

    getEraSelect(): ElementFinder {
        return this.eraSelect;
    }

    getEraSelectedOption() {
        return this.eraSelect.element(by.css('option:checked')).getText();
    }

    cladeSelectLastOption(): promise.Promise<void> {
        return this.cladeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    cladeSelectOption(option): promise.Promise<void> {
        return this.cladeSelect.sendKeys(option);
    }

    getCladeSelect(): ElementFinder {
        return this.cladeSelect;
    }

    getCladeSelectedOption() {
        return this.cladeSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
