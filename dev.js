const { App } = require("@slack/bolt")
require("dotenv").config()
const sleep = require("./utils/sleep")
const messageIntroToMember = require("./utils/message-member")
const addVideoCompletedButton = require("./message-blocks/video-completed-button")
const { videoOpened, sendNextVideo } = require("./controllers/actions")

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

app.event("team_join", sendNextVideo(0))

app.event("member_left_channel", async ({ event, client }) => {
    console.log("Left channel")
})

/************************
*** Action listeners ****
************************/

// Open video button clicked
app.action("video-1-opened", videoOpened("1"))
app.action("video-2-opened", videoOpened("2"))
app.action("video-3-opened", videoOpened("3"))
app.action("video-4-opened", videoOpened("4"))
app.action("video-5-opened", videoOpened("5"))

// Video completed button clicked
app.action("video-1-completed", videoCompleted("1"))
app.action("video-2-completed", videoCompleted("2"))
app.action("video-3-completed", videoCompleted("3"))
app.action("video-4-completed", videoCompleted("4"))
app.action("video-5-completed", videoCompleted("5"))

/************************
***** Start the app *****
************************/

async function start() {
    const port = 3000
    await app.start(process.env.PORT || port)
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`)
}

start()
