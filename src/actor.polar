actor Physician {

}

actor User{
  relations = {
    emergencyContact: User
  };
}


resource Institution{
  roles = ["doctor","nurse","admin","patient"];  
}

resource Case{
  
  permissions = ["edit","view"];
  roles = ["editor","viewer"];

  relations = { 
      institution: Institution,
      patient: User,
      doctor: Physician     
  };

  "edit" if "editor";
  "view" if "viewer";

  # admin permissions
  "editor" if "admin" on "institution";

  # patient permissions
  "viewer" if "patient";

  # emergency Contact permission
  "viewer" if "emergencyContact" on "patient";

  #doctor permission
  "editor" if "doctor";


}

resource Treatment{

  permissions = ["edit","view"];
  roles = ["editor","viewer"];


  relations = {
    case: Case,
    physician: Physician,
    patient: User
  };

  "edit" if "editor";
  "view" if "viewer";

  "editor" if "editor" on "case";

  "editor" if "physician";

  "viewer" if "patient";

  "viewer" if "emergencyContact" on "patient";

}
