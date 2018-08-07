import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CladeComponentsPage, CladeUpdatePage } from './clade.page-object';

describe('Clade e2e test', () => {
    let navBarPage: NavBarPage;
    let cladeUpdatePage: CladeUpdatePage;
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
        expect(cladeComponentsPage.getTitle()).toMatch(/Clades/);
    });

    it('should load create Clade page', () => {
        cladeComponentsPage.clickOnCreateButton();
        cladeUpdatePage = new CladeUpdatePage();
        expect(cladeUpdatePage.getPageTitle()).toMatch(/Create or edit a Clade/);
        cladeUpdatePage.cancel();
    });

    it('should create and save Clades', () => {
        cladeComponentsPage.clickOnCreateButton();
        cladeUpdatePage.setDescriptionInput('description');
        expect(cladeUpdatePage.getDescriptionInput()).toMatch('description');
        cladeUpdatePage.save();
        expect(cladeUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
