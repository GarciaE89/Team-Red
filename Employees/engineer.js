const Employee = require("./employee")

class Engineer extends Employee {
    constructor(name, id, email, github){

    
    super (name, id, email)

    this.github = github;
    this.title = "engineer";

};
getGitHub(){
return this.github
};

getRole(){
    return this.title
};

}

module.exports = Engineer