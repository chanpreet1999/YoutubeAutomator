# YoutubeAutomator

What is this project?<br />
This project helps in automation of taking screenshots of a youtube video being played <br />
and automatically compile them in word document in series of their capture.<br /> <br />

How can I use it?<br />
1. Clone this respository in the VS Code(prefareable) on your system.<br />
2. Open the project folder in the terminal and intsall the required dependencies* by using the following command:<br />
                             npm install puppeteer docx rimraf<br />
3. Navigate to the fair\activity folder and delete the word document file if it exists there.<br />
4. In the VS Code open the pep.bat file and edit the term written between double qoutes after node youtube.js.<br />
5. Whatever you will write will be used as search input for the video.<br />
6. Now navigate to the folder fair\activity in the cmd terminal and write pep and press enter to run pep.bat file.<br />
7. A chromium browser window will open and the search will take place automatically and the first video in search will be selected.<br />
8. Video will run in full screen mode screenshots will be taken** at 30s interval by default or you can change it in code.<br />
9. You are free to change tabs using alt+tab and wait for video to get finished.<br />
10. Once the video is over the screenshots will be added to a word document file in same folder itself.


\*Puppeteer will install chromium which is of 150 mb approx.<br />
\*\*If it does not take screenshots and closes the window, please navigate to the line number 59 of youtube.js in fair/activity and<br />
change ".ytp-iv-video-content" with ".video-stream.html5-main-video".<br /><br />
Other Notes: 1) Allow access to chromium if your anti-virus interrupts.<br />
2) Feel free to edit this Readme for grammar correction or any other edit.<br />
3) Make sure the word document is not open before starting the command pep.bat<br /><br />
What to expect in future releases?<br />
Good and useful features :)
