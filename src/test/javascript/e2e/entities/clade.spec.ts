import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Clade e2e test', () => {

    let navBarPage: NavBarPage;
    let cladeDialogPage: CladeDialogPage;
    let cladeComponentsPage: CladeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Clades', () => {
        navBarPage.goToEntity('clade');
        cladeComponentsPage = new CladeComponentsPage();
        expect(cladeComponentsPage.getTitle())
            .toMatch(/Clades/);

    });

    it('should load create Clade dialog', () => {
        cladeComponentsPage.clickOnCreateButton();
        cladeDialogPage = new CladeDialogPage();
        expect(cladeDialogPage.getModalTitle())
            .toMatch(/Create or edit a Clade/);
        cladeDialogPage.close();
    });

    it('should create and save Clades', () => {
        cladeComponentsPage.clickOnCreateButton();
        cladeDialogPage.setDescriptionInput('description');
        expect(cladeDialogPage.getDescriptionInput()).toMatch('description');
        cladeDialogPage.save();
        expect(cladeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CladeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-clade div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CladeDialogPage {
    modalTitle = element(by.css('h4#myCladeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descriptionInput = element(by.css('input#field_description'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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
