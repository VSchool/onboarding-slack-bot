const { App } = require("@slack/bolt")
require("dotenv").config()
const sleep = require("./utils/sleep")
const messageIntroToMember = require("./utils/message-member")

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN,
})

// While developing, if someone joins the team before the app is done, get their member ID,
// put it in the 2nd param below, uncomment it so the app restarts, then (once the message sends)
// comment it out again

// messageIntroToMember(app, "U027AHG688N") // Bob's user ID

app.event("team_join", async ({ event, client }) => {
    try {
        await sleep(5000)
        const result = await client.chat.postMessage({
            channel: event.user.id,
            text: "Hi there! :wave: \n\nWelcome to V School's Intro-to-Tech course series! \n\nTo get started on the course, you will be watching a series of short videos to complete the course onboarding. \n\nTo get started, click <https://www.youtube.com/watch?v=1l08BoI6G3M|this link> to open the first welcome video in YouTube.",
            blocks: require("./message-blocks/temp-full-message"),
        })
        console.log("Sent intro message successfully")
    } catch (error) {
        console.error(error)
    }
})

app.event("member_joined_channel", async ({ event, client }) => {
    if (event.user === "U027AHG688N") {
        console.log(event.user)
        try {
            const result = await client.chat.postMessage({
                channel: event.user,
                text: "Hi there! :wave: \n\nWelcome to V School's Intro-to-Tech course series! \n\nTo get started on the course, you will be watching a series of short videos to complete the course onboarding. \n\nTo get started, click <https://www.youtube.com/watch?v=1l08BoI6G3M|this link> to open the first welcome video in YouTube.",
                blocks: require("./message-blocks/temp-full-message"),
            })
        } catch (error) {
            console.error(error)
        }
    }
})

app.action("video-1-opened", async ({ ack, body, client }) => {
    await ack()
    console.log("Video 1 opened")
    // try {
    //     const result = await client.chat.postMessage({
    //         channel: body.user.id,
    //         text: "Text for next onboarding task"
    //         blocks: require("./message-blocks/temp-full-message"),
    //     })
    // } catch (error) {
    //     console.error(error)
    // }
})

app.action("video-1-completed", async ({ ack, body, client }) => {
    await ack()
    console.log("Video 1 completed")
})

app.action("video-2-opened", async ({ ack, body, client }) => {
    await ack()
    console.log("Video 2 opened")
})

app.action("video-2-completed", async ({ ack, body, client }) => {
    await ack()
    console.log("Video 2 completed")
})

app.action("video-3-opened", async ({ ack, body, client }) => {
    await ack()
    console.log("Video 3 opened")
})

app.action("video-3-completed", async ({ ack, body, client }) => {
    await ack()
    console.log("Video 3 completed")
})

app.action("video-4-opened", async ({ ack, body, client }) => {
    await ack()
    console.log("Video 4 opened")
})

app.action("video-4-completed", async ({ ack, body, client }) => {
    await ack()
    console.log("Video 4 completed")
})

app.action("video-5-opened", async ({ ack, body, client }) => {
    await ack()
    console.log("Video 5 opened")
})

app.action("video-5-completed", async ({ ack, body, client }) => {
    await ack()
    console.log("Video 5 completed")
})

app.event("member_left_channel", async ({ event, client }) => {
    console.log("Left channel")
})

async function start() {
    const port = 3000
    await app.start(process.env.PORT || port)
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`)
}

start()
