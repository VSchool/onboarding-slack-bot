const videoCompletedButtonBlock = require("../message-blocks/video-completed-button")
const nextStepMessageBlocks = require("../message-blocks")
const { getAirtableRecord } = require("./airtable")
const { courseLookup, communityLookup } = require("../utils/lookup")

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

            if (videoNum === 6) {
                const result = await client.users.profile.get({
                    user: body.user.id,
                })
                const record = await getAirtableRecord(result.profile.email)
                await client.conversations.invite({
                    channel: courseLookup[record.fields.Course],
                    users: body.user.id,
                })
                await client.conversations.invite({
                    channel: communityLookup[record.fields["From Page"]],
                    users: body.user.id,
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = { videoOpened, sendNextMessage }
