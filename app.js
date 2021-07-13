const { App } = require("@slack/bolt")
require("dotenv").config()
const sleep = require("./utils/sleep")
const messageIntroToMember = require("./utils/message-member")
const addVideoCompletedButton = require("./message-blocks/video-completed-button")
const {
    videoOpened,
    sendNextMessage,
    testSendNextMessage,
} = require("./controllers/actions")

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN,
})

/* While developing, if someone joins the team before the app is done, get their member ID,
put it in the 2nd param below, uncomment it so the app restarts, then (once the message sends)
comment it out again */

// messageIntroToMember(app, "U027AHG688N") // Bob's user ID

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
 */
app.event("member_joined_channel", async ({ event, client }) => {
    if (event.user === "U027AHG688N") {
        try {
            await sleep(5000)
            const result = await client.chat.postMessage({
                channel: event.user,
                text: "Hi there! :wave: \n\nWelcome to V School's Intro-to-Tech course series! \n\nTo get started on the course, you will be watching a series of short videos to complete the course onboarding. \n\nTo get started, click <https://www.youtube.com/watch?v=1l08BoI6G3M|this link> to open the first welcome video in YouTube.",
                blocks: require("./message-blocks")[0],
            })
            console.log("Sent intro message successfully")
        } catch (error) {
            console.error(error)
        }
    }
})

app.event("member_left_channel", async ({ event, client }) => {
    console.log("Left channel")
})

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
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`)
}

start()
