const diseaseMedicineData = {
    "Common Cold": "Paracetamol, Ibuprofen",
    "Flu": "Oseltamivir (Tamiflu), Zanamivir (Relenza)",
    "Migraine": "Sumatriptan, Rizatriptan",
    "Hypertension": "Amlodipine, Lisinopril",
    "Diabetes": "Metformin, Insulin",
    "Asthma": "Albuterol (Ventolin), Salmeterol (Serevent)",
    "COVID-19": "Paxlovid, Remdesivir",
    "Strep Throat": "Amoxicillin, Azithromycin",
    "Pneumonia": "Levofloxacin, Azithromycin",
    "Bronchitis": "Doxycycline, Amoxicillin",
    "Allergies": "Loratadine (Claritin), Cetirizine (Zyrtec)",
    "Anxiety": "Sertraline, Alprazolam",
    "Depression": "Fluoxetine, Sertraline",
    "Gastric Ulcer": "Omeprazole, Pantoprazole",
    "Acid Reflux": "Ranitidine, Esomeprazole",
    "Arthritis": "Ibuprofen, Naproxen",
    "Hyperthyroidism": "Methimazole, Propylthiouracil",
    "Hypothyroidism": "Levothyroxine",
    "Urinary Tract Infection (UTI)": "Ciprofloxacin, Trimethoprim-Sulfamethoxazole",
    "Tuberculosis": "Isoniazid, Rifampicin",
    "Conjunctivitis": "Ciprofloxacin drops, Erythromycin ointment",
    "Sinusitis": "Amoxicillin, Doxycycline",
    "Ear Infection": "Amoxicillin, Ciprofloxacin",
    "Skin Infection": "Clindamycin, Cephalexin",
    "Gout": "Allopurinol, Colchicine",
    "Liver Disease": "Ursodiol, Vitamin E",
    "Chronic Kidney Disease": "Losartan, Lisinopril",
    "Heart Failure": "Carvedilol, Digoxin",
    "Osteoporosis": "Alendronate, Risedronate",
    "Psoriasis": "Methotrexate, Adalimumab",
    "Eczema": "Hydrocortisone cream, Tacrolimus",
    "Dandruff": "Ketoconazole shampoo, Zinc pyrithione",
    "HIV/AIDS": "Tenofovir, Emtricitabine",
    "Malaria": "Artemether-Lumefantrine, Chloroquine"
};

// Function to simulate diagnosis based on symptoms
function infermedicaDiagnosis(symptoms) {
    const possibleConditions = {
        "fever": ["Flu", "Common Cold", "COVID-19", "Pneumonia", "Strep Throat", "Tuberculosis", "Malaria"],
        "headache": ["Migraine", "Hypertension", "Flu", "COVID-19", "Sinusitis"],
        "cough": ["Common Cold", "Asthma", "COVID-19", "Bronchitis", "Pneumonia", "Tuberculosis"],
        "shortness of breath": ["Asthma", "COVID-19", "Pneumonia", "Bronchitis", "Heart Failure"],
        "fatigue": ["Diabetes", "Flu", "COVID-19", "Hypothyroidism", "Anxiety", "Chronic Kidney Disease", "HIV/AIDS"],
        "sore throat": ["Strep Throat", "Common Cold", "Flu", "Sinusitis"],
        "chest pain": ["Hypertension", "Pneumonia", "Acid Reflux", "Bronchitis", "Heart Failure"],
        "nausea": ["Gastric Ulcer", "Flu", "Migraine", "Acid Reflux", "Malaria", "Liver Disease"],
        "joint pain": ["Arthritis", "Flu", "Gout"],
        "weight loss": ["Hyperthyroidism", "Diabetes", "Tuberculosis", "HIV/AIDS"],
        "itchy eyes": ["Allergies", "Conjunctivitis"],
        "skin rash": ["Psoriasis", "Eczema", "Skin Infection"],
        "hair loss": ["Hypothyroidism", "Liver Disease"],
        "back pain": ["Osteoporosis", "Arthritis"],
        "itchy scalp": ["Dandruff", "Eczema"]
    };

    let foundConditions = new Set();
    symptoms.forEach(symptom => {
        symptom = symptom.trim().toLowerCase();
        if (possibleConditions[symptom]) {
            possibleConditions[symptom].forEach(condition => foundConditions.add(condition));
        }
    });

    return Array.from(foundConditions);
}

// Function to get medicine suggestion from predefined data
function getMedicineForDisease(diseaseName) {
    return diseaseMedicineData[diseaseName] || "No medicine found for this disease.";
}

// Function to handle chatbot logic on button click
document.getElementById("diagnoseButton").addEventListener("click", function() {
    const symptomsInput = document.getElementById("symptoms").value;
    const symptoms = symptomsInput.split(',');

    if (!symptomsInput.trim()) {
        alert("Please enter symptoms.");
        return;
    }

    const conditions = infermedicaDiagnosis(symptoms);

    const resultTextbox = document.getElementById("resultTextbox");
    resultTextbox.value = ""; // Clear previous result

    if (conditions.length > 0) {
        resultTextbox.value += "Possible diseases:\n";
        conditions.forEach(diseaseName => {
            resultTextbox.value += `${diseaseName}\n`;

            // Get medicine suggestion for each disease
            const medicine = getMedicineForDisease(diseaseName);
            resultTextbox.value += `Suggested Medicine: ${medicine}\n\n`;
        });
    } else {
        resultTextbox.value = "No conditions found.\n";
    }
});
