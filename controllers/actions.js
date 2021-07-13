const videoCompletedButtonBlock = require("../message-blocks/video-completed-button")
const nextStepMessages = require("../message-blocks")

function videoOpened(videoNum) {
    return ({ ack, body, client }) => {
        await ack()
        console.log(`Video ${videoNum} opened`)
        try {
            const result = await client.chat.postMessage({
                channel: body.user.id,
                text: "Click the button when you've finished watching the video"
                blocks: videoCompletedButtonBlock(videoNum)
            })
        } catch (error) {
            console.error(error)
        }
    }
}

function sendNextVideo(videoNum) {
    return ({ ack, body, client }) => {
        await ack()
        console.log(`Video ${videoNum} marked as completed`)
        try {
            const result = await client.chat.postMessage({
                channel: body.user.id,
                text: "Text for next onboarding task"
                blocks: nextStepMessages[videoNum - 1]
            })
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = {videoOpened, sendNextVideo}