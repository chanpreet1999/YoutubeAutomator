
let cmd = input[2];
switch (cmd) {
    case '-l': console.log('Screenshot using link');
        let link = input[3];
        break;
    case '-s': console.log('Screenshot using Search');
        let search = input[3];
        break;
    case '-p' : console.log('Playlist');
        let link = input[3];
        break;
    default : console.log('Wrong input');

}
