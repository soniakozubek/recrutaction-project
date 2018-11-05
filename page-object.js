let pageObject = function () {

    this.url = 'https://qarecruitment.egnyte.com/fl/WFFhkIrOdZ#folder-link';
    this.password = 'VmagXuHh';
    this.passwordField = $('#password');
    this.continueButton = element(by.linkText('Continue'));
    this.listOfFilesFromFolder = $$('.file-info');

    this.openLoginPage = () => {
        browser.waitForAngularEnabled(false);
        browser.get(this.url);
    };

    this.openMainPage = () => {
        browser.get('https://qarecruitment.egnyte.com/fl/WFFhkIrOdZ#folder-link/Sonia%20Kozubek');
        browser.waitForAngular();
    };
    
    this.openNotExistingFolder = () => {
        browser.get('https://qarecruitment.egnyte.com/fl/WFFhkIrOdZ#folder-link/Sonia%20Kozubekk/folderA/folderZ');
        browser.waitForAngular();
    };
    
    this.enterPassword = () => {
        this.passwordField.sendKeys(this.password);
        this.continueButton.click();
    };
    
    this.login = () => {
        this.openLoginPage();
        this.enterPassword();
        browser.waitForAngular();
    };

    this.navigateTo = ($folderName) => {
        let element = $('span[title="' + $folderName + '"]');
        browser.wait(protractor.ExpectedConditions.presenceOf(element), 5000);
            element.click();
            browser.sleep(1000);
            browser.waitForAngular();
    };

    this.getCurrentFolderName = () => {
        return $('.crumb.crumb-current').getText();
    };
    
    this.checkIfFilesAreDisplayed = () => {
        return $$('.file-info').isPresent();
    };

    this.checkIfImagesInGalleryViewAreDisplayed = () => {
        return $$('.gallery-item.ui-selectee').isPresent();
    };
    
    this.countFilesInFolder = () => {
        return $$('.file-info').count();
    };
    
    this.countImagesInGalleryView = () => {
        return $$('.gallery-item.ui-selectee').count();
    };
    
    this.changeSortingOrder = ($order) => {
        $$('.dropdown-toggle').click();
        $$('li[data-order="' + $order + '"]').click();
        browser.sleep(1000);
    };

    this.getFilesNames = () => {
        let listOfFiles = []
        return this.listOfFilesFromFolder.each((element) => {
            element.getText().then((text) => {
                let el = text.split("\n", 1)
                listOfFiles.push(el[0])
            })
        }).then(() =>
            listOfFiles
        )
    };

    this.checkIfFilesAreSortedByNameDesc = async () => {
        await this.getFilesNames()
            .then((list) => {
                let listofSortedNames = list.sort((a, b) => {
                    let name1 = a[1].toLowerCase();
                    let name2 = b[1].toLowerCase();
                    const comp = (a, b) => (a < b ? -1 : (a > b ? 1 : 0));
                    return comp(name1, name2);
                })
                this.getFilesNames().then(($list) => {
                    expect($list).toEqual(listofSortedNames);
                })
            });
    };

    this.turnGalleryView = () => {
        $$('button[data-mode="gallery"]').click();
        browser.sleep(1000);
    };

    this.getListViewButton = () => {
        return $$('button[data-mode="list"]');
    };

    this.getURLError = () => {
        let element = $$('.span9.description');
        browser.wait(protractor.ExpectedConditions.presenceOf(element), 10000);
        return element.getText();  
    }
};
module.exports = pageObject;
