require('chromedriver');
const swd = require('selenium-webdriver');

//input
let input = process.argv.slice(2);
let search = input[0];

//builder object
const bldr = new swd.Builder();
//get driver
//represents 1 tab
let driver = bldr.forBrowser('chrome').build();


//https://www.youtube.com/results?search_query=study
(async function(){
    try{
        //maximize window
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({
        implicit: 10*1000,
        pageLoad : 10*1000
    });

    await driver.get("https://youtube.com")
    await waitForCompleteLoad();
    let searchBox = await driver.findElement(swd.By.css("#container input#search"));
    await searchBox.sendKeys(search);
    await searchBox.sendKeys(swd.Key.ENTER);
    await  driver.sleep(1*1000)
    await driver.wait(swd.until.urlContains(search),5 * 100); 
    await waitForCompleteLoad();
    let firstRes = await driver.findElement(swd.By.css(".yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail"));
    await waitForElement(firstRes);    
    await firstRes.click();
    //fullscreen the video
    let fullscreenBtn = await driver.findElement(swd.By.css("button.ytp-fullscreen-button.ytp-button"));

    await fullscreenBtn.click();
}// try ends
    catch(err){
        console.log(err);
        
    } 
})();

async function waitForCompleteLoad(){
    await driver.wait(async function() {
        const readyState = await driver.executeScript('return document.readyState');
        return readyState === 'complete';
      });

}

async function waitForElement(element){
    try{
        driver.wait(function () {
     //   return driver.isElementPresent(swd.By.css(element));
        return driver.wait(swd.until.elementIsVisible(element));
        }, 10*1000);
    }catch(err){
        console.log(err);
        
    }
        
}
/*
    TRIAL METHODS REMOVED FROM under let progressBar line of main activity
        await tab.focus(".ytp-progress-bar");
        await tab.keyboard.type(".ytp-progress-bar", String.fromCharCode(39));
        await tab.keyboard.type(".ytp-progress-bar", String.fromCharCode(39));
        await tab.type(".ytp-iv-video-content", String.fromCharCode(39));
        await tab.type(".ytp-iv-video-content", String.fromCharCode(39));

*/