const puppeteer = require('puppeteer');
const fs = require('fs');
const docx = require('docx');
const rimraf = require('rimraf');

let image = [];
let timer;

(async function () {
    try {

        //create Screenshots dir
        let dir = './Screenshots';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        //start browser
        let browser = await puppeteer.launch({      //these are launch options
            headless: false,
            defaultViewport: null,
            slowMo: 100,
            args: ["--start-maximized", "--incognito"]    //open in window maximized
        });
        let numberOfPages = await browser.pages();  //get array of open pages
        let tab = numberOfPages[0];                 //select the 1st one

        //-----------------------------------------------------------//
        let cmd = process.argv[2];
        timer = process.argv[4];
        timer = parseInt(timer);
        switch (cmd) {

            case '-l': console.log('Screenshot using link');
                let link = process.argv[3];
                await ssLinks(browser, tab, link);
                break;

            case '-s': console.log('Screenshot using Search');
                let search = process.argv[3];
                await ssSearch(browser, tab, search);
                break;

            case '-p': console.log('Playlist');
                let playlist = process.argv[3];
                await ssPlaylist(browser, tab, playlist);
                break;
            default: console.log('Wrong input');

        }
        //-----------------------------------------------------------//

        browser.close();
        rimraf(dir, function(err){
            if(err == null)
                console.log('Folder removed');
            else{
                console.log('error wile deleting folder');
                console.log(err);
            }    
        });
    } //try ends
    catch (err) {
        console.log(err);
    }
})();


async function ssLinks(browser, tab, link) {
    await tab.goto(link, {
        waitUntil: "networkidle0"
    });

    await afterVidOpens(browser, tab);
}

async function ssSearch(browser, tab, search) {

    await tab.goto("https://youtube.com/", {
        waitUntil: "networkidle0"
    });

    //search for the vid
    await tab.waitForSelector("#container input#search");
    await tab.type("#container input#search", search, { delay: 70 });
    await Promise.all([tab.keyboard.press("Enter"), tab.waitForNavigation({ waitUntil: "networkidle2" })]);
    await tab.waitForSelector("#contents a#video-title")

    //get the 1st result
    let firstRes = await tab.$("#contents a#video-title")
    await Promise.all([firstRes.click(), tab.waitForNavigation({ waitUntil: "networkidle2" })])
    await afterVidOpens(browser, tab);
}

async function afterVidOpens(browser, tab) {
    try {

        await tab.waitForSelector("button.ytp-fullscreen-button.ytp-button");   //fullscreen
        await tab.click("button.ytp-fullscreen-button.ytp-button");

        //click skip btn when add appears
        tab.waitForSelector(".ytp-ad-skip-button", { timeout: 10 * 1000 }).then(async function () {
            await tab.click('.ytp-ad-skip-button');
        }).catch(function (err) {
            console.log('No ad displayed');
        });

        //wait for vid content to start
        //await tab.waitForSelector(".ytp-iv-video-content", { timeout: 100 * 1000 });
        await tab.waitForSelector(".ytp-ad-persistent-progress-bar-container", { hidden: true });

        // //switch vid to 2x speed
        // await tab.waitForSelector(".video-stream.html5-main-video");
        // await tab.click(".video-stream.html5-main-video");
        // await tab.waitForSelector(".ytp-settings-button");
        // await tab.click(".ytp-settings-button");


        //remove promotional message if it appears
        tab.waitForSelector("#message-text").then(async function (ele) {
            await tab.waitForSelector(".button-container #dismiss-button");
            await tab.click(".button-container #dismiss-button")
        }).catch(function (err) {
            console.log("Promotion msg not displayed");
        })

        //focus on progress bar
        let progressBar = await tab.waitForSelector('.ytp-progress-bar');

        //get current and end values of the vid 
        let endVal = await tab.evaluate(el => el.getAttribute("aria-valuemax"), progressBar);
        let curVal = await tab.evaluate(el => el.getAttribute("aria-valuenow"), progressBar);
        endVal = parseInt(endVal);
        curVal = parseInt(curVal);
        console.log(`Value Now ${curVal} EndValue ${endVal}`);
        await takeScreenshots(browser, tab, curVal, endVal);


    } catch (err) {
        console.log('Error encountered after opening the vid');
        console.log(err);
    }
}

async function takeScreenshots(browser, tab, curVal, endVal) {
    try {

        let waitingTimeP;
        const doc = new docx.Document();

        for (let i = 1; curVal < endVal; i++) {
            await tab.screenshot({
                path: `Screenshots\\${i}.jpeg`,
                type: "jpeg",
            });
            waitingTimeP = tab.waitFor(timer * 1000);
            console.log(`${i} ss taken`);
            console.log('CurrentVal :' + curVal + 'End val :' + endVal);
            //image.push(docx.Media.addImage(doc, fs.readFileSync(`Screenshots\\${i}.jpeg`), 600, 337));
            image.push(docx.Media.addImage(doc, await fs.promises.readFile(`Screenshots\\${i}.jpeg`), 600, 337));
            doc.addSection({
                children: [new docx.Paragraph(image[i - 1])],
            });
            curVal += timer;
            if (curVal < endVal) {
                await waitingTimeP;
            }
        }

        console.log("No of ss taken :" + image.length);

        //finally write to the word document
        docx.Packer.toBuffer(doc).then(async function(buffer) {
            fs.writeFile("My_Youtube_Screenshots.docx", buffer, function(){
                console.log('Written to file');
            });
        });

    } catch (err) {
        console.log('Error while taking ss ');
    }
}