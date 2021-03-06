const { App } = require("@slack/bolt")
require("dotenv").config()
const sleep = require("./utils/sleep")
const { getAirtableRecord } = require("./controllers/airtable")
const addVideoCompletedButton = require("./message-blocks/video-completed-button")
const { courseLookup, communityLookup } = require("./utils/lookup")


const {
    videoOpened,
    sendNextMessage,
    testSendNextMessage,
} = require("./controllers/actions")
const { Record } = require("airtable")

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN,
})

/************************
 *** Event listeners ****
 ************************/

app.event("team_join", async ({ event, client }) => {
    try {
        await sleep(5000)
        const result = await client.chat.postMessage({
            channel: event.user.id,
            text: "Hi there! :wave: \n\nWelcome to V School's Intro-to-Tech course series! \n\nTo get started on the course, you will be watching a series of short videos to complete the course onboarding. \n\nTo get started, click <https://www.youtube.com/watch?v=1l08BoI6G3M|this link> to open the first welcome video in YouTube.",
            blocks: require("./message-blocks")[0],
        })
        
        // Get user email
        const results = await client.users.profile.get({
            user: event.user,
        })
        // Add airtable field indicating they started the onboarding process
        const record = await getAirtableRecord(results.profile.email, 'started')
        await client.chat.postMessage({
            channel: "U027UB7GH7T",
            text: `Name: ${results.profile.real_name},
Course: ${record.fields.Course}
Partner: ${record.fields["From Page"]}
            `,
        });
        await client.chat.postMessage({
            channel: "U0275CR6YJH",
            text: `Name: ${results.profile.real_name},
Course: ${record.fields.Course}
Partner: ${record.fields["From Page"]}
            `,
                    });
        console.log("Sent intro message successfully")
    } catch (error) {
        console.error(error)
    }
})

/**
User IDs
--------
Bob:    U027AHG688N
Marcus: U0275CR6YJH
Zaro:   U027FTA9DBM
Grant:  U027UB7GH7T
Cody:   U0260KTKW11
 */
// app.event("member_joined_channel", async ({ event, client }) => {
//     console.log('joined event occurred')
//     if (event.user === "U027UB7GH7T") {
//         console.log('starting')
//         try {
//             // await sleep(5000)
//             // const result = await client.chat.postMessage({
//             //     channel: event.user,
//             //     text: "Hi there! :wave: \n\nWelcome to V School's Intro-to-Tech course series! \n\nTo get started on the course, you will be watching a series of short videos to complete the course onboarding. \n\nTo get started, click <https://www.youtube.com/watch?v=1l08BoI6G3M|this link> to open the first welcome video in YouTube.",
//             //     blocks: require("./message-blocks")[0],
//             // })
//             const results = await client.users.profile.get({
//                 user: event.user,
//             })
//             const record = await getAirtableRecord(results.profile.email, 'started')
//             console.log(communityLookup[record.fields["From Page"]])
//             // await client.conversations.invite({
//             //     channel: 'C02K75E2KEZ',
//             //     users: "U027UB7GH7T"
//             // }) 
//             await client.chat.postMessage({
//                 channel: "U027UB7GH7T",
//                 text: `Name: ${results.profile.real_name},
// Course: ${record.fields.Course}
// Partner: ${record.fields["From Page"]}
//                 `,
//             });
//         } catch (error) {
//             console.error(error)
//         }
//     }
// })

// app.event("member_left_channel", async ({ event, client }) => {
//     console.log('left event occurred')
    // if (event.user === "U027UB7GH7T") {
    //     console.log('starting')
    //     try {
    //         // await sleep(5000)
    //         // const result = await client.chat.postMessage({
    //         //     channel: event.user,
    //         //     text: "Hi there! :wave: \n\nWelcome to V School's Intro-to-Tech course series! \n\nTo get started on the course, you will be watching a series of short videos to complete the course onboarding. \n\nTo get started, click <https://www.youtube.com/watch?v=1l08BoI6G3M|this link> to open the first welcome video in YouTube.",
    //         //     blocks: require("./message-blocks")[0],
    //         // })
    //         const results = await client.users.profile.get({
    //             user: event.user,
    //         })
    //         const record = await getAirtableRecord(results.profile.email, 'started')
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
// })

/************************
 *** Action listeners ****
 ************************/

// Open video button clicked
app.action("video-1-opened", videoOpened(1))
app.action("video-2-opened", videoOpened(2))
app.action("video-3-opened", videoOpened(3))
app.action("video-4-opened", videoOpened(4))
app.action("video-5-opened", videoOpened(5))

// Video completed button clicked
app.action("video-1-completed", sendNextMessage(2))
app.action("video-2-completed", sendNextMessage(3))
app.action("video-3-completed", sendNextMessage(4))
app.action("video-4-completed", sendNextMessage(5))
app.action("video-5-completed", sendNextMessage(6))

/************************
 ***** Start the app *****
 ************************/

async function start() {
    const port = 3000
    await app.start(process.env.PORT || port)
    console.log(`?????? Slack Bolt app is running on port ${port}!`)
}

start()
