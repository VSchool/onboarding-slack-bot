const Airtable = require("airtable")
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appDtw82NJafLsLdO"
)

function getAirtableRecord(emailAddress, status) {

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
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return reject(err)
                    }
                    if(status) {
                        base("Pre-course Communities")
                        .update(record.id, {
                            "Status": status,
                          }, {typecast: true}, function(err, record) {
                            if (err) {
                              console.error(err);
                              return;
                            }
                            console.log(`Status updated successfully to ${record.get('Status')}`);
                          });
                    }
                    return resolve(record)
                }
            )
    })
}

// function updateAirtableRecord(status, email) {
//     let record = getAirtableRecord(email)
//     console.log(record, 'This that updated junk')
//     // base('Pre-course Communities')
//     //     .update("recwYo6bfzP61vFOU", {
//     //     "First Name": "Josh",
//     //     "Last Name": "Olive",
//     //     "Email": "josholive46@gmail.com",
//     //     "Course Goals": [
//     //       "Improve my current skills"
//     //     ],
//     //     "Course": "Web Development",
//     //     "Why interested": "test",
//     //     "UTM Campaign": "ton",
//     //     "UTM Source": "pdf",
//     //     "UTM Medium": "ton",
//     //     "From Page": "the-opportunity-network",
//     //     "Status": "Completed",
//     //     "Full Name": "Josh Olive"
//     //   }, function(err, record) {
//     //     if (err) {
//     //       console.error(err);
//     //       return;
//     //     }
//     //     console.log(record.get('First Name'));
//     //   });
// }




module.exports = { getAirtableRecord }
