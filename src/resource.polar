resource Issue {
    permissions = ["edit"];

    roles = ["editor"];

    "edit" if "editor";
}