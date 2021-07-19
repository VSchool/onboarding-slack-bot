const videoCompletedButtonBlock = require("../message-blocks/video-completed-button")
const nextStepMessageBlocks = require("../message-blocks")

function videoOpened(videoNum) {
    return async ({ ack, body, client }) => {
        await ack()
        console.log(`Video ${videoNum} opened by ${body.user.username}`)
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
        console.log(
            `Video ${videoNum - 1} marked as completed by ${body.user.username}`
        )
        try {
            await client.chat.postMessage({
                channel: body.user.id,
                text: "Your next onboarding task is ready.",
                blocks: nextStepMessageBlocks[videoNum - 1],
            })
            await client.chat.delete({
                channel: body.channel.id,
                ts: body.message.ts,
            })

            // This is to get the users email address
            // if(videoNum === 6){
            //     const result = await client.users.identity({
            //         token: process.env.SLACK_USER_TOKEN
            //     })
            //     console.log(result)
            // }

            // This is to add a user to a channel
            // if(videoNum === 6){
            //     const result = await client.conversations.invite({
            //         channel: 'C0260LX5QEP', // #web_development_course
            //         users: body.user.id
            //     })
            // }
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
