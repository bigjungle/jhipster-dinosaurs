import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Era e2e test', () => {

    let navBarPage: NavBarPage;
    let eraDialogPage: EraDialogPage;
    let eraComponentsPage: EraComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Eras', () => {
        navBarPage.goToEntity('era');
        eraComponentsPage = new EraComponentsPage();
        expect(eraComponentsPage.getTitle())
            .toMatch(/Eras/);

    });

    it('should load create Era dialog', () => {
        eraComponentsPage.clickOnCreateButton();
        eraDialogPage = new EraDialogPage();
        expect(eraDialogPage.getModalTitle())
            .toMatch(/Create or edit a Era/);
        eraDialogPage.close();
    });

    it('should create and save Eras', () => {
        eraComponentsPage.clickOnCreateButton();
        eraDialogPage.setNameInput('name');
        expect(eraDialogPage.getNameInput()).toMatch('name');
        eraDialogPage.setFromMaInput('5');
        expect(eraDialogPage.getFromMaInput()).toMatch('5');
        eraDialogPage.setToMaInput('5');
        expect(eraDialogPage.getToMaInput()).toMatch('5');
        eraDialogPage.save();
        expect(eraDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EraComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-era div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class EraDialogPage {
    modalTitle = element(by.css('h4#myEraLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    fromMaInput = element(by.css('input#field_fromMa'));
    toMaInput = element(by.css('input#field_toMa'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setFromMaInput = function(fromMa) {
        this.fromMaInput.sendKeys(fromMa);
    };

    getFromMaInput = function() {
        return this.fromMaInput.getAttribute('value');
    };

    setToMaInput = function(toMa) {
        this.toMaInput.sendKeys(toMa);
    };

    getToMaInput = function() {
        return this.toMaInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
