const messageBlocks1 = [
    {
        type: "header",
        text: {
            type: "plain_text",
            text: "Hi there! :wave:",
            emoji: true,
        },
    },
    {
        type: "section",
        text: {
            type: "mrkdwn",
            text: "Welcome to V School's Intro-to-Tech course series! \n\nTo get started on the course, you will be watching a series of short videos to complete the course onboarding. \n\n To get started, click the button below to open the first welcome video in YouTube.\n\n*At the end of each video it will instruct you to type `/step <n> done`, however we've recently updated this bot to use buttons instead of the slash commands to progress from one step to the next. Thanks for your patience as we work on updating the videos to reflect this change.*",
        },
    },
    {
        type: "divider",
    },
    {
        type: "header",
        text: {
            type: "plain_text",
            text: "Step 1 - Onboarding",
            emoji: true,
        },
    },
    {
        type: "section",
        text: {
            type: "mrkdwn",
            text: "A quick welcome video introducing you to this onboarding process.",
        },
    },
    {
        type: "actions",
        elements: [
            {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "Open welcome video 🎬",
                    emoji: true,
                },
                value: "open-video-1",
                action_id: "video-1-opened",
                url: "https://www.youtube.com/watch?v=1l08BoI6G3M",
            },
        ],
    },
]

const messageBlocks2 = [
    {
        type: "divider",
    },
    {
        type: "header",
        text: {
            type: "plain_text",
            text: "Step 2 - Slack profile setup",
            emoji: true,
        },
    },
    {
        type: "section",
        text: {
            type: "mrkdwn",
            text: "It's important to set up your Slack profile so we can get to know you a little better. Click the button below to watch a video helping you get your Slack profile all set up.",
        },
    },
    {
        type: "actions",
        elements: [
            {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "Slack profile setup 🎬",
                    emoji: true,
                },
                value: "open-video-2",
                action_id: "video-2-opened",
                url: "https://www.youtube.com/watch?v=gQhyJ-trOno",
            },
        ],
    },
]

const messageBlocks3 = [
    {
        type: "divider",
    },
    {
        type: "header",
        text: {
            type: "plain_text",
            text: "Step 3 - Slack orientation",
            emoji: true,
        },
    },
    {
        type: "section",
        text: {
            type: "mrkdwn",
            text: "Next, we'll walk you through our Slack workspace so you can better understand how we will be communicating with you as your work through the intro-to-tech curriculum",
        },
    },
    {
        type: "actions",
        elements: [
            {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "Slack orientation 🎬",
                    emoji: true,
                },
                value: "open-video-3",
                action_id: "video-3-opened",
                url: "https://www.youtube.com/watch?v=JFm3mV8jgCQ",
            },
        ],
    },
]

const messageBlocks4 = [
    {
        type: "divider",
    },
    {
        type: "header",
        text: {
            type: "plain_text",
            text: "Step 4 - How to ask questions",
            emoji: true,
        },
    },
    {
        type: "section",
        text: {
            type: "mrkdwn",
            text: "Asking questions is a crucial part of being a student with V School. In the next video, we'll show you the best way to ask any questions that arise so we can best help you",
        },
    },
    {
        type: "actions",
        elements: [
            {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "Asking questions 🎬",
                    emoji: true,
                },
                value: "open-video-4",
                action_id: "video-4-opened",
                url: "https://www.youtube.com/watch?v=qzAbfA4zqPs",
            },
        ],
    },
]

const messageBlocks5 = [
    {
        type: "divider",
    },
    {
        type: "header",
        text: {
            type: "plain_text",
            text: "Step 5 - How to access the curriculum",
            emoji: true,
        },
    },
    {
        type: "section",
        text: {
            type: "mrkdwn",
            text: "Finally, we'll show you how to access the actual curriculum so you can get started with your learning journey right away.",
        },
    },
    {
        type: "actions",
        elements: [
            {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "Accessing curriculum 🎬",
                    emoji: true,
                },
                value: "open-video-5",
                action_id: "video-5-opened",
                url: "https://www.youtube.com/watch?v=mp8MOAceRhQ",
            },
        ],
    },
]

const messageBlocks6 = [
    {
        type: "divider",
    },
    {
        type: "header",
        text: {
            type: "plain_text",
            text: "Great job!",
            emoji: true,
        },
    },
    {
        type: "section",
        text: {
            type: "mrkdwn",
            text: "Now you're all set to start learning with V School's Intro-to-Tech course. Good luck, and don't hesitate to reach out to your instructor with any questions that you have.",
        },
    },
]

module.exports = [
    messageBlocks1,
    messageBlocks2,
    messageBlocks3,
    messageBlocks4,
    messageBlocks5,
    messageBlocks6,
]
