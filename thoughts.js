//current types
let tDirectory="directory";
let tJournal="journal";
let tEntry="entry";

//some documentation
/*
Properties:
- type: What type of thought it is (directory, journal, entry)
- title: The title of the thought
- children: An array of child thoughts (only for layers)

- content: The content of the thought (only for entries) 
- attachment: The central attachment (supports: null, img, audio, iframe) (only for entries)
- attachmentSrc: The source URL for the attachment (only for entries)
*/

let THOUGHTS={
    type:tDirectory,
    title:"Root",
    children:[
        {
            type:tDirectory,
            title:"Personal Thoughts",
            children:[
                {
                    type:tDirectory,
                    title:"Art and Inspiration",
                    children:[
                        {
                            type:tDirectory,
                            title:"Artwork/Paintings"
                        },
                        {
                            type:tDirectory,
                            title:"Music",
                            children:[
                                {
                                    type:tDirectory,
                                    title:"Classical"
                                },
                                {
                                    type:tDirectory,
                                    title:"Pop/Rock"
                                },
                                {
                                    type:tDirectory,
                                    title:"OSTs"
                                }
                                
                            ]
                        },
                        {
                            type:tDirectory,
                            title:"Literature"
                        },
                        {
                            type:tDirectory,
                            title:"Movies/TV"
                        },
                        {
                            type:tDirectory,
                            title:"Games"
                        },
                        {
                            type:tDirectory,
                            title:"Characters/Lore/Scenes",
                            children:[
                                {
                                    type:tDirectory,
                                    title:"Video Game Characters",
                                    children:[
                                        {
                                            type:tJournal,
                                            title:"Hollow Knight",
                                            children:[
                                                {
                                                    type:tEntry,
                                                    title:"Cornifer",
                                                    content:"CORNIFER! He's underappreciated in Hollow Knight. \
                                                    He literally offers to gives maps for free, and explores the \
                                                    entirety of Hallownest to accompany us and get us maps. \
                                                    He's important.",
                                                    attachment:"img",
                                                    attachmentSrc:"https://static.wikia.nocookie.net/hollowknight/images/f/ff/Cornifer.png/revision/latest?cb=20170330135557"
                                                },
                                                {
                                                    type:tEntry,
                                                    title:"Nosk",
                                                    content:"It's just Nosk. Even though he doesn't have too much \
                                                    personality or backstory, it's an amazing boss design, especially \
                                                    for an area like Deepnest. Furthermore, Pantheon 5's order was \
                                                    completely screwed up just for the Nosk shock factor when the player \
                                                    is expecting a Hornet Sentinel fight, but then get Winged Nosk.",
                                                    attachment:"img",
                                                    attachmentSrc:"https://static.wikia.nocookie.net/hollowknight/images/3/39/Nosk_idle.png/revision/latest/scale-to-width/360?cb=20181218191001"

                                                }
                                            ]
                                        },
                                        {
                                            type:tJournal,
                                            title:"Celeste"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type:tDirectory,
                    title:"Criticisms",
                    children:[
                        {
                            type:tDirectory,
                            title:"Music",
                            children:[
                                {
                                    type:tJournal,
                                    title:"Pop",
                                    children:[
                                        
                                    ]
                                },
                                {
                                    type:tJournal,
                                    title:"KPop/JPop"
                                },
                                {
                                    type:tJournal,
                                    title:"Rock + Metal"
                                },
                                {
                                    type:tJournal,
                                    title:"Miscellaneous (Electronic, phonk, computer-generated OSTs)",
                                    children:[
                                        {
                                            type:tEntry,
                                            title:"Darkside (Alan Walker)",
                                            content:"Ok. So I know several people who listen to this song, but I honestly \
                                            don't understand the message. Like people say it's \"confronting your inner \
                                            struggles\" and relationships, but in the lyrics, I just see 1. \
                                            Two people who are totally NOT in love, 2. Some person who \"knows\" the dark, \
                                            and 3. \"letting go\". I have several interpretations: 1. Two people running \
                                            either away (probably being hunted down by the FBI), 2. Two people who are \
                                            clearly under the influence together, probably met at a party, or 3. The most \
                                            dark, being that two people are ending their own lives together, as the lyrics \
                                            remind me of the Japanese song \"Racing Into The Night\". I won't talk about that \
                                            song much, might find it either in the JPop Criticism section, but it is kind of dark \
                                            for a song being supposedly about confronting your struggles have lyrics that sound like \
                                            giving up on life."
                                        },
                                        {
                                            type:tEntry,
                                            title:"After Dark (MR KITTY)",
                                            content:"I have to admit, I used to listen to this song A BIT. Just a bit, like one or two times. \
                                            The lyrics weirded me out a bit. Then I discovered: the reason is because MR KITTY is a pedophile. \
                                            His real name? Forrest Avery Carney. Carney like Mark Carney, Forrest rhyming with \"molest\". Although \
                                            I despise Billy, he currently isn't one of these people. WHAT ARE THESE LYRICS? HOW CREEPY"
                                        },
                                        {
                                            type:tEntry,
                                            title:"All I Want is You (Rebzyyx)",
                                            content:"I found out Rebzyxx is male. And then he creates this song about a couple. \
                                            Listen, I'm not misandrist (or misogynist either), but doesn't this sound a BIT creepy? \
                                            Like the song has lyrics relating to blood, mistreatment, and there are even theories \
                                            that one or both people in the couple are dead (most likely killed by the other), or \
                                            that the song's start and end are before/after. The lyrics are messed up, and relate to \
                                            self-harm. I have nothing against a song/artwork that explains it in a good way, but \
                                            1. You shouldn't make something like that if you don't know much about it and \
                                            2. Part of this song is just \"Oh teens crush stuff\", then the other part is \
                                            just self-harm, violence, and possibly more."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type:tDirectory,
                            title:"Movies/TV"
                        },
                        {
                            type:tDirectory,
                            title:"Literature"
                        },
                        {
                            type:tDirectory,
                            title:"Companies"
                        },
                        {
                            type:tDirectory,
                            title:"Politics"
                        },
                        {
                            type:tDirectory,
                            title:"Media"
                        },
                        {
                            type:tDirectory,
                            title:"Society/Culture/Norms"
                        },
                        {
                            type:tJournal,
                            title:"Personal People",
                            children:[
                                {
                                    type:tEntry,
                                    title:"Billy",
                                    content:"Don't like him"
                                },
                                {
                                    type:tEntry,
                                    title:"Jacob (W)",
                                    content:"Jacob stop watching 12/5 12/5 12/5"
                                },
                                {
                                    type:tEntry,
                                    title:"Some person",
                                    content:"IDK"
                                }
                            ]
                        },
                        {
                            type:tJournal,
                            title:"Habits",
                            children:[
                                {
                                    type:tEntry,
                                    title:"Writing Stuttering",
                                    content:"When people write stuttering like this: M-m-me? Or\
                                    like th-this? It's weird and a bit annoying. It just feels \
                                    both unnatural, weird, and even like the writer is trying to \
                                    make the character seem innocent, vulnerable, and to some extent, \
                                    cute. It makes the character seem over-romantized. Whether the writer \
                                    is male, female, or non-binary, it makes them seem like a creep, especially \
                                    if the character is a minor, or the writer is male (even though other genders \
                                    can be creeps too). Overall, just don't do it. If you do it, just stop \
                                    doing it. You need help. Just write stutters in dialogue normally, or if you can't, \
                                    just write \"Bob stuttered,\" before the dialogue, instead of words like said or talked. \
                                    It's not that hard."
                                },
                                {
                                    type:tEntry,
                                    title:"Overusing AI",
                                    content:"Self-explanatory. People who use AI to generate images, \
                                    essays, etc are uncreative. If they are just using it for school, \
                                    that's okay, they are just lazy cheats, but to some extent, where \
                                    the person is relying on AI to do everything, such as hobbies, music, \
                                    image generation, social media, and even just to send a message to friends, \
                                    they should really stop. Imagine if ChatGPT was down. Imagine if NVIDIA \
                                    was down. WHAT IF CLOUDFLARE WAS DOWN, MEANING YOU WOULDN'T BE ABLE TO \
                                    HAVE A NORMAL CONVERSATION AT ALL. I do understand that we all rely on Cloudflare \
                                    but you really need to be able to have a good conversation. Some people even \
                                    accidentally learn \"AI Accent\". What a \"delve into a meticiously crafted \
                                    world of imagination! This isn't just a message, this is a letter crafted to \
                                    perfection.\" Fools!"
                                },
                                {
                                    type:tEntry,
                                    title:"Using not-well-known texting acronyms.",
                                    content:"Of course, if you are using texting abbreviations that are well-known, \
                                    such as 'brb', 'ttyl', 'idk', etc, that's okay. If it's lesser known, if it's still \
                                    searchable on the internet with first or second results, that's still okay. If \
                                    it has to do with the conversation, like RBT for a conversation about red-black trees, \
                                    or 'UT' in a conversation about the game Undertale, that's okay too. But if it's something \
                                    that is not well-known, or even made up, that is unacceptable and not understandable. \
                                    People should not have to ask what you mean. That just takes more words, not less."
                                },
                                {
                                    type:tEntry,
                                    title:"Enjoying Awful Video Games",
                                    content:"You know those people who just enjoy crappy games, (which, pity for them), \
                                    but even then, they still are convinced that they are at the pinnacle of gaming, with \
                                    their \"Clash Royale\" and so-and-so. To a certain level, they start hating good games, \
                                    \"Hollow Knight is so unorginal! Needle, bugs, Clash is so much more creative\" - Jayden, \
                                    Nov 24, 2025. Clash Royale? With what? \"MEGA KNIGHT\"? I feel bad for these people. \
                                    Refusing to change their habits."
                                },
                                {
                                    type:tEntry,
                                    title:"Criticism without understanding",
                                    content:"This is a bit hypocritical as I criticize things a lot, but some people refuse \
                                    to believe people have personality whatsoever because they don't know them well enough, \
                                    or believe certain games/movies are uncreative because they haven't experienced it, \
                                    or certain hobbies are stupid and unfun. Jayden, ahem ahem."
                                }
                            ]
                        }
                    ]
                },
                {
                    type:tDirectory,
                    title:"Journal and Past",
                    children:[
                        {
                            type:tJournal,
                            title:"Long Term Events/Summaries",
                            children:[
                                {
                                    type:tEntry,
                                    title:"Late 2024 Arc",
                                    content:"This arc starts with the first day of school in Grade 7. \
                                    At that time, Aaron was sitting next to Billy, so I just said hi to Billy \
                                    and greeted him. Not much happened, except a few petty arguments. Then, two \
                                    events happened. \nThe first being the albanian incident, the second being \
                                    much more large-scale. The first incident was not important. The second incident \
                                    was possibly because Billy, and I regret doing it. But after the incident, \
                                    I found his discord. Big mistake. This all leads to the next arc. \nFun fact! \
                                    Some time between the two incidents (being December 5th) 12/5 happened!"
                                },
                                {
                                    type:tEntry,
                                    title:"Billy Incident Arc",
                                    content:"This arc lasts around from February to October 2025. It all starts with \
                                    the Tree server, which I used to own. So it was going great, I invited all my \
                                    friends. But Billy started asking about Cloris' address and stuff, and I still remember \
                                    the joke he made after. \"I'm gonna go to her house. I'm gonna bring PDiddyOil\" and \
                                    something about being a \"Master of Butter\" as his username is ButterMasterr. He also \
                                    tried to find her address while working on a Google Earth project. This got to far. \
                                    Some unimportant things, like transferring Tree server to Sri, who then transferred it \
                                    to Billy. In the end, it sucked. It all ended in Brisbois' office. I should have told on \
                                    him when it all started. As a result, there are two down bad graduates of 610X Rapid Relay \
                                    Season. One I joke about (12/5), the other I think is no joke.\
                                    \
                                    Billy, if you are reading this, this is my journal. I show this to nobody. You can't \
                                    stop me from writing in my own journal, it's not impacting you. Please go away, stop \
                                    reading my personal journal. I am allowed to express my own opinion."
                                }
                            ]
                        },
                        {
                            type:tJournal,
                            title:"Pre-13th Birthday"
                        },
                        {
                            type:tJournal,
                            title:"Late 2025"
                        }
                    ]
                },
                {
                    type:tDirectory,
                    title:"Random Projects/Writings/Ideas",
                    children:[
                        {
                            type:tDirectory,
                            title:"Writings/Lore"
                        },
                        {
                            type:tJournal,
                            title:"Inside Jokes",
                            children:[
                                {
                                    type:tEntry,
                                    title:"12/5",
                                    content:"12/5"
                                }
                            ]
                        }
                    ]
                },
                {
                    type:tDirectory,
                    title:"Knowledge Base",
                    children:[
                        {
                            type:tDirectory,
                            title:"Mathematics"
                        },
                        {
                            type:tDirectory,
                            title:"Science"
                        },
                        {
                            type:tDirectory,
                            title:"Programming/Computer Science"
                        },
                        {
                            type:tDirectory,
                            title:"History"
                        },
                        {
                            type:tDirectory,
                            title:"Linguistics"
                        },
                        {
                            type:tDirectory,
                            title:"Music Theory"
                        },
                        {
                            type:tDirectory,
                            title:"Art and Design"
                        },
                        {
                            type:tDirectory,
                            title:"Philosophy"
                        },
                        {
                            type:tDirectory,
                            title:"Psychology"
                        }
                    ]
                },
                {
                    type:tDirectory,
                    title: "Society"
                },
                {
                    type:tDirectory,
                    title: "Self and Philosophy",
                    children:[
                        {
                            type:tJournal,
                            title:"Useful Things",
                            children:[
                                {
                                    type:tEntry,
                                    title:"How to change computers",
                                    content:"Logging in to Microsoft Account will get you all your \
                                    Onedrive stuff, so your projects and important things. Logging \
                                    in to Google Chrome will give you all your accounts. Then, get \
                                    the following applications: Zoom, Vscode, IntellijIdea, Steam, \
                                    Github Desktop, VEXcode, Unity, and maybe an audio editor. Download \
                                    all games from Steam, and finally, get Python, Java, MinGW C++, and \
                                    maybe Node.JS. Also, please remember to get your Unity projects that \
                                    are not stored on Onedrive, wherever they are."
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}


//since i don't want to add children[] to every object of the big thoughts, we gotta
//add a system to keep adding children[]

function recursiveChildrenNull(thoughtLayer){
    if(thoughtLayer.type!=tEntry){
       if(thoughtLayer.children==null){
        thoughtLayer.children=[];
        }else{
            for(let i=0; i<thoughtLayer.children.length; i++){
                recursiveChildrenNull(thoughtLayer.children[i])
            }
            //make sure there are no journals without any children
            if(thoughtLayer.type==tJournal){
                tJournal.children=[
                    {
                        type:tEntry,
                        title:"Empty",
                        content:""
                    }
                ]
            }
        }
        
    }
    
}

recursiveChildrenNull(THOUGHTS);