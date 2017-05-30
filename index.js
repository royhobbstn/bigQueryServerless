

const BigQuery = require('@google-cloud/bigquery');



exports.bigQueryTest = function bigQueryTest(req, res) {
  
  // if GET, parameters come as req.query.yourgetfieldname
  // ex: https://gcp-royhobbstn.c9users.io/censusbigquery/us-central1/bigQueryTest?field=logrecno
  
  // if POST, req.body.yourgetfieldname
  // curl -X POST https://gcp-royhobbstn.c9users.io/censusbigquery/us-central1/bigQueryTest -H "Content-Type:application/json" --data '{"field":"logrecno"}'


  const sqlQuery = "SELECT " + req.body.field  + ", sumlevel FROM `censusbigquery.acs0913.g20135*` where sumlevel='040';";


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
      res.status(500).send(err);
    });

};
