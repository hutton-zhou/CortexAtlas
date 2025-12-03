"use strict"

let currentLocation=[];
let currentEntry=0;

let KEYS=[];

let EDITABLE=true; //editable
//template stuff
let templateEntry={type:tEntry,title:"New Entry",content:"Write text here..."}

function buildLayer(){
    let displayLayer=THOUGHTS;
    for(let i=0;i<currentLocation.length;i++){
        displayLayer=displayLayer.children[currentLocation[i]]; //navigate to the current layer
    }
    return displayLayer;
}

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
    let body=document.querySelector("body");
    body.innerHTML="";

    //first create central div
    let centralDiv=document.createElement("div");
    centralDiv.id="centralDiv";
    body.appendChild(centralDiv);

    //build menubar
    let menuBar=document.createElement("div");
    menuBar.id="menuBar";
    menuBar.className="topBars";
    centralDiv.appendChild(menuBar);

    //build top bar
    let topBar=document.createElement("p");
    topBar.id="topBar";
    topBar.className="topBars"
    centralDiv.appendChild(topBar);
    centralDiv.appendChild(document.createElement("hr"));

    //build content region
    let contentRegion=document.createElement("div");
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
        tempTopBarLink.onclick=function(ev){
            ev.preventDefault()//prevent link
            relocate(currentLocation.slice(0,i+1));//relocate to this layer
        }
        topBar.appendChild(tempTopBarLink);
        
        if(i<currentLocation.length-1){
            topBar.appendChild(document.createTextNode(" > "));//add separator
            tempLayer=tempLayer.children[currentLocation[i+1]];
        }     
    }

    //now build up the rest of the page
    
    let contentRegion=document.getElementById("contentRegion");
    contentRegion.innerHTML=""; //clear it first

    let displayLayer=buildLayer();

    if(displayLayer.type==tDirectory){
        directorySetup(displayLayer)
    }
    else if(displayLayer.type==tJournal){
        journalSetup(displayLayer)
    }
}
function replaceWithAttr(obj,obj2){
    if(obj!=null){//guarantee object wasn't hidden or removed
        
        let attr=obj.attributes;

        obj.replaceWith(obj2);

        for(let i=0; i<attr.length; i++){
            let tempItem=attr.item(i)
            obj2.setAttribute(tempItem.name,tempItem.value)
        }  
        
    }
    

}


// replacing text with textarea or input
function replaceInput(textObject, target, targetProp, multiline, type, refresh){
    //how the parameters work
    //textObject is the object being turned into an input
    //target is the PART OF THOUGHTS STORAGE that is being altered as well
    //targetProp is the name of the property of target being modified
    //multiline is a boolean: true = <textarea>, false = <input>
    //type is the type of the textObject: eg <p>, <h1>
    //refresh is a boolean, true means that htmlDisplay() is re-run

    if(EDITABLE && textObject.tagName!="textarea" && textObject.tagName!="input"){
        let tempText=textObject.textContent;
        let newObject;
        if(multiline){
            newObject=document.createElement("textarea")
        }else{
            newObject=document.createElement("input")
        }
        newObject.value=tempText
        replaceWithAttr(textObject,newObject)

        newObject.focus()
        
        newObject.addEventListener("keydown",function(ev){
            if(KEYS.includes("Shift") || ev.key!="Enter"){

            }else{
                ev.preventDefault();
                this.blur()//if not shift-enter, no new lines
            }
        })
        

        newObject.addEventListener("blur",function(){
            inputToText(this,target,targetProp,multiline,type,refresh)
        })
        
    }
    
}
function inputToText(inputObject, target, targetProp, multiline, type, refresh){
    
    //no need to detect editable as it should always be saved


    //target changing
    target[targetProp]=inputObject.value;

    let tempValue=inputObject.value;
    let newObject=document.createElement(type)

    newObject.textContent=tempValue
    replaceWithAttr(inputObject,newObject)
    newObject.addEventListener("dblclick",function(){
        replaceInput(this,target,targetProp,multiline,type,refresh)
    })
    //finally, if refresh is needed, refresh everything
    if(refresh)htmlDisplay()
    
    
}

function directorySetup(displayLayer){
    let directoryRegion=document.createElement("div");
    let contentRegion=document.getElementById("contentRegion");
    directoryRegion.id="directoryRegion";
    contentRegion.appendChild(directoryRegion);

    //display children
    for(let i=0;i<displayLayer.children.length;i++){
        let label=document.createElement("a");

        //adding icon
        let tempIcon=document.createElement("span")
        tempIcon.classList.add("material-symbols-outlined")
        if(displayLayer.children[i].type==tDirectory){
            if(displayLayer.children[i].children.length==0){
                tempIcon.textContent="folder_off"
            }else{
                tempIcon.textContent="folder"
            }
        }else if(displayLayer.children[i].type==tJournal){
            if(displayLayer.children[i].children.length==0){
                tempIcon.textContent="import_contacts"
            }else{
                tempIcon.textContent="menu_book"
            }
        }
        
        label.appendChild(tempIcon);

        label.appendChild(document.createTextNode(displayLayer.children[i].title));
        if(displayLayer.children[i].children.length==0){
            let tempRedText=document.createElement("span");
            tempRedText.textContent=" (empty)"
            tempRedText.classList.add("redWarn");
            label.appendChild(tempRedText);
        }
        label.onclick=function(ev){
            ev.preventDefault()
            currentLocation.push(i);
            relocate(currentLocation);//relocation to this layer
        }
        label.classList.add("directoryEntry");
        directoryRegion.appendChild(label);
        directoryRegion.appendChild(document.createElement("br"));
            
    }
    fitHtmlObject(directoryRegion);
    
}

function newJournalEntry(displayBar,name,i,specialFunc=null,specialSymbol=null){
    let entryLabel=document.createElement("a");
    if(specialSymbol!=null){
        let tempSymbol=document.createElement("span")
        tempSymbol.textContent=specialSymbol
        tempSymbol.classList.add("material-symbols-outlined")
        entryLabel.appendChild(tempSymbol)
    }
    entryLabel.appendChild(document.createTextNode(name))
    entryLabel.classList.add("journalMenuEntry");
    if(specialFunc!=null){
        entryLabel.onclick=specialFunc
    }else{
        entryLabel.onclick=function(ev){
            ev.preventDefault()
            currentEntry=i;
            journalDisplay(journalRegion);
        }
    }
    
    displayBar.appendChild(entryLabel);
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
        newJournalEntry(leftBar,displayLayer.children[i].title,i)
    }
    if(EDITABLE){
        newJournalEntry(leftBar,"New Journal Entry",displayLayer.children.length,function(){
            displayLayer.children.push({...templateEntry})
            //now regenerate
            htmlDisplay()
        },"add")
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
    let entryContent=document.createElement("p");
    entryContent.textContent=displayLayer.children[currentEntry].content;
    rightBar.appendChild(entryContent);

    //entry content editing
    entryContent.addEventListener("dblclick",function(){
        replaceInput(entryContent,displayLayer.children[currentEntry],"content",true,"p",false);  
    })
    //title editing
    entryTitle.addEventListener("dblclick",function(){
        replaceInput(entryTitle,displayLayer.children[currentEntry],"title",false,"h1",true);
    })
    
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

document.addEventListener("keydown",function(event){
    if(event.key=="ArrowUp" || event.key=="ArrowDown"){
        let displayLayer=buildLayer();
        if(displayLayer.type==tJournal){
            if(event.key=="ArrowUp"){
                if(currentEntry>0){
                    currentEntry--;
                }else{
                    currentEntry=displayLayer.children.length-1; //wrap around to last
                }
            }else if(event.key=="ArrowDown"){
                if(currentEntry<displayLayer.children.length-1){
                    currentEntry++;
                }else{
                    currentEntry=0; //wrap around to first
                }
            }
            journalDisplay(document.getElementById("journalRegion"));
        }
    }
    KEYS.push(event.key)
})
document.addEventListener("keyup",function(event){
    for(let i=KEYS.length-1; i>=0; i--){
        if(KEYS[i]==event.key){
            KEYS.splice(i,1);
        }
    }
})