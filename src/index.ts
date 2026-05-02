import dotenv from 'dotenv'
import { Oso } from 'oso-cloud';
import { addCases, addInstitutionStaff, addPatientsAndEmergencyContacts, treatmentsPatient1, treatmentsPatient2 } from './data.js';
import type { DefaultPolarTypes } from 'oso-cloud/dist/src/helpers.js';

dotenv.config()

const apiKey = process.env.OSO_KEY as string;




async function InitData(oso : Oso<DefaultPolarTypes>){
    await addInstitutionStaff(oso);
    await addPatientsAndEmergencyContacts(oso);
    await addCases(oso);
    await treatmentsPatient1(oso);
    await treatmentsPatient2(oso)
}

async function main(){
    const oso = new Oso('https://cloud.osohq.com', apiKey)
    
    // InitData(oso);

    let isAllowed = await oso.authorize(
    { type: 'Physician', id: 'dr_strange' }, // Actor
    'edit',                                  // Action
    { type: 'Case', id: 'case_a' }           // Resource
    );

    console.log(isAllowed); 
    // Output: false, because it isnt assigned to dr strange

    isAllowed = await oso.authorize(
    { type: 'User', id: 'admin_boss' }, 
    'edit', 
    { type: 'Case', id: 'case_a' }
    );

    console.log(isAllowed); 
    // Output: true, since admin has access to all

    isAllowed = await oso.authorize(
    { type: 'User', id: 'contact_1' }, 
    'view', 
    { type: 'Treatment', id: 'treat_a1' }
    );

    console.log(isAllowed);
    // Output: true, because its a legitimate emergencyu contact

}

main();