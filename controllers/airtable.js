const Airtable = require("airtable")
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appDtw82NJafLsLdO"
)
function getAirtableRecord(emailAddress, callback) {
    return new Promise((resolve, reject) => {
        let record
        base("Pre-course Communities")
            .select({
                fields: ["Full Name", "Email", "Course", "From Page"],
                filterByFormula: `Email="${emailAddress}"`,
            })
            .eachPage(
                // If there is another page to get, it'll call `page`
                // If not, it'll call `done`
                function page(records, fetchNextPage) {
                    record = records[0]
                    console.log(record)
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return reject(err)
                    }
                    return resolve(record)
                }
            )
    })
}

module.exports = { getAirtableRecord }
