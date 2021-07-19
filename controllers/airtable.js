const Airtable = require("airtable")
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appDtw82NJafLsLdO"
)
function getAirtableRecord(emailAddress) {
    const allRecords = []

    base("Pre-course Communities")
        .select({
            fields: ["Full Name", "Email", "Course", "From Page"],
            filterByFormula: `Email="${emailAddress}"`,
        })
        .eachPage(
            function page(records, fetchNextPage) {
                // This function (`page`) will get called for each page of records.
                allRecords.push(...records)
                // records.forEach(function (record) {
                //     console.log("Retrieved", record.get("Full Name"))
                // })

                // To fetch the next page of records, call `fetchNextPage`.
                // If there are more records, `page` will get called again.
                // If there are no more records, `done` will get called.
                fetchNextPage()
            },
            function done(err) {
                if (err) {
                    console.error(err)
                    return
                }
                return allRecords.find(
                    (record) => record["Email"] === emailAddress
                )
            }
        )
}

module.exports = { getAirtableRecord }
