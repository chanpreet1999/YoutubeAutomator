require('chromedriver');
const puppeteer = require('puppeteer');

let search = process.argv[2];
(async function () {
    try {
        //start browser
        let browser = await puppeteer.launch({      //these are launch options
            headless: false,
            defaultViewport: null,
            slowMo: 100,
            args: ["--start-maximized", "--incognito"]    //open in window maximized
        });
        let numberOfPages = await browser.pages();  //get array of open pages
        let tab = numberOfPages[0];                 //select the 1st one
        await tab.goto("https://youtube.com/", {
            waitUntil: "networkidle0"
        });
        await tab.waitForSelector("#container input#search");
        await tab.type("#container input#search", search, { delay: 100 });
        await Promise.all([tab.keyboard.press("Enter"), tab.waitForNavigation({ waitUntil: "networkidle2" })]);
        await tab.waitForSelector("#contents a#video-title")
        let firstRes = await tab.$("#contents a#video-title")
        await Promise.all([firstRes.click(), tab.waitForNavigation({ waitUntil: "networkidle2" })])
        await tab.waitForSelector("button.ytp-fullscreen-button.ytp-button");
        await tab.click("button.ytp-fullscreen-button.ytp-button");


        await tab.waitForSelector(".ytp-iv-video-content", { timeout: 90 * 1000 });

        tab.waitForSelector("#message-text").then(async function (ele) {
            await tab.waitForSelector(".button-container #dismiss-button");
            await tab.click(".button-container #dismiss-button")
        }).catch(function (err) {
            console.log("Promotion msg  not displayed");
        })

        
        let progressBar = await tab.waitForSelector('.ytp-progress-bar');
        await tab.click(".ytp-iv-video-content");
        await tab.click(".ytp-iv-video-content");
        
        await tab.focus(".ytp-progress-bar");
        await tab.keyboard.type(".ytp-progress-bar", String.fromCharCode(39));
        await tab.keyboard.type(".ytp-progress-bar", String.fromCharCode(39));
        await tab.keyboard.type(".ytp-progress-bar", String.fromCharCode(39));
        await tab.keyboard.type(".ytp-progress-bar", String.fromCharCode(39));
        await tab.keyboard.type(".ytp-progress-bar", String.fromCharCode(39));
        await tab.keyboard.type(".ytp-progress-bar", String.fromCharCode(39));
        // await tab.type(".ytp-iv-video-content", String.fromCharCode(39));
        // await tab.type(".ytp-iv-video-content", String.fromCharCode(39));
        // await tab.type(".ytp-iv-video-content", String.fromCharCode(39));
        let curVal =  await tab.evaluate(el => el.getAttribute("aria-valuenow"), progressBar);
        const endVal = await tab.evaluate(el => el.getAttribute("aria-valuemax"), progressBar);
        console.log(`Value Now ${curVal} EndValue ${endVal}`);
        
        
    } //try ends
       catch (err) {
        console.log(err);
    }
})();

async function navigatorfn(tab, selector) {
    Promise.all([tab.click(selector), tab.waitForNavigation({ waitUntil: "networkidle2" })]);
}
