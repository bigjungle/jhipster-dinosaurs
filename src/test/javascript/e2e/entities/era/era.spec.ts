import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { EraComponentsPage, EraUpdatePage } from './era.page-object';

describe('Era e2e test', () => {
    let navBarPage: NavBarPage;
    let eraUpdatePage: EraUpdatePage;
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
        expect(eraComponentsPage.getTitle()).toMatch(/Eras/);
    });

    it('should load create Era page', () => {
        eraComponentsPage.clickOnCreateButton();
        eraUpdatePage = new EraUpdatePage();
        expect(eraUpdatePage.getPageTitle()).toMatch(/Create or edit a Era/);
        eraUpdatePage.cancel();
    });

    it('should create and save Eras', () => {
        eraComponentsPage.clickOnCreateButton();
        eraUpdatePage.setNameInput('name');
        expect(eraUpdatePage.getNameInput()).toMatch('name');
        eraUpdatePage.setFromMaInput('5');
        expect(eraUpdatePage.getFromMaInput()).toMatch('5');
        eraUpdatePage.setToMaInput('5');
        expect(eraUpdatePage.getToMaInput()).toMatch('5');
        eraUpdatePage.save();
        expect(eraUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
