# YoutubeAutomator

## What is this project?<br />
This project helps in automation of taking screenshots of a youtube video being played and automatically compile them in word document in series of their capture.
It gives you several options  to take screenshots, the available options currently are <br />
* Take SS of  a given video link 
  * COMMAND : `node youtube -l "Link_Of_The_Video" Time_Interval_Between_SS`
* Take SS of a whole playlist of videos 
  * COMMAND : `node youtube -p "Link_Of_The_Playlist" Time_Interval_Between_SS` 
* If you aren't sure about which video to pick, you can simply enter the search you want to make, just like a normal youtube search, it will automatically go to YouTube and search for the given keywords and bring back the SS of the 1st video. 
  * COMMAND : `node youtube -s "Search_Anything" Time_Interval_Between_SS`

## How can I use it?<br />
1. Clone this respository in the VS Code(prefareable) on your system.<br />
2. Open the project folder in the terminal and intsall the required dependencies* by using the following command:<br />
                             ` npm install puppeteer docx rimraf ` <br />

3. Navigate to the fair\activity folder and delete the word document file if it exists there.<br />
4. In the VS Code open the ` example.txt ` file to get an example of list of commands available <br />
5. Whatever you will write will be used as search input for the video.<br />
6. Now navigate to the folder `fair\activity` in the cmd terminal and write pep and press enter to run pep.bat file.<br />
7. A chromium browser window will open and the search will take place automatically and the first video in search will be selected.<br />
8. Video will run in full screen mode screenshots will be taken** at 30s interval by default or you can change it in code.<br />
9. You are free to change tabs using alt+tab and wait for video to get finished.<br />
10. Once the video is over the screenshots will be added to a word document file in same folder itself.

**Puppeteer will install chromium which is of 150 mb approx.** <br />

## Other Notes: <br />
1) Allow access to chromium if your anti-virus interrupts.<br />
2) Make sure the word document is not open before starting the command pep.bat.
