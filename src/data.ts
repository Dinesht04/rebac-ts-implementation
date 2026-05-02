import { Oso } from 'oso-cloud';
import type { DefaultPolarTypes } from 'oso-cloud/dist/src/helpers.js';

export async function addInstitutionStaff(oso : Oso<DefaultPolarTypes>){
    await oso.insert(["has_role", {type: "User", id: "admin_boss"}, "admin", {type: "Institution", id: "general_hospital"}]);
    await oso.insert(["has_role", {type: "User", id: "nurse_jackie"}, "nurse", {type: "Institution", id: "general_hospital"}]);
}

export async function addPatientsAndEmergencyContacts(oso : Oso<DefaultPolarTypes>){
    // Patient 1
    await oso.insert(["has_relation", {type: "User", id: "patient_1"}, "emergencyContact", {type: "User", id: "contact_1"}]);

    // Patient 2
    await oso.insert(["has_relation", {type: "User", id: "patient_2"}, "emergencyContact", {type: "User", id: "contact_2"}]);
}

export async function addCases(oso : Oso<DefaultPolarTypes>){
    // Case A (Assigned to Dr. House)
    await oso.insert(["has_relation", {type: "Case", id: "case_a"}, "institution", {type: "Institution", id: "general_hospital"}]);
    await oso.insert(["has_relation", {type: "Case", id: "case_a"}, "patient", {type: "User", id: "patient_1"}]);
    await oso.insert(["has_relation", {type: "Case", id: "case_a"}, "doctor", {type: "Physician", id: "dr_house"}]);

    // Case B (Assigned to Dr. Strange)
    await oso.insert(["has_relation", {type: "Case", id: "case_b"}, "institution", {type: "Institution", id: "general_hospital"}]);
    await oso.insert(["has_relation", {type: "Case", id: "case_b"}, "patient", {type: "User", id: "patient_2"}]);
    await oso.insert(["has_relation", {type: "Case", id: "case_b"}, "doctor", {type: "Physician", id: "dr_strange"}]);
}

export async function treatmentsPatient1(oso : Oso<DefaultPolarTypes>){
    // Treatment A1 (Primary assigned to Dr. House)
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_a1"}, "case", {type: "Case", id: "case_a"}]);
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_a1"}, "patient", {type: "User", id: "patient_1"}]);
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_a1"}, "physician", {type: "Physician", id: "dr_house"}]);

    // Treatment A2 (Consult assigned to Dr. Strange)
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_a2"}, "case", {type: "Case", id: "case_a"}]);
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_a2"}, "patient", {type: "User", id: "patient_1"}]);
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_a2"}, "physician", {type: "Physician", id: "dr_strange"}]);
}

export async function treatmentsPatient2(oso : Oso<DefaultPolarTypes>){
    // Treatment B1 (Primary assigned to Dr. Strange)
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_b1"}, "case", {type: "Case", id: "case_b"}]);
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_b1"}, "patient", {type: "User", id: "patient_2"}]);
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_b1"}, "physician", {type: "Physician", id: "dr_strange"}]);

    // Treatment B2 (Consult assigned to Dr. House)
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_b2"}, "case", {type: "Case", id: "case_b"}]);
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_b2"}, "patient", {type: "User", id: "patient_2"}]);
    await oso.insert(["has_relation", {type: "Treatment", id: "treat_b2"}, "physician", {type: "Physician", id: "dr_house"}]);
}