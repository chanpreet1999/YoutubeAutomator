# YoutubeAutomator
This project helps in automation of taking screenshots of a youtube video being played and automatically compile them in word document in series of their capture.<br />
## List of Commands<br />
* Take SS of  a given video link 
  * COMMAND : `node youtube -s "Search_Anything" Time_Interval_Between_SS "File_Name"`
* Take SS of a whole playlist of videos (serial)
  * COMMAND : `node youtube -l "Link_Of_The_Video" Time_Interval_Between_SS "File_Name"` 
* If you aren't sure about which video to pick, you can simply enter the search you want to make, just like a normal youtube search, it will automatically go to YouTube and search for the given keywords and bring back the SS of the 1st video. 
  * COMMAND : `node youtube -p "Link_Of_The_Playlist" Time_Interval_Between_SS "File_Name"`
* Take SS of  a playlist of videos parallely, 5 tabs(videos) will be opened simultaneously.   
  * COMMAND : `node youtube -pParallel "Link_Of_The_Playlist" Time_Interval_Between_SS "File_Name"`
## Usage<br />
1. Clone this respository on your system.
2. Open the root folder of the project in the terminal and install the required dependencies* by using the following command:<br />
                             ` npm install` <br />
  **Puppeteer will install chromium which is of 150 mb approx.**

3. Navigate to the `fair\activity` folder .
4. Open the ` example.txt ` file to get an example of list of commands available or you can check out this [video](https://drive.google.com/folderview?id=1eg5cjKSIhHacWCFcFK1CKE1bMSnyE_44) .
5. You can choose any of the commands written in `example.txt` file.
6. A Chromium browser window will open and the search will take place automatically and the first video in search will be selected.
7. Video will run in full screen mode(not for parallel) screenshots will be taken at 30s interval (by default)or you can specify any value.
8. You are free to change tabs using alt+tab and wait for video to finish.
9. Once the video is over the screenshots will be added to a word document file in same folder with your given name.

## Other Notes: <br />
1) Allow access to chromium if your anti-virus interrupts.<br />
2) Make sure the word document is not open(if a file with the  given name already exists) before running any command.
3) For Parallel Screenshots you need to change to every tab that is opened automatically and wait for the vid to start.
4) Youtube ads are annoying no doubt, for now you need to skip YouTube ads manually
