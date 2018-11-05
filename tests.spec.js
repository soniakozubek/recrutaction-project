let pageObject = require('./page-object.js');

describe('Recruitment application tests', () => {

  let functions = new pageObject();
  // let EC = protractor.ExpectedConditions;

  beforeAll(() => {
    functions.login();
  });
  afterEach(() => {
    functions.openMainPage();
  });

  it('+Should be possible to navigate between folders.', () => {
    // browser.wait(EC.visibilityOf($('#abc')), 5000);
    functions.navigateTo('folderA');
    functions.navigateTo('folderB');
    functions.navigateTo('folderC');
    
    expect(browser.getCurrentUrl()).toBe('https://qarecruitment.egnyte.com/fl/WFFhkIrOdZ#folder-link/Sonia%20Kozubek/folderA/folderB/folderC')
    functions.getCurrentFolderName().then((name) => {
      expect(name).toBe('folderC')
    })
    expect(functions.checkIfFilesAreDisplayed()).toBe(true)
    expect(functions.countFilesInFolder()).toBe(1)
  });

  it('+Should be files sorted by name, descending.', () => {

    functions.navigateTo('Data Folder')

    functions.navigateTo('Data1')
    
    functions.changeSortingOrder('DESC')
    functions.checkIfFilesAreSortedByNameDesc()
    functions.changeSortingOrder('ASC')
  });

  it('+Should be possible to turn gallery view for folder with images.', () => {

    functions.navigateTo('Data Folder');
    functions.navigateTo('Data1');
    functions.turnGalleryView();

    expect(functions.checkIfFilesAreDisplayed()).toBe(false)
    expect(functions.checkIfImagesInGalleryViewAreDisplayed()).toBe(true)
    expect(functions.countImagesInGalleryView()).toBe(3)
    expect(functions.getListViewButton().isDisplayed()).toBeTruthy()
  });

  it('-Application should not crash after turning gallery view for folder without images.', () => {
    functions.navigateTo('Data Folder');
    functions.navigateTo('Data2');
    functions.turnGalleryView();
    expect(functions.checkIfFilesAreDisplayed()).toBe(false)
    expect(functions.getListViewButton().isDisplayed()).toBeTruthy()
    expect($('.gallery-empty').isDisplayed()).toBeTruthy()
  });

  fit('-Application should not crash after attempt of opening folder which not exist.', () => {

    functions.openNotExistingFolder()
    functions.getURLError().then(text => {
      expect(text[0].trim()).toBe('This folder is no longer available\nThis folder is no longer available. Contact the person who sent you this link to get a new link to the folder.');
    })
  });

});
