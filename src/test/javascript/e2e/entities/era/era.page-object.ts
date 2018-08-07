import { element, by, promise, ElementFinder } from 'protractor';

export class EraComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-era div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class EraUpdatePage {
    pageTitle = element(by.id('jhi-era-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    fromMaInput = element(by.id('field_fromMa'));
    toMaInput = element(by.id('field_toMa'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setFromMaInput(fromMa): promise.Promise<void> {
        return this.fromMaInput.sendKeys(fromMa);
    }

    getFromMaInput() {
        return this.fromMaInput.getAttribute('value');
    }

    setToMaInput(toMa): promise.Promise<void> {
        return this.toMaInput.sendKeys(toMa);
    }

    getToMaInput() {
        return this.toMaInput.getAttribute('value');
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
