const videoCompletedButtonBlock = require("../message-blocks/video-completed-button")
const nextStepMessageBlocks = require("../message-blocks")

function videoOpened(videoNum) {
    return async ({ ack, body, client }) => {
        await ack()
        console.log(`Video ${videoNum} opened`)
        try {
            const result = await client.chat.postMessage({
                channel: body.user.id,
                text: "Click the button when you've finished watching the video",
                blocks: videoCompletedButtonBlock(videoNum),
            })
        } catch (error) {
            console.error(error)
        }
    }
}

function sendNextMessage(videoNum) {
    return async ({ ack, body, client }) => {
        await ack()
        console.log(`Video ${videoNum} marked as completed`)
        try {
            const result = await client.chat.postMessage({
                channel: body.user.id,
                text: "Your next onboarding task is ready.",
                blocks: nextStepMessageBlocks[videoNum - 1],
            })
        } catch (error) {
            console.error(error)
        }
    }
}

function testSendNextMessage(videoNum) {
    return async ({ ack, body, client }) => {
        if (body.user.id === "U027AHG688N") {
            await ack()
            console.log(`Video ${videoNum} marked as completed`)
            try {
                const result = await client.chat.postMessage({
                    channel: body.user.id,
                    text: "Your next onboarding task is ready.",
                    blocks: nextStepMessages[videoNum - 1],
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
}

module.exports = { videoOpened, sendNextMessage, testSendNextMessage }
