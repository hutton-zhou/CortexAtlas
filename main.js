let currentLocation=[];
let currentEntry=0;



function relocate(location){
    currentLocation=location;
    currentEntry=0; //reset entry on location change
    htmlDisplay();
}

function fitHtmlObject(thing,allTime=false){//fit padding object to window height
    thing.classList.add("fittable");
    if(allTime==true){
        thing.classList.add("fitAllTime");
    }
    requestAnimationFrame(function(){
        let maxHeight=window.innerHeight-(thing.getBoundingClientRect().top+window.scrollY)-20;
        //remove 20 px for padding
        if(allTime){
            thing.style.height=maxHeight+"px";
        }
        else{
            thing.style.maxHeight=maxHeight+"px";
        }
    })
    //use request animation frame to ensure proper timing
    
}
function buildHtml(){
    body=document.querySelector("body");
    body.innerHTML="";

    //first create central div
    centralDiv=document.createElement("div");
    centralDiv.id="centralDiv";
    body.appendChild(centralDiv);


    //build top bar
    topBar=document.createElement("p");
    topBar.id="topBar";
    centralDiv.appendChild(topBar);
    centralDiv.appendChild(document.createElement("hr"));

    //build content region
    contentRegion=document.createElement("div");
    contentRegion.id="contentRegion";
    centralDiv.appendChild(contentRegion);
    
}

function htmlDisplay(){
    //first we update the top bar location
    let tempTopBarLink;
    let tempLayer=THOUGHTS;
    let topBar=document.getElementById("topBar");
    topBar.innerHTML=""; //clear it first
    for(let i=-1; i<currentLocation.length; i++){//-1 to include root  
        tempTopBarLink=document.createElement("a");
        tempTopBarLink.textContent=tempLayer.title;//take the layer title
        tempTopBarLink.href="#";
        tempTopBarLink.onclick=function(){
            relocate(currentLocation.slice(0,i+1));//relocate to this layer
        }
        topBar.appendChild(tempTopBarLink);
        
        if(i<currentLocation.length-1){
            topBar.appendChild(document.createTextNode(" > "));//add separator
            tempLayer=tempLayer.children[currentLocation[i+1]];
        }     
    }

    //now build up the rest of the page
    let displayLayer=THOUGHTS;
    let contentRegion=document.getElementById("contentRegion");
    contentRegion.innerHTML=""; //clear it first

    
    for(let i=0;i<currentLocation.length;i++){
        displayLayer=displayLayer.children[currentLocation[i]]; //navigate to the current layer
    }

    if(displayLayer.type==tDirectory){
        directorySetup(displayLayer)
    }
    else if(displayLayer.type==tJournal){
        journalSetup(displayLayer)
    }
}
function directorySetup(displayLayer){
    let directoryRegion=document.createElement("div");
    let contentRegion=document.getElementById("contentRegion");
    directoryRegion.id="directoryRegion";
    contentRegion.appendChild(directoryRegion);

    //display children
    for(let i=0;i<displayLayer.children.length;i++){
        let label=document.createElement("a");
        label.textContent=displayLayer.children[i].title;
        label.href="#";
        label.onclick=function(){
            currentLocation.push(i);
            relocate(currentLocation);//relocation to this layer
        }
        label.classList.add("directoryEntry");
        directoryRegion.appendChild(label);
        directoryRegion.appendChild(document.createElement("br"));
            
    }
    fitHtmlObject(directoryRegion);
    
}
function journalSetup(displayLayer){
    let journalRegion=document.createElement("div");
    let contentRegion=document.getElementById("contentRegion");
    journalRegion.id="journalRegion";
    contentRegion.appendChild(journalRegion);

    //left bar
    let leftBar=document.createElement("div");
    leftBar.id="journalLeftBar";
    leftBar.classList.add("journalThird");
    journalRegion.appendChild(leftBar);
    fitHtmlObject(leftBar);
    //populate left bar
    for(let i=0;i<displayLayer.children.length;i++){
        
        let entryLabel=document.createElement("a");
        entryLabel.textContent=displayLayer.children[i].title;
        entryLabel.href="#";
        entryLabel.classList.add("journalMenuEntry");
        entryLabel.onclick=function(){
            currentEntry=i;
            journalDisplay(journalRegion);
        }
        leftBar.appendChild(entryLabel);
    }

    //once left bar is done, make central and right bars
    let centerBar=document.createElement("div");
    centerBar.id="journalCenterBar";
    centerBar.classList.add("journalThird");
    journalRegion.appendChild(centerBar);
    fitHtmlObject(centerBar);

    let rightBar=document.createElement("div");
    rightBar.id="journalRightBar";
    rightBar.classList.add("journalThird");
    journalRegion.appendChild(rightBar);
    fitHtmlObject(rightBar,true);
    
    journalDisplay(journalRegion);
}

function journalDisplay(journalRegion){
    let leftBar=journalRegion.children[0];
    //left bar marking
    for(let i=0;i<leftBar.children.length;i++){
        if(i==currentEntry){
            leftBar.children[i].classList.add("journalMenuEntrySelected");
            leftBar.children[i].focus();
        }else{
            leftBar.children[i].classList.remove("journalMenuEntrySelected");
        }
    }
    let rightBar=journalRegion.children[2];
    rightBar.innerHTML=""; //clear it first

    //dive to get current entry
    let displayLayer=THOUGHTS;
    for(let i=0;i<currentLocation.length;i++){
        displayLayer=displayLayer.children[currentLocation[i]]; //navigate to the current layer
    }

    let entryTitle=document.createElement("h1");
    entryTitle.textContent=displayLayer.children[currentEntry].title;
    rightBar.appendChild(entryTitle);
    entryContent=document.createElement("p");
    entryContent.textContent=displayLayer.children[currentEntry].content;
    rightBar.appendChild(entryContent);
    
    //now give them css
    entryTitle.classList.add("journalEntryTitle");
    entryContent.classList.add("journalEntryContent");
    entryTitle.classList.add("journalText");
    entryContent.classList.add("journalText");

    //now handle attachment if any
    let centerBar=journalRegion.children[1];
    centerBar.innerHTML=""; //clear it first
    let attachmentType=displayLayer.children[currentEntry].attachment;
    let attachmentSrc=displayLayer.children[currentEntry].attachmentSrc;
    if(attachmentType!=null && attachmentSrc!=null){
        switch(attachmentType){
            case "img":
                let imgAttachment=document.createElement("img");
                imgAttachment.src=attachmentSrc;
                imgAttachment.classList.add("journalAttachment");
                centerBar.appendChild(imgAttachment);
                break;
            case "audio":
                let audioAttachment=document.createElement("audio");
                audioAttachment.src=attachmentSrc;
                audioAttachment.controls=true;
                audioAttachment.classList.add("journalAttachment");
                centerBar.appendChild(audioAttachment);
                break;
            case "iframe":
                let iframeAttachment=document.createElement("iframe");
                iframeAttachment.src=attachmentSrc;
                iframeAttachment.classList.add("journalAttachment");
                centerBar.appendChild(iframeAttachment);
                break;
        }
    }
}


//html display
buildHtml();
htmlDisplay();

window.onresize=function(){
    let fittableObjects=document.getElementsByClassName("fittable");
    for(let i=0;i<fittableObjects.length;i++){
        let thing=fittableObjects[i];
        if(thing==null){
            continue; //skip if not found
        }
        else if(thing.classList.contains("fitAllTime")){
            fitHtmlObject(thing,true);//fit all time
    }else{
            fitHtmlObject(thing);
        }
    }
}