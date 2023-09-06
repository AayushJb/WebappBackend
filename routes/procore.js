
const client_id = process.env.PROCORE_CLIENT_ID;
const client_secret = process.env.PROCORE_CLIENT_SECRET;
var access_key;

console.log({ client_id, client_secret })



//=====================================================================================================
async function getAccessToken(code) {

  const grant_type = 'authorization_code';
  const redirect_uri = 'http://localhost:4200';
  const refresh_token = 'string'


  const res = await fetch('https://api.procore.com/oauth/token', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      grant_type,
      client_id,
      client_secret,
      code,
      redirect_uri,
      refresh_token

    })

  })

const data = await res.json();
const params = new URLSearchParams(data)

return params.get("access_token")

}

//=====================================================================================================
async function GetProjectDetails(query,access_key)
{
 
  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${query}?company_id=562949953442334`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_key}`,
     }
   
  })

const data = await res.json();

return data

}

//=====================================================================================================
async function ListProjects(access_token)
{
 
  const res = await fetch('https://api.procore.com/rest/v1.0/companies/562949953442334/projects', {
    method: 'GET',
    qs: {
      page: '240', per_page: '240'
    },
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json'
     }
   
  })

const data = await res.json();

return data

}

//======================================================================================================
async function UpdateProject(access_token,projectID,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code)
{
 
  
  const res = await fetch(`https://api.procore.com/rest/v1.0/projects/${projectID}`, {
    method: 'PATCH',
    qs: {
      company_id: '562949953442334',
      run_configurable_validations: 'false'
    },
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },

    body: JSON.stringify(
      {
        company_id: 562949953442334,
        project: {
          active: true,
          address: address,
          city: city,
          country_code: country_code,
          start_date: start_date,
          completion_date: completion_date,
          total_value: total_value,
          name: name,
          office_id: office_id,
          phone: phone,
          project_number: project_number,
          square_feet: square_feet,
          state_code: state_code,
          time_zone: time_zone,
          zip: zip,
          project_type_id: project_type_id,
          estimated_value: estimated_value,
          estimated_start_date: estimated_start_date,
          estimated_completion_date: estimated_completion_date
        }
      }
    )
   
  })

const data = await res.json();

return data

}

//======================================================================================================

async function CreateProjectDetails(access_token,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code)
{

  const res = await fetch('https://api.procore.com/rest/v1.0/projects', {
    method: 'POST',
    qs: {run_configurable_validations: 'false'},
    headers: {
    Authorization: `Bearer ${access_token}`,
    'content-type': 'application/json',
    'Procore-Company-Id': 562949953442334
     },
    body: JSON.stringify({
      company_id: 562949953442334,
      project: {
        active: true,
        address: address,
        city: city,
        country_code: country_code,
        start_date: start_date,
        completion_date: completion_date,
        total_value: total_value,
        name: name,
        office_id: office_id,
        phone: phone,
        project_number: project_number,
        square_feet: square_feet,
        state_code: state_code,
        time_zone: time_zone,
        zip: zip,
        project_type_id: project_type_id,
        estimated_value: estimated_value,
        estimated_start_date: estimated_start_date,
        estimated_completion_date: estimated_completion_date
      }

    })
   
  })

const data = await res.json();

return data

}


//======================================================================================================

 async function GetProjectTemplates(access_token)
 {

 // GET /rest/v1.0/project_templates


 const res = await fetch('https://api.procore.com/rest/v1.0/project_templates?company_id=562949953442334', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${access_key}`,
   }
 
})


//project template id  = 562949953740186

const data = await res.json();

return data


 }



//========================================================================================================================

                                                  /*   ROUTES   */

//========================================================================================================================

app.get('/api/projects/:id', async(req, res) => {
 
  var query = req.params.id; 
  const token = await getAccessToken(query);
  access_key = token;
 
  const ListCompanies = await  ListProjects(token)
   res.json(ListCompanies)
 
});


//===========================================================================


app.get('/api/project/:id', async(req, res) => {
 
  var query = req.params.id; 

   const ProjectDetails = await GetProjectDetails(query,access_key)

   res.json(ProjectDetails)

});



app.post('/api/createproject', async(req, res) => {

  var active = "true";
  var address = req.body.Address;
  var city = req.body.City;
  var state_code = req.body.StateCode;
  var country_code = req.body.Country;
  var start_date = req.body.StartDate;
  var completion_date = req.body.CompletionDate;
  var total_value = req.body.TotalValue;
  var name = req.body.ProjectName;
  var office_id = "562949953447187"
  var phone = req.body.PhoneNumber;
  var project_number = req.body.ProjectNumber;
  var square_feet = req.body.SquareFeet;
  var time_zone = "Asia/Kolkata"
  var zip = req.body.Pincode;
  var project_type_id = "562949953511908";
  var estimated_value = req.body.EstimatedValue;
  var estimated_start_date = req.body.EstimatedStartDate;
  var estimated_completion_date = req.body.EstimatedCompletionDate;
 


  const CreatedProject = await CreateProjectDetails(access_key,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code)
  res.json(CreatedProject)

});


app.post('/api/updateproject/:id', async(req, res) => {

  var projectID =  req.params.id;
  var active = "true";
  var address = req.body.Address;
  var city = req.body.City;
  var state_code = req.body.StateCode;
  var country_code = req.body.Country;
  var start_date = req.body.StartDate;
  var completion_date = req.body.CompletionDate;
  var total_value = req.body.TotalValue;
  var name = req.body.ProjectName;
  var office_id = "562949953447187"
  var phone = req.body.PhoneNumber;
  var project_number = req.body.ProjectNumber;
  var square_feet = req.body.SquareFeet;
  var time_zone = "Asia/Kolkata"
  var zip = req.body.Pincode;
  var project_type_id = "562949953511908";
  var estimated_value = req.body.EstimatedValue;
  var estimated_start_date = req.body.EstimatedStartDate;
  var estimated_completion_date = req.body.EstimatedCompletionDate;
 


  const UpdatedProject = await UpdateProject(access_key,projectID,active,address,city,country_code,start_date,completion_date,total_value,name,office_id,phone,project_number,square_feet,time_zone,zip,project_type_id,estimated_value,estimated_start_date,estimated_completion_date,state_code)
  res.json(UpdatedProject)

});


app.get('/oauth/procore/callback', async (req, res) => {

  const code = req.query.code;
  //console.log('Code: ', code)

  const token = await getAccessToken(code);
  //res.json(token)
 
//=========================ADD PROJECT=====================================
    const companies = await CreateProjectDetails(token)
   res.json(companies)

//=========================UPDATE PROJECT=====================================

   // const UpdateCompanies = await UpdateProcoreUser(token)
   // res.json(UpdateCompanies)

//=========================LIST PROJECTS=====================================
   
 //  const ListCompanies = await ListProcoreUser(token)
 //  res.json(ListCompanies)


})





