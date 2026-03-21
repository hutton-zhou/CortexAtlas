"use strict"

//first load over any saved data

if(localStorage.getItem("data")!=null){
    THOUGHTS=JSON.parse(localStorage.getItem("data"));
}

let currentLocation=[];
let currentEntry=0;

let KEYS=[];

let EDITABLE=true; //editable
//template stuff
let templateEntry={type:tEntry,title:"New Entry",content:"Write text here..."};
let templateJournal={type:tJournal,title:"New Journal",children:[]};
let templateDirectory={type:tDirectory,title:"New Directory",children:[]};

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
    htmlDisplay({});
}

function saveTime(storageSize){
    let saveStatus=document.getElementById("saveStatus");
    let now=new Date();
    saveStatus.innerHTML="Last Saved: "+now.toLocaleString()+"<br>Storage Size: "+storageSize;

}

function saveChanges(that){
    if(EDITABLE){
        localStorage.setItem("data",JSON.stringify(THOUGHTS));
        let size=new Blob([localStorage.getItem("data")]).size;
        let formatSize;
        if(size<1024){
            formatSize=size+"B";
        }else if(size<1024*1024){
            formatSize=(size/1024).toFixed(2)+"KB";
        }else if(size<1024*1024*1024){
            formatSize=(size/(1024*1024)).toFixed(2)+"MB";
        }else{
            formatSize=(size/(1024*1024*1024)).toFixed(2)+"GB";
        }
        saveTime(formatSize);
    }
    
}
function toggleEditName(){
    if(EDITABLE){
        return "Disable Edit Mode";
    }else{
        return "Enable Edit Mode";
    }
}
function setEditModeDisplay(){
    let editModeStatus=document.getElementById("editModeStatus");
    if(EDITABLE){
        editModeStatus.textContent="edit";
    }else{
        editModeStatus.textContent="visibility";
    }
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
    //now build each part of menubar
    let menuTitles=["File","Edit","View","Help"];
    let menuParts=[
        ["Import File","Export File","Save Changes"],
        [toggleEditName()],
        ["Expand All","Collapse All"],
        ["About","Documentation"]
    ]
    let emptyFunc=function(){};
    //defining functions
    function importFile(that){
        let tempInput=document.createElement("input"); 
        tempInput.type="file";
        tempInput.accept=".json,application/json";
        tempInput.style.display="none";//hidden input
        document.body.appendChild(tempInput);//hide it in the body

        tempInput.addEventListener("change",function(ev){
            let reader=new FileReader();
            reader.readAsText(ev.target.files[0]);
            reader.onload=function(e){
                let data=e.target.result;
                try{
                    let importedData=JSON.parse(data);
                    THOUGHTS=importedData;
                    currentLocation=[];
                    currentEntry=0;
                    htmlDisplay({});
                }catch(err){
                    alert("Error: Invalid JSON file.");
                }
                
            }
            document.body.removeChild(tempInput);//remove input after use
        })
        tempInput.click();//open file dialog
        
    }
    function exportFile(that){
        let dataJson=JSON.stringify(THOUGHTS);
        let dataBlob=new Blob([dataJson],{type:"application/json"}); 

        let downloadLink=document.createElement("a");
        downloadLink.href=URL.createObjectURL(dataBlob);
        downloadLink.download="cortex_atlas_export.json";
        downloadLink.click();//click download link
    }
    function toggleEditMode(that){
        //save all changes
        saveChanges();
        EDITABLE=!EDITABLE;
        that.textContent=toggleEditName();

        htmlDisplay({});//refresh display
        setEditModeDisplay();
        
    }
    //no save changes function as it is global
    let menuFunctions=[
        [importFile,exportFile,saveChanges],
        [toggleEditMode],
        [emptyFunc,emptyFunc],
        [emptyFunc,emptyFunc]
    ]
    for(let i=0;i<menuTitles.length;i++){
        let menuPart=document.createElement("div");
        menuPart.className="menuPart";
        let menuBlock=document.createElement("span");
        menuBlock.textContent=menuTitles[i];
        menuPart.appendChild(menuBlock)

        let innerMenuBar=document.createElement("div");
        innerMenuBar.className="innerMenuBar";
        for(let j=0; j<menuParts[i].length;j++){ 
            let menuItem=document.createElement("a");
            menuItem.textContent=menuParts[i][j];
            menuItem.href="#";
            menuItem.onclick=function(ev){
                ev.preventDefault();
                //handle menu actions
                menuFunctions[i][j](this);
            }
            innerMenuBar.appendChild(menuItem);
            
        }
        menuPart.appendChild(innerMenuBar);
        menuBar.appendChild(menuPart);
    }


    
    //last saved
    let saveStatus=document.createElement("span");
    saveStatus.id="saveStatus";
    saveStatus.classList.add("sideFloating");
    menuBar.appendChild(saveStatus);

    //view edit modes
    let editModeStatus=document.createElement("span");
    editModeStatus.id="editModeStatus";
    editModeStatus.classList.add("material-symbols-outlined");
    menuBar.appendChild(editModeStatus);
    setEditModeDisplay();



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

function htmlDisplay(scrollPositions){
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

    
    //save scroll positions
    Object.keys(scrollPositions).forEach(function(key){
        let tempObj=document.getElementById(key);
        requestAnimationFrame(function(){
            if(tempObj!=null){
                tempObj.scrollTo(0,scrollPositions[key]);
            }
        })
        
    })
    
   
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
function replaceInput(textObject, target, targetProp, multiline){
    //how the parameters work
    //textObject is the object being turned into an input
    //target is the PART OF THOUGHTS STORAGE that is being altered as well
    //targetProp is the name of the property of target being modified
    //multiline is a boolean: true = <textarea>, false = <input>

    if(EDITABLE && textObject.tagName!="textarea" && textObject.tagName!="input"){
        let tempText=target[targetProp] //use stored name to avoid broken
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
            inputToText(this,target,targetProp)//no multiline needed
        })
        
    }
    
}
function inputToText(inputObject, target, targetProp){
    
    //no need to detect editable as it should always be saved

    let tempValue=inputObject.value;
    
    //target data changing
    target[targetProp]=tempValue;
    if(document.getElementById("directoryRegion")!=null){
        htmlDisplay({"directoryRegion":document.getElementById("directoryRegion").scrollTop})
    }else if(document.getElementById("journalLeftBar")!=null){
        htmlDisplay({"journalLeftBar":document.getElementById("journalLeftBar").scrollTop})
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
        //updown arrows
        if(EDITABLE){
            let tempUpDownKeys=upDownKeys(displayLayer,i);
            label.appendChild(tempUpDownKeys[0])
            label.appendChild(tempUpDownKeys[1])
        }

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
        //now add edit functionality
        if(EDITABLE){
            let deleteIcon=document.createElement("span");
            deleteIcon.classList.add("material-symbols-outlined","sideIcon");
            deleteIcon.textContent="delete";
            deleteIcon.onclick=function(ev){
                ev.preventDefault();
                ev.stopPropagation();//stop bubbling up
                if(confirm("Are you sure you want to delete '"+displayLayer.children[i].title+"'?")){
                    displayLayer.children.splice(i,1);
                    //now regenerate
                    htmlDisplay({"directoryRegion":directoryRegion.scrollTop})
                }
            }

            label.appendChild(deleteIcon);
            //title editing
            let titleEditIcon=document.createElement("span");
            titleEditIcon.classList.add("material-symbols-outlined","sideIcon");
            titleEditIcon.textContent="edit";
            titleEditIcon.onclick=function(ev){
                ev.preventDefault();
                ev.stopPropagation();//stop bubbling up
                replaceInput(label,displayLayer.children[i],"title",false,"a",[],true);
            }
            label.appendChild(titleEditIcon);
        }

        directoryRegion.appendChild(label);
        directoryRegion.appendChild(document.createElement("br"));
            
    }

    //add edit objects
    if(EDITABLE){
        let addDirectoryLink=document.createElement("a");
        let insideIcon=document.createElement("span")
        insideIcon.classList.add("material-symbols-outlined");
        insideIcon.textContent="create_new_folder";
        addDirectoryLink.appendChild(insideIcon);
        addDirectoryLink.appendChild(document.createTextNode("Add New Directory"));
        addDirectoryLink.classList.add("directoryEntry");
        addDirectoryLink.onclick=function(ev){
            ev.preventDefault();
            displayLayer.children.push(structuredClone(templateDirectory));
            //now regenerate
            htmlDisplay({"directoryRegion":directoryRegion.scrollTop})
        }
        directoryRegion.appendChild(addDirectoryLink);
        directoryRegion.appendChild(document.createElement("br"));

        let addJournalLink=document.createElement("a");
        let insideJournalIcon=document.createElement("span")
        insideJournalIcon.classList.add("material-symbols-outlined");
        insideJournalIcon.textContent="list_alt_add";
        addJournalLink.appendChild(insideJournalIcon);
        addJournalLink.appendChild(document.createTextNode("Add New Journal"));
        addJournalLink.classList.add("directoryEntry");
        addJournalLink.onclick=function(ev){
            ev.preventDefault();
            displayLayer.children.push(structuredClone(templateJournal));
            //now regenerate
            htmlDisplay({"directoryRegion":directoryRegion.scrollTop})
        }
        directoryRegion.appendChild(addJournalLink);
    }
    
    fitHtmlObject(directoryRegion);
    
    
}
function upDownKeys(displayLayer,i){
    

    let vertiBar=document.createElement("div");
    vertiBar.classList.add("vertiBar");
    let upArrow=document.createElement("span");
    upArrow.classList.add("material-symbols-outlined","sideIcon");
    upArrow.textContent="keyboard_arrow_up";
    let downArrow=document.createElement("span");
    downArrow.classList.add("material-symbols-outlined","sideIcon");
    downArrow.textContent="keyboard_arrow_down";
    vertiBar.appendChild(upArrow);
    vertiBar.appendChild(downArrow);

    let boostedVertiBar=document.createElement("div");
    boostedVertiBar.classList.add("vertiBar");
    let boostUpArrow=document.createElement("span");
    boostUpArrow.classList.add("material-symbols-outlined","sideIcon");
    boostUpArrow.textContent="keyboard_double_arrow_up";
    let boostDownArrow=document.createElement("span");
    boostDownArrow.classList.add("material-symbols-outlined","sideIcon");
    boostDownArrow.textContent="keyboard_double_arrow_down";
    boostedVertiBar.appendChild(boostUpArrow);
    boostedVertiBar.appendChild(boostDownArrow);

    //temporary function
    function scrollToPosTemp(target=null){
        let tempObject;
        let tempId;
        if(document.getElementById("directoryRegion")!=null){
            tempObject=document.getElementById("directoryRegion")
            tempId="directoryRegion"
        }else if(document.getElementById("journalLeftBar")!=null){
            tempObject=document.getElementById("journalLeftBar")
            tempId="journalLeftBar"
        }
        let tempTarg;
        if(target==null){
            tempTarg=tempObject.scrollTop
        }else{
            tempTarg=target
        }
        htmlDisplay({tempId:tempTarg})
    }

    //now add functionality
    upArrow.onclick=function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        if(i>0){
            let tempInfo=displayLayer.children.splice(i,1)[0];
            displayLayer.children.splice(i-1,0,tempInfo);

            scrollToPosTemp()
        }
    }
    downArrow.onclick=function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        if(i<displayLayer.children.length-1){
            let tempInfo=displayLayer.children.splice(i,1)[0];
            displayLayer.children.splice(i+1,0,tempInfo);
            scrollToPosTemp()
        }
    }
    boostUpArrow.onclick=function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        let tempInfo=displayLayer.children.splice(i,1)[0];
        displayLayer.children.splice(0,0,tempInfo);
        scrollToPosTemp(0)
    }
    boostDownArrow.onclick=function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        let tempInfo=displayLayer.children.splice(i,1)[0];
        displayLayer.children.push(tempInfo);
        scrollToPosTemp(Number.MAX_VALUE)
    }

    return [vertiBar,boostedVertiBar];
}

function newJournalEntry(displayBar,displayLayer,name,i,specialFunc=null,specialSymbol=null){
    let entryLabel=document.createElement("a");
    if(specialSymbol!=null){
        let tempSymbol=document.createElement("span")
        tempSymbol.textContent=specialSymbol
        tempSymbol.classList.add("material-symbols-outlined")
        entryLabel.appendChild(tempSymbol)
    }
    if(specialFunc==null){
        //updown arrows
        if(EDITABLE){
            let tempUpDownKeys=upDownKeys(displayLayer,i);
            entryLabel.appendChild(tempUpDownKeys[0])
            entryLabel.appendChild(tempUpDownKeys[1])
            entryLabel.classList.add("journalMenuEntryNoPadding")
        }
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
        newJournalEntry(leftBar,displayLayer,displayLayer.children[i].title,i)
    }
    if(EDITABLE){
        newJournalEntry(leftBar,displayLayer,"New Journal Entry",displayLayer.children.length,function(){
            displayLayer.children.push({...templateEntry})
            //now regenerate
            htmlDisplay({"journalLeftBar":leftBar.scrollTop})
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
    if(displayLayer.children.length==0){
        return; //no entries to display
    }else{
        if(EDITABLE){
            //add delete button
            let deleteIcon=document.createElement("span");
            deleteIcon.classList.add("material-symbols-outlined","sideIcon");
            deleteIcon.textContent="delete";
            deleteIcon.onclick=function(ev){
                ev.preventDefault();
                if(confirm("Are you sure you want to delete '"+displayLayer.children[currentEntry].title+"'?")){
                    displayLayer.children.splice(currentEntry,1);
                    if(currentEntry>=displayLayer.children.length){
                        currentEntry=displayLayer.children.length-1; //move to last entry
                    }
                    if(currentEntry<0){
                        currentEntry=0; //no entries left
                    }
                    htmlDisplay({"journalLeftBar":leftBar.scrollTop});//refresh display
                }
            }
            rightBar.appendChild(deleteIcon);
        }


        let entryTitle=document.createElement("h1");
        entryTitle.textContent=displayLayer.children[currentEntry].title;
        rightBar.appendChild(entryTitle);
        let entryContent=document.createElement("p");
        entryContent.textContent=displayLayer.children[currentEntry].content;
        rightBar.appendChild(entryContent);

        //entry content editing
        entryContent.addEventListener("dblclick",function(){
            replaceInput(entryContent,displayLayer.children[currentEntry],"content",true,"p",[]);  
        })
        //title editing
        entryTitle.addEventListener("dblclick",function(){
            replaceInput(entryTitle,displayLayer.children[currentEntry],"title",false,"h1",[leftBar.children[currentEntry]]);
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

    
}


//html display
buildHtml();
htmlDisplay({});

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
    if((event.key=="ArrowUp" || event.key=="ArrowDown") && document.activeElement.tagName!="INPUT" && document.activeElement.tagName!="TEXTAREA"){
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

window.addEventListener("beforeunload",function(){
    saveChanges();
})
//initial save time display
setInterval(saveChanges,10_000);//auto save every 10 seconds