 const inquirer = require("inquirer");

 const fs = require("fs");
 
 const style = require("./assets/style.js")

 const Engineer = require("./Employees/engineer");


 const Intern = require("./Employees/intern");

 const Manager = require("./Employees/Manager");

 let team = [];

 function startPrompt(){
     inquirer.prompt([{
         message: "Hello please provide your team name",
         name:"teamName",
        
         
     }])

     .then(
         function(data){
             const teamName = data.teamName
             team.push(teamName)
             addManager()
         }
     )
     function addManager(){
         inquirer.prompt([{
             message: "What is your team Managers name?",
             name:"name",

         },
        {
            message: "What is your manager's email?",
            name:"email"
        },
        {
            type:"number",
            message:"What is your manager's office number?",
            name:"officeNumber"
        },
        
        ])
        .then(function(data){
            const name = data.name
            const id = 1
            const email = data.email
            const officeNumber = data.officeNumber
            const teamMember = new Manager(name, id, email, officeNumber)
            team.push(teamMember)
            addteamMembers();

        });

     }

     function addteamMembers(){
         inquirer.prompt([
             {
             type: "list",
             message:"Add more team members?",
             choices: ["Yes, add Engineer", "Yes, add Intern", "No, team completed"],
             name: "addMemberData"
             }
         ])
         .then(function(data){
             switch(data.addMemberData)
             {
                 case "Yes, add Engineer":
                     addEngineer();
                     break;

                     case "Yes, add Intern":
                     addIntern();
                     break;

                    case "No, team completed":
                        finishedTeam();
                        break;
                        

             }
         });
     }

     function addEngineer(){
         inquirer.prompt([
             {
            message: "What is the Engineer's name?",   
            name: "name",
            
        },
        {
            message: "What is the Engineer's email address?",
            name: "email",
        },
        {
            message: "what is the Engineer's GitHub?",
            name: "Github"
        },

         ])
         .then(function(data){
            const name = data.name
            const id = team.length + 1
            const email = data.email
            const github = data.github
            const teamMember = new Engineer(name, id, email, github)
            team.push(teamMember)
            addteamMembers()

         });
     };

     function addIntern(){

        inquirer.prompt([
            {
           message: "What is the Intern's name?",   
           name: "name",
           
       },
       {
           message: "What is the Intern's email address?",
           name: "email",
       },
       {
           message: "what is the Intern's School?",
           name: "School"
       },
    ])

    .then(function(data){
        const name = data.name
            const id = team.length + 1
            const email = data.email
            const school = data.school
            const teamMember = new Intern(name, id, email, school)
            team.push(teamMember)
            addteamMembers()
    });


};
function finishedTeam(){
    console.log("Done")

    const htmlArray = [];
    const htmlStart = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${team[0]}</title>
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
    ${style}</style>
</head>
<body>
<div class="banner-Bar">
<h1>${team[0]}</h1>
    </div>
    <div class="card-container">
    `
    htmlArray.push(htmlStart);
    for (let i = 1; i < team.length; i++) {
        let object = `
        <div class="member-card">
            <div class="card-top">
                <h2>${team[i].name}</h2>
                <h2>${team[i].title}</h2>
            </div>
            <div class="card-bottom">
                <p>Employee ID: ${team[i].id}</p>
                <p>Email: <a href="mailto:${team[i].email}">${team[i].email}</a>></p>

    `
    if (team[i].officeNumber) {
        object += `
        <p>${team[i].officeNumber}</p>
        `
    }
    if (team[i].github) {
        object += `
        <p>GitHub: <a href="https://github.com/${team[i].github}">${team[i].github}</a></p>
        `
    }
    if (team[i].school) {
        object += `
        <p>School: ${team[i].school}</p>
        `
    }
    object += `
    </div>
    </div>
    `
    htmlArray.push(object)
}
const htmlEnd = `
</div>
</body>
</html>
`
htmlArray.push(htmlEnd);
fs.writeFile(`./generate-html/${team[0]}.html`, htmlArray.join(""), function (err) {
})
}}
startPrompt() 




 