actor Physician {

}

actor User{
  relations = {
    emergencyContact: User
  };
}


resource Institution{
  roles = ["nurse","admin"];  
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
  "viewer" if "editor";

  # admin permissions
  "editor" if "admin" on "institution";

  # patient permissions
  "viewer" if "patient";

  # emergency Contact permission
  "viewer" if "emergencyContact" on "patient";

  #doctor permission
  "editor" if "doctor";

  # nurse permissions
  "editor" if "nurse" on "institution";


}

resource Treatment{

  permissions = ["edit","view"];
  roles = ["editor","viewer"];


  relations = {
    case: Case,
    patient: User,
    physician: Physician
  };

  "edit" if "editor";
  "view" if "viewer";
  "viewer" if "editor";

  "editor" if "editor" on "case";
  "viewer" if "editor";


  "editor" if "physician";

  "viewer" if "patient";

  "viewer" if "emergencyContact" on "patient";

}
