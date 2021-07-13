module.exports = async function (app, uid) {
    await app.client.chat.postMessage({
        channel: uid,
        text: "Hi there! :wave: \n\nWelcome to V School's Intro-to-Tech course series! \n\nTo get started on the course, you will be watching a series of short videos to complete the course onboarding. \n\nTo get started, click <https://www.youtube.com/watch?v=1l08BoI6G3M|this link> to open the first welcome video in YouTube.",
        blocks: require("../message-blocks/temp-full-message"),
    })
}
