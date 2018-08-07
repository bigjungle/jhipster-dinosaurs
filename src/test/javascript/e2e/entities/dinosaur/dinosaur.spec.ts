import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { DinosaurComponentsPage, DinosaurUpdatePage } from './dinosaur.page-object';

describe('Dinosaur e2e test', () => {
    let navBarPage: NavBarPage;
    let dinosaurUpdatePage: DinosaurUpdatePage;
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
        expect(dinosaurComponentsPage.getTitle()).toMatch(/Dinosaurs/);
    });

    it('should load create Dinosaur page', () => {
        dinosaurComponentsPage.clickOnCreateButton();
        dinosaurUpdatePage = new DinosaurUpdatePage();
        expect(dinosaurUpdatePage.getPageTitle()).toMatch(/Create or edit a Dinosaur/);
        dinosaurUpdatePage.cancel();
    });

    it('should create and save Dinosaurs', () => {
        dinosaurComponentsPage.clickOnCreateButton();
        dinosaurUpdatePage.setNameInput('name');
        expect(dinosaurUpdatePage.getNameInput()).toMatch('name');
        dinosaurUpdatePage.setWeightInput('5');
        expect(dinosaurUpdatePage.getWeightInput()).toMatch('5');
        dinosaurUpdatePage.setLengthInput('5');
        expect(dinosaurUpdatePage.getLengthInput()).toMatch('5');
        dinosaurUpdatePage.dietSelectLastOption();
        dinosaurUpdatePage.setInsertDtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(dinosaurUpdatePage.getInsertDtInput()).toContain('2001-01-01T02:30');
        dinosaurUpdatePage.setModifiedDtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(dinosaurUpdatePage.getModifiedDtInput()).toContain('2001-01-01T02:30');
        dinosaurUpdatePage.eraSelectLastOption();
        dinosaurUpdatePage.cladeSelectLastOption();
        dinosaurUpdatePage.save();
        expect(dinosaurUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
