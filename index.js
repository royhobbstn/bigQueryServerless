
  const BigQuery = require('@google-cloud/bigquery');

exports.bigQueryTest = function bigQueryTest (req, res) {
    
const sqlQuery = 'SELECT logrecno, sumlevel FROM acs0913.g20135co;';

  // Instantiates a client
  const bigquery = BigQuery({
    projectId: 'censusbigquery'
  });

  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: false // Use standard SQL syntax for queries.
  };

  // Runs the query
  bigquery
    .query(options)
    .then((results) => {
      const rows = results[0];
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      res.status(500).send(JSON.stringify(err));
    });



};
