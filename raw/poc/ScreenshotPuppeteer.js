require('chromedriver');
const puppeteer = require('puppeteer');
const fs = require('fs');
const docx = require('docx');
let image = [];
try{
(async function(){
        
    const doc = new docx.Document(); 
        let dir = './Screenshots';
        if (!fs.existsSync(dir)){
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
            await tab.goto("https://google.com/", {
                waitUntil: "networkidle0"
            });
            await tab.waitForSelector("img[alt]");
            
            await tab.screenshot({
                path : 'Screenshots\\ss1.jpeg',
                type : "jpeg",
                //encoding : "base64"
             });

            //image = docx.Media.addImage(doc, fs.readFileSync("E:\\Chan\\JS_Projects\\YoutubeAutomation\\raw\\poc\\Screenshots\\ss1.jpeg"), 600, 337 );              
             image.push(docx.Media.addImage(doc, fs.readFileSync('Screenshots\\ss1.jpeg'), 600, 337 ));
             image.push(docx.Media.addImage(doc, fs.readFileSync('Screenshots\\ss1.jpeg'), 600, 337 ));
             for(let i = 0; i < image.length; i++){
                doc.addSection({
                    children: [ new docx.Paragraph( image[i] ) ],
                });    
             }
            console.log('Paragraph written');
            
            docx.Packer.toBuffer(doc).then((buffer) => {
                fs.writeFileSync("My_Document.docx", buffer);
            });
            console.log('Writetn to file');
            
})();
}
catch(err){
    console.log("Error");
    console.log(err);
    
}