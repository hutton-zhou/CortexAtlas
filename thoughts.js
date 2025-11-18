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
            type:tJournal,
            title:"My Journal",
            children:[
                {
                    type:tEntry,
                    title:"First Entry",
                    content:"Today I started my journal.",
                    attachment:"iframe",
                    attachmentSrc:""
                },
                {
                    type:tEntry,
                    title:"Second Entry",
                    content:"I am enjoying writing in my journal."
                }
            ]
        }
    ]
}