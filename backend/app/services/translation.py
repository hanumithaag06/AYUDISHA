import re
import httpx
from typing import Dict, Any, List, Optional
from backend.app.core.config import settings

class MultilingualService:
    """
    Dynamic Multilingual & Translation Service.
    - Zero hardcoded domain word checks for language detection (uses script range detection).
    - Dynamic localization for all supported Indian languages (en, hi, ta, te, ml, kn, bn, mr, gu, sa).
    - Leverages LLM / Ollama for dynamic neural translation when available.
    """

    LANGUAGE_NAMES = {
        "en": "English",
        "hi": "Hindi (हिंदी)",
        "ta": "Tamil (தமிழ்)",
        "te": "Telugu (తెలుగు)",
        "ml": "Malayalam (മലയാളം)",
        "kn": "Kannada (ಕನ್ನಡ)",
        "bn": "Bengali (বাংলা)",
        "mr": "Marathi (मराठी)",
        "gu": "Gujarati (ગુજરાતી)",
        "sa": "Sanskrit (संस्कृतम्)"
    }

    # Dynamic system template mappings for grounding responses
    LOCALIZED_TEMPLATES: Dict[str, Dict[str, Any]] = {
        "en": {
            "intro": "Based on retrieved authoritative sources ({count} evidence chunks verified):",
            "insufficient": "AYUDISHA Hallucination Guard: Insufficient authoritative evidence retrieved from the database for your specific query. Please refine your query or check official legal portals.",
            "high_confidence": "High evidence support",
            "mod_confidence": "Moderate evidence support",
            "no_evidence": "Insufficient evidence",
            "unsupported_claim": "No supporting statutory chunks found.",
            "statutory_mandate": "Statutory mandate per {section} of {title}",
            "disclaimer": settings.LEGAL_DISCLAIMER,
            "next_questions": [
                "What documents are required for NBA Form I approval?",
                "How does Section 3(p) TKDL defense compare with Section 3(e) synergistic efficacy proof?",
                "What are the packaging and logo rules under FSSAI Ayurveda-Aahar 2022?",
                "What are the US FDA Botanical Drug development requirements vs EU THMPD?"
            ]
        },
        "hi": {
            "intro": "प्रामाणिक डेटाबेस स्रोतों के आधार पर ({count} साक्ष्य खंडों की पुष्टि की गई):",
            "insufficient": "आयुदिशा सुरक्षा तंत्र: आपके विशिष्ट प्रश्न के लिए डेटाबेस से पर्याप्त प्रामाणिक साक्ष्य प्राप्त नहीं हुए हैं। कृपया अपना प्रश्न परिष्कृत करें या आधिकारिक कानूनी पोर्टल देखें।",
            "high_confidence": "उच्च साक्ष्य समर्थन",
            "mod_confidence": "मध्यम साक्ष्य समर्थन",
            "no_evidence": "अपर्याप्त साक्ष्य",
            "unsupported_claim": "कोई सहायक वैधानिक खंड नहीं मिला।",
            "statutory_mandate": "{title} की धारा {section} के अनुसार वैधानिक जनादेश",
            "disclaimer": "आयुदिशा केवल पुनर्प्राप्त स्रोतों के आधार पर शोध मार्गदर्शन प्रदान करती है। यह कानूनी सलाह नहीं है।",
            "next_questions": [
                "एनबीए फॉर्म I अनुमोदन के लिए कौन से दस्तावेज़ आवश्यक हैं?",
                "धारा 3(p) टीकेडीएल रक्षा की तुलना धारा 3(e) प्रभावकारिता प्रमाण से कैसे की जाती है?",
                "एफएसएसएआई आयुर्वेद-आहार नियम 2022 के तहत पैकेजिंग और लोगो नियम क्या हैं?",
                "यूएस एफडीए बोटैनिकल ड्रग बनाम ईयू टीएचएमपीडी की आवश्यकताएं क्या हैं?"
            ]
        },
        "ta": {
            "intro": "மீட்டெடுக்கப்பட்ட அதிகாரப்பூர்வ ஆதாரங்களின் அடிப்படையில் ({count} சான்றுகள் சரிபார்க்கப்பட்டன):",
            "insufficient": "ஆயுதிஷா பாதுகாப்பு அமைப்பு: உங்கள் குறிப்பிட்ட கேள்விக்கு போதுமான சட்டப்பூர்வ ஆதாரங்கள் கிடைக்கவில்லை. தயவுசெய்து உங்கள் கேள்வியை மாற்றியமைக்கவும்.",
            "high_confidence": "உயர் சான்று ஆதரவு",
            "mod_confidence": "மிதமான சான்று ஆதரவு",
            "no_evidence": "போதிய சான்றுகள் இல்லை",
            "unsupported_claim": "துணைச் சட்டப் பிரிவுகள் எதுவும் கிடைக்கவில்லை.",
            "statutory_mandate": "{title} இன் பிரிவு {section} இன் படி சட்டப்பூர்வ ஆணை",
            "disclaimer": "ஆயுதிஷா பெறப்பட்ட ஆதாரங்களின் அடிப்படையில் ஆராய்ச்சி வழிகாட்டுதலை மட்டுமே வழங்குகிறது.",
            "next_questions": [
                "NBA படிவம் I ஒப்புதலுக்கு என்ன ஆவணங்கள் தேவை?",
                "பிரிவு 3(p) TKDL பாதுகாப்பு எவ்வாறு பிரிவு 3(e) உடன் ஒப்பிடப்படுகிறது?",
                "FSSAI ஆயுர்வேத-ஆஹார் 2022 இன் கீழ் பேக்கேஜிங் விதிகள் யாவை?"
            ]
        },
        "te": {
            "intro": "అందుబాటులో ఉన్న అధికారిక మూాల ఆధారంగా ({count} ఆధారాలు ధృవీకరించబడ్డాయి):",
            "insufficient": "ఆయుదిషా భద్రతా వ్యవస్థ: మీ నిర్దిష్ట ప్రశ్నకు డేటాబేస్ నుండి తగినంత చట్టపరమైన ఆధారాలు లభించలేదు.",
            "high_confidence": "అధిక సాక్ష్య మద్దతు",
            "mod_confidence": "మధ్యస్థ సాక్ష్య మద్దతు",
            "no_evidence": "అసలైన సాక్ష్యం లేదు",
            "unsupported_claim": "చట్టపరమైన విభాగాలు కనుగొనబడలేదు.",
            "statutory_mandate": "{title} యొక్క విభాగం {section} ప్రకారం చట్టబద్ధమైన ఆదేశం",
            "disclaimer": "ఆయుదిషా సేకరించిన ఆధారాల ఆధారంగా పరిశోధన మార్గదర్శకత్వాన్ని మాత్రమే అందిస్తుంది.",
            "next_questions": [
                "NBA ఫారమ్ I ఆమోదం కోసం ఏ పత్రాలు అవసరం?",
                "సెక్షన్ 3(p) TKDL రక్షణ సెక్షన్ 3(e)తో ఎలా పోల్చబడుతుంది?"
            ]
        },
        "ml": {
            "intro": "ലഭ്യമായ ആധികാരിക ഉറവിടങ്ങളുടെ അടിസ്ഥാനത്തിൽ ({count} തെളിവുകൾ പരിശോധിച്ചു):",
            "insufficient": "ആയുദിഷ സുരക്ഷാ സംവിധാനം: നിങ്ങളുടെ ചോദ്യത്തിന് മതിയായ നിയമപരമായ തെളിവുകൾ ലഭ്യമായിട്ടില്ല.",
            "high_confidence": "ഉയർന്ന തെളിവ് പിന്തുണ",
            "mod_confidence": "മിതമായ തെളിവ് പിന്തുണ",
            "no_evidence": "അപര്യാപ്തമായ തെളിവുകൾ",
            "unsupported_claim": "നിയമപരമായ തെളിവുകൾ കണ്ടെത്തിയില്ല.",
            "statutory_mandate": "{title} ലെ വകുപ്പ് {section} അനുസരിച്ചുള്ള നിയമപരമായ നിർദ്ദേശം",
            "disclaimer": "ആയുദിഷ ഗവേഷണ മാർഗ്ഗനിർദ്ദേശം മാത്രമാണ് നൽകുന്നത്.",
            "next_questions": [
                "NBA ഫോം I അംഗീകാരത്തിന് എന്തൊക്കെ രേഖകൾ വേണം?"
            ]
        },
        "kn": {
            "intro": "ಪಡೆಯಲಾದ ಅಧಿಕೃತ ಮೂಲಗಳ ಆಧಾರದ ಮೇಲೆ ({count} ಸಾಕ್ಷ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ):",
            "insufficient": "ಆಯುದಿಷಾ ಭದ್ರತಾ ವ್ಯವಸ್ಥೆ: ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ಪ್ರಶ್ನೆಗೆ ಸಾಕಷ್ಟು ಶಾಸನಬದ್ಧ ಸಾಕ್ಷ್ಯಗಳು ಲಭ್ಯವಾಗಿಲ್ಲ.",
            "high_confidence": "ಉನ್ನತ ಸಾಕ್ಷ್ಯ ಬೆಂಬಲ",
            "mod_confidence": "ಮಧ್ಯಮ ಸಾಕ್ಷ್ಯ ಬೆಂಬಲ",
            "no_evidence": "ಅಪರ್ಯಾಪ್ತ ಸಾಕ್ಷ್ಯ",
            "unsupported_claim": "ಯಾವುದೇ ಶಾಸನಬದ್ಧ ವಿಭಾಗಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
            "statutory_mandate": "{title} ನ ವಿಭಾಗ {section} ರ ಪ್ರಕಾರ ಶಾಸನಬದ್ಧ ಆದೇಶ",
            "disclaimer": "ಆಯುದಿಷಾ ಕೇವಲ ಸಂಶೋಧನಾ ಮಾರ್ಗದರ್ಶನವನ್ನು ನೀಡುತ್ತದೆ.",
            "next_questions": [
                "NBA ಫಾರ್ಮ್ I ಅನುಮೋದನೆಗೆ ಯಾವ ದಾಖಲೆಗಳು ಅಗತ್ಯವಿದೆ?"
            ]
        },
        "bn": {
            "intro": "উদ্ধৃত প্রামাণিক উৎসের ভিত্তিতে ({count}টি প্রমাণ যাচাই করা হয়েছে):",
            "insufficient": "আয়ুদিশা সুরক্ষা ব্যবস্থা: আপনার নির্দিষ্ট প্রশ্নের জন্য ডেটাবেস থেকে পর্যাপ্ত আইনি প্রমাণ পাওয়া যায়নি।",
            "high_confidence": "উচ্চ প্রমাণ সমর্থন",
            "mod_confidence": "মাঝারি প্রমাণ সমর্থন",
            "no_evidence": "অপর্যাপ্ত প্রমাণ",
            "unsupported_claim": "কোন আইনি ধারা পাওয়া যায়নি।",
            "statutory_mandate": "{title}-এর {section} ধারা অনুযায়ী সংবিধিবদ্ধ আইনি আদেশ",
            "disclaimer": "আয়ুদিশা শুধুমাত্র গবেষণার নির্দেশিকা প্রদান করে।",
            "next_questions": [
                "NBA ফর্ম I অনুমোদনের জন্য কি কি নথি প্রয়োজন?"
            ]
        },
        "mr": {
            "intro": "प्राधिकृत डेटाबेस स्रोतांच्या आधारे ({count} पुराव्यांची पडताळणी झाली):",
            "insufficient": "आयुदिशा सुरक्षा यंत्रणा: आपल्या विशिष्ट प्रश्नासाठी डेटाबेसमध्ये पुरेसे वैधानिक पुरावे आढळले नाहीत.",
            "high_confidence": "उच्च पुरावा पाठिंबा",
            "mod_confidence": "मध्यम पुरावा पाठिंबा",
            "no_evidence": "अपुरे पुरावे",
            "unsupported_claim": "कोणताही वैधानिक कलम आढळला नाही.",
            "statutory_mandate": "{title} च्या कलम {section} नुसार वैधानिक आदेश",
            "disclaimer": "आयुदिशा केवळ संशोधन मार्गदर्शन प्रदान करते.",
            "next_questions": [
                "NBA फॉर्म I मंजुरीसाठी कोणती कागदपत्रे आवश्यक आहेत?"
            ]
        },
        "gu": {
            "intro": "પ્રાપ્ત થયેલા અધિકૃત સ્ત્રોતોના આધારે ({count} પુરાવા ચકાસાયા):",
            "insufficient": "આયુદિશા સુરક્ષા સિસ્ટમ: તમારા ચોક્કસ પ્રશ્ન માટે પૂરતા વૈધાનિક પુરાવા મળ્યા નથી.",
            "high_confidence": "ઉચ્ચ પુરાવા સપોર્ટ",
            "mod_confidence": "મધ્યમ પુરાવા સપોર્ટ",
            "no_evidence": "અપૂરતા પુરાવા",
            "unsupported_claim": "કોઈ કાનૂની કલમ મળી નથી.",
            "statutory_mandate": "{title} ની કલમ {section} મુજબ વૈધાનિક આદેશ",
            "disclaimer": "આયુદિશા માત્ર સંશોધન માર્ગદર્શન પૂરું પાડે છે.",
            "next_questions": [
                "NBA ફોર્મ I મંજૂરી માટે કયા દસ્તાવેજો જરૂરી છે?"
            ]
        },
        "sa": {
            "intro": "प्रामाणिकशास्त्रग्रन्थानाम् आधारेण ({count} साक्ष्याणि परीक्षितानि):",
            "insufficient": "आयुदिशा-सुरक्षाविधिः: भवतः प्रश्नाय पर्याप्तं शास्त्रप्रमाणं न लब्धम्।",
            "high_confidence": "उत्कृष्टं साक्ष्यम्",
            "mod_confidence": "मध्यमं साक्ष्यम्",
            "no_evidence": "अपर्याप्तं साक्ष्यम्",
            "unsupported_claim": "न किमपि शास्त्रप्रमाणं लब्धम्।",
            "statutory_mandate": "{title} अस्य {section} धारायाः अनुसारं विधिनिर्देशः",
            "disclaimer": "आयुदिशा केवलां अनुसन्धाममार्गदर्शिकां ददाति।",
            "next_questions": [
                "NBA Form I इत्याख्यस्य अनुमत्याः कृते कानि पत्राणि आवश्यकानि?"
            ]
        }
    }

    def detect_language_from_script(self, text: str) -> str:
        """
        Detects language dynamically using Unicode character script ranges.
        No hardcoded word lookup lists.
        """
        if not text:
            return "en"

        # Count character frequencies in script ranges
        script_counts = {
            "hi": len(re.findall(r'[\u0900-\u097F]', text)),  # Devanagari (Hindi, Sanskrit, Marathi)
            "ta": len(re.findall(r'[\u0B80-\u0BFF]', text)),  # Tamil
            "te": len(re.findall(r'[\u0C00-\u0C7F]', text)),  # Telugu
            "ml": len(re.findall(r'[\u0D00-\u0D7F]', text)),  # Malayalam
            "kn": len(re.findall(r'[\u0C80-\u0CFF]', text)),  # Kannada
            "bn": len(re.findall(r'[\u0980-\u09FF]', text)),  # Bengali
            "gu": len(re.findall(r'[\u0A80-\u0AFF]', text)),  # Gujarati
        }

        best_lang, highest_count = max(script_counts.items(), key=lambda x: x[1])
        if highest_count > 2:
            return best_lang

        return "en"

    def get_template(self, lang_code: str) -> Dict[str, Any]:
        """Returns localized system text dict for specified language code."""
        code = lang_code.lower() if lang_code else "en"
        return self.LOCALIZED_TEMPLATES.get(code, self.LOCALIZED_TEMPLATES["en"])

    async def translate_text(self, text: str, target_lang: str) -> str:
        """
        Dynamically translates text into target_lang using LLM / Ollama endpoint if reachable,
        falling back gracefully if offline.
        """
        if target_lang == "en" or not text.strip():
            return text

        lang_name = self.LANGUAGE_NAMES.get(target_lang, "English")
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                prompt = (
                    f"Translate the following legal/regulatory synthesis accurately into {lang_name}. "
                    f"Keep statutory names (Section numbers, TKDL, FSSAI, NBA) intact:\n\n{text}"
                )
                res = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/generate",
                    json={
                        "model": settings.OLLAMA_MODEL,
                        "prompt": prompt,
                        "stream": False
                    }
                )
                if res.status_code == 200:
                    data = res.json()
                    translated = data.get("response", "").strip()
                    if translated:
                        return translated
        except Exception:
            pass

        return text

multilingual_service = MultilingualService()
