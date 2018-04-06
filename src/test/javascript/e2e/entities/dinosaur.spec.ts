import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Dinosaur e2e test', () => {

    let navBarPage: NavBarPage;
    let dinosaurDialogPage: DinosaurDialogPage;
    let dinosaurComponentsPage: DinosaurComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Dinosaurs', () => {
        navBarPage.goToEntity('dinosaur');
        dinosaurComponentsPage = new DinosaurComponentsPage();
        expect(dinosaurComponentsPage.getTitle())
            .toMatch(/Dinosaurs/);

    });

    it('should load create Dinosaur dialog', () => {
        dinosaurComponentsPage.clickOnCreateButton();
        dinosaurDialogPage = new DinosaurDialogPage();
        expect(dinosaurDialogPage.getModalTitle())
            .toMatch(/Create or edit a Dinosaur/);
        dinosaurDialogPage.close();
    });

    it('should create and save Dinosaurs', () => {
        dinosaurComponentsPage.clickOnCreateButton();
        dinosaurDialogPage.setNameInput('name');
        expect(dinosaurDialogPage.getNameInput()).toMatch('name');
        dinosaurDialogPage.setWeightInput('5');
        expect(dinosaurDialogPage.getWeightInput()).toMatch('5');
        dinosaurDialogPage.setLengthInput('5');
        expect(dinosaurDialogPage.getLengthInput()).toMatch('5');
        dinosaurDialogPage.dietSelectLastOption();
        dinosaurDialogPage.setInsertDtInput(12310020012301);
        expect(dinosaurDialogPage.getInsertDtInput()).toMatch('2001-12-31T02:30');
        dinosaurDialogPage.setModifiedDtInput(12310020012301);
        expect(dinosaurDialogPage.getModifiedDtInput()).toMatch('2001-12-31T02:30');
        dinosaurDialogPage.eraSelectLastOption();
        dinosaurDialogPage.cladeSelectLastOption();
        dinosaurDialogPage.save();
        expect(dinosaurDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DinosaurComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-dinosaur div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class DinosaurDialogPage {
    modalTitle = element(by.css('h4#myDinosaurLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    weightInput = element(by.css('input#field_weight'));
    lengthInput = element(by.css('input#field_length'));
    dietSelect = element(by.css('select#field_diet'));
    insertDtInput = element(by.css('input#field_insertDt'));
    modifiedDtInput = element(by.css('input#field_modifiedDt'));
    eraSelect = element(by.css('select#field_era'));
    cladeSelect = element(by.css('select#field_clade'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setWeightInput = function(weight) {
        this.weightInput.sendKeys(weight);
    };

    getWeightInput = function() {
        return this.weightInput.getAttribute('value');
    };

    setLengthInput = function(length) {
        this.lengthInput.sendKeys(length);
    };

    getLengthInput = function() {
        return this.lengthInput.getAttribute('value');
    };

    setDietSelect = function(diet) {
        this.dietSelect.sendKeys(diet);
    };

    getDietSelect = function() {
        return this.dietSelect.element(by.css('option:checked')).getText();
    };

    dietSelectLastOption = function() {
        this.dietSelect.all(by.tagName('option')).last().click();
    };
    setInsertDtInput = function(insertDt) {
        this.insertDtInput.sendKeys(insertDt);
    };

    getInsertDtInput = function() {
        return this.insertDtInput.getAttribute('value');
    };

    setModifiedDtInput = function(modifiedDt) {
        this.modifiedDtInput.sendKeys(modifiedDt);
    };

    getModifiedDtInput = function() {
        return this.modifiedDtInput.getAttribute('value');
    };

    eraSelectLastOption = function() {
        this.eraSelect.all(by.tagName('option')).last().click();
    };

    eraSelectOption = function(option) {
        this.eraSelect.sendKeys(option);
    };

    getEraSelect = function() {
        return this.eraSelect;
    };

    getEraSelectedOption = function() {
        return this.eraSelect.element(by.css('option:checked')).getText();
    };

    cladeSelectLastOption = function() {
        this.cladeSelect.all(by.tagName('option')).last().click();
    };

    cladeSelectOption = function(option) {
        this.cladeSelect.sendKeys(option);
    };

    getCladeSelect = function() {
        return this.cladeSelect;
    };

    getCladeSelectedOption = function() {
        return this.cladeSelect.element(by.css('option:checked')).getText();
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
