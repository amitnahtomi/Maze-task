const fs = require('fs');
function findTreasureSync(roomPath) {
    let files = fs.readdirSync(roomPath);
    let currentFile;
    for(let j = 0; j<files.length; j++){
        currentFile = `${roomPath}/${files[j]}`;
        drawMapSync(currentFile);          
        if(fs.lstatSync(currentFile).isFile()){
        if(openChestSync(currentFile) === true){
            console.log("tresure!!!");
            return;
        }
        if(openChestSync(currentFile) !== false){
           return findTreasureSync(openChestSync(currentFile));
        }
    }
}
for(let i = 0; i<files.length; i++){
    if(fs.lstatSync(`${roomPath}/${files[i]}`).isDirectory()){
        return findTreasureSync(`${roomPath}/${files[i]}`);
    }
}
}
function openChestSync(chestPath) {
    try {
    let res = JSON.parse(fs.readFileSync(chestPath));
    if(res.hasOwnProperty("treasure") && res["treasure"] === true){
        return true;
    }
    else if(res["clue"].includes("maze")){
        return res["clue"];
    }
    else return false;
}
catch {
    return false;
}
}
function drawMapSync(currentRoomPath) {
    //draw map
    fs.writeFileSync("./map.txt", currentRoomPath + "\n", { flag: "a+" });
  }
  
findTreasureSync("./maze");