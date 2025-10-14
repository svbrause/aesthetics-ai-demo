# Severity Scores Guide

## ✅ Severity Scores Added!

I've updated the patient data structure to include **severity scores** for each finding. Now you can directly edit both the finding names AND their severity scores in the JSON file.

## 📁 File to Edit

**`/src/app/provider/patient/[id]/page.tsx`**

Find the `mockPatients` object (around line 8) and add your new patient.

## 🔧 New Structure

Each finding now has three properties:

```typescript
{
  name: "Finding Name",        // The medical term
  severity: "mild|moderate|severe",  // Severity level
  score: 75                    // Numerical score (0-100)
}
```

## 📊 Severity Levels

- **`"mild"`** - Score range: 50-65
- **`"moderate"`** - Score range: 66-80
- **`"severe"`** - Score range: 81-100

## 🎯 Example Patient Entry

```typescript
"1007": {
  id: "1007",
  name: "Your Patient Name",
  age: 35,
  email: "patient@email.com",
  phone: "(555) 123-4567",
  lastVisit: "2024-01-25",
  score: 82,
  findings: [
    { name: "Forehead Wrinkles", severity: "moderate", score: 75 },
    { name: "Glabella Wrinkles", severity: "mild", score: 60 },
    { name: "Dark Spots", severity: "mild", score: 65 },
    { name: "Red Spots", severity: "mild", score: 55 },
    { name: "Marionette Lines", severity: "moderate", score: 70 },
    { name: "Temporal Hollow", severity: "moderate", score: 68 },
    { name: "Brow Asymmetry", severity: "mild", score: 62 },
    { name: "Crooked Nose", severity: "moderate", score: 72 },
    { name: "Dorsal Hump", severity: "mild", score: 58 },
    { name: "Over-Rotated", severity: "mild", score: 60 },
    { name: "Nasal Tip Too Wide", severity: "moderate", score: 68 },
    { name: "Thin Lips", severity: "moderate", score: 70 },
    { name: "Lacking Philtral Column", severity: "mild", score: 55 },
    { name: "Long Philtral Column", severity: "mild", score: 58 },
    { name: "Dry Lips", severity: "mild", score: 50 },
    { name: "Lip Thinning When Smiling", severity: "moderate", score: 65 },
    { name: "Retruded Chin", severity: "moderate", score: 72 }
  ],
  frontImage: "https://your-image-url.com/front.jpg",
  sideImage: "https://your-image-url.com/side.jpg",
  scanDate: "January 25, 2024",
  airtableRecordId: "recYourAirtableId"
}
```

## 🚀 How to Add a New Patient

1. **Open** `/src/app/provider/patient/[id]/page.tsx`
2. **Find** the `mockPatients` object
3. **Add** a new patient entry with the structure above
4. **Save** the file
5. **View** at `http://localhost:3000/provider/patient/[ID]`

## 📋 Template File

I've also created `patient-with-severity-template.json` with the complete structure you can copy from.

## ✅ Benefits

- ✅ **Direct editing** - No complex APIs needed
- ✅ **Severity scores** - Each finding has a severity level and score
- ✅ **Immediate updates** - Changes appear instantly in the UI
- ✅ **Professional terminology** - Uses proper medical terms
- ✅ **Flexible scoring** - You control the exact scores for each finding

Now you can directly edit the severity scores for each finding in the JSON file! 🎯






