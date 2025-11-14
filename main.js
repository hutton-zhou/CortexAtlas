let currentLocation=[0,0];


function htmlDisplay(){
    body=document.querySelector("body");
    body.innerHTML="";

    //first create central div
    centralDiv=document.createElement("div");
    centralDiv.id="centralDiv";
    body.appendChild(centralDiv);

    topBar=document.createElement("p");
    let tempTopBarLink;
    let tempLayer=THOUGHTS;
    for(let i=-1; i<currentLocation.length; i++){
        
        tempTopBarLink=document.createElement("a");
        tempTopBarLink.textContent=tempLayer.title;//take the layer title
        tempTopBarLink.href="#";
        tempTopBarLink.onclick=function(){
            currentLocation=currentLocation.slice(0,i+1); //every link must have htmlDisplay();
            htmlDisplay();
        }
        topBar.appendChild(tempTopBarLink);
        
        if(i<currentLocation.length-1){
            topBar.appendChild(document.createTextNode(" > "));//add separator
            tempLayer=tempLayer.children[currentLocation[i+1]];
        }
        
    }
    topBar.id="topBar";
    centralDiv.appendChild(topBar);
    centralDiv.appendChild(document.createElement("hr"));

    //real content display
    let displayLayer=THOUGHTS;
    for(let i=0;i<currentLocation.length;i++){
        displayLayer=displayLayer.children[currentLocation[i]]; //navigate to the current layer
    }
    if(displayLayer.type==tDirectory){
        //display children
        for(let i=0;i<displayLayer.children.length;i++){
            let label=document.createElement("a");
            label.textContent=displayLayer.children[i].title;
            label.href="#";
            label.onclick=function(){
                currentLocation.push(i);
                htmlDisplay();//html display needed
            }
            centralDiv.appendChild(label);
        }
    }
}


//html display
htmlDisplay();