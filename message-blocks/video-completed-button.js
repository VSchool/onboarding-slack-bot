module.exports = function (num) {
    return [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: "Click the button for the next step",
            },
            accessory: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "✅ Next Step",
                    emoji: true,
                },
                value: `video-${num}-completed`,
                action_id: `video-${num}-completed`,
            },
        },
    ]
}
