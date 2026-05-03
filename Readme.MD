# ReBAC Implementation in Node.js + TypeScript

A TypeScript implementation of **Relationship-Based Access Control (ReBAC)**, based on the research paper [Relationship-based access control: protection model and policy language](https://dl.acm.org/doi/10.1145/1943513.1943539), using [Oso Cloud](https://www.osohq.com/docs) as the authorization engine.

---

## 📖 Blog Posts

Full writeup with explanation of the paper and implementation walkthrough:

- [Dev.to](https://dev.to/dinesht04/implementing-relationship-based-access-control-rebac-using-node-and-oso-iga)
- [Medium](https://medium.com/@dineshtyagi567/implementing-relationship-based-access-control-rebac-using-node-and-oso-0c64274d5af6)

---

## Quick Overview of ReBAC

Most apps use Role-Based Access Control (RBAC), you're an admin, you get access. Simple.

ReBAC goes deeper. Access is determined by the **relationships** between users and resources, not just their role. And it's transitive:

```
Student → enrolled in → Course → taught by → Professor
```

This means you can answer *"which professor teaches which student?"* with zero direct relationship between them.

---

## The Example: EHR System

This implementation models an **Electronic Health Records (EHR)** system, the same example used in the paper. The entities involved are:

| Actor / Resource | Description |
|---|---|
| `Physician` | Doctors assigned to cases |
| `User` | Patients, admins, emergency contacts |
| `Institution` | Hospital with nurses and admins |
| `Case` | A patient's medical case |
| `Treatment` | A treatment record linked to a case |

### Example Authorization Decisions

```typescript
// Dr. Strange tries to edit a case they're NOT assigned to → false
oso.authorize({ type: 'Physician', id: 'dr_strange' }, 'edit', { type: 'Case', id: 'case_a' })

// Hospital admin tries to edit a case → true
oso.authorize({ type: 'User', id: 'admin_boss' }, 'edit', { type: 'Case', id: 'case_a' })

// Legitimate emergency contact tries to view a treatment → true
oso.authorize({ type: 'User', id: 'contact_1' }, 'view', { type: 'Treatment', id: 'treat_a1' })
```

---

## Tech Stack

- **Node.js**
- **TypeScript**
- **[Oso Cloud](https://www.osohq.com/docs)** — authorization engine with Polar policy language

---

## Getting Started

### Prerequisites

- Node.js
- An [Oso Cloud](https://www.osohq.com) account and API key
- The Polar schema loaded into your Oso Cloud console (see the blog post for the full schema)

### Installation

```bash
git clone https://github.com/Dinesht04/rebac-ts-implementation
cd rebac-ts-implementation
npm install
```

### Environment Setup

Create a `.env` file in the root:

```
OSO_KEY="your_oso_cloud_api_key"
```

### Running

```bash
# Build and run
npm run s

# Or separately
npm run build
npm run dev
```

---

## Project Structure

```
├── src/
│   ├── index.ts       # Entry point, authorization examples
│   └── data.ts        # Seed functions for facts/relations
    └── rules.polar    # Rules defined in the Oso Cloud Rule editor
├── .env               
├── tsconfig.json
└── package.json
```

---

## How the Data is Seeded

Before running authorization checks, facts need to be inserted into Oso Cloud. This is handled by `InitData()` in `index.ts` — uncomment it on first run:

```typescript
// Uncomment on first run to seed data
// await InitData(oso);
```

The seed functions in `data.ts` insert relationships like:

```typescript
// patient_1's emergency contact is contact_1
await oso.insert(["has_relation", {type: "User", id: "patient_1"}, "emergencyContact", {type: "User", id: "contact_1"}]);

// case_a belongs to general_hospital, is assigned to dr_house
await oso.insert(["has_relation", {type: "Case", id: "case_a"}, "institution", {type: "Institution", id: "general_hospital"}]);
await oso.insert(["has_relation", {type: "Case", id: "case_a"}, "doctor", {type: "Physician", id: "dr_house"}]);
```

---

## References

- [Research Paper — Relationship-based access control: protection model and policy language](https://dl.acm.org/doi/10.1145/1943513.1943539)
- [Oso Cloud TypeScript SDK](https://www.osohq.com/docs/reference/sdks/facts)
- [Oso Blog — ReBAC in Node.js](https://www.osohq.com/post/relationship-based-access-control-rebac-in-node-js-with-oso-cloud)