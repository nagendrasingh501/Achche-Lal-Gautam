import re
import json

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# We need to add the translation function and trigger
lang_func = """
window.__getTranslation = function(text) {
  const lang = document.getElementById('languageSelect').value;
  if(lang === 'en') return text;
  const map = translations[lang] || {};
  return map[text] || text;
};
"""

if 'window.__getTranslation' not in html:
    html = html.replace('const walker=document.createTreeWalker', lang_func + 'const walker=document.createTreeWalker')

# Call the retranslate trigger
if 'window.__threeBooksRetranslate' not in html:
    html = html.replace("node.nodeValue=value;", "node.nodeValue=value;\n });\n if(window.__threeBooksRetranslate) window.__threeBooksRetranslate();\n")

# Now I'll use a small python dict to inject translations
new_strings = {
    "PRACTICE AREA": {"hi": "विधिक सेवा क्षेत्र", "pa": "ਕਾਨੂੰਨੀ ਸੇਵਾ ਖੇਤਰ", "ur": "قانونی خدمت کا شعبہ", "bn": "আইনি পরিষেবা ক্ষেত্র"},
    "Practice": {"hi": "विधिक सेवा", "pa": "ਵਿਧੀ", "ur": "مشق", "bn": "অনুশীলন"},
    "Legal Areas": {"hi": "कानूनी क्षेत्र", "pa": "ਕਾਨੂੰਨੀ ਖੇਤਰ", "ur": "قانونی شعبے", "bn": "আইনি ক্ষেত্র"},
    "Open": {"hi": "खोलें", "pa": "ਖੋਲ੍ਹੋ", "ur": "کھولیں", "bn": "খুলুন"},
    "KEY AREAS": {"hi": "प्रमुख क्षेत्र", "pa": "ਪ੍ਰਮੁੱਖ ਖੇਤਰ", "ur": "اہم شعبے", "bn": "মূল ক্ষেত্র"},
    
    # Criminal Law Chapters
    "Bail Applications": {"hi": "जमानत आवेदन", "pa": "ਜ਼ਮਾਨਤ ਦੀਆਂ ਅਰਜ਼ੀਆਂ", "ur": "ضمانت کی درخواستیں", "bn": "জামিনের আবেদন"},
    "Trial Proceedings": {"hi": "मुकदमे की कार्यवाही", "pa": "ਮੁਕੱਦਮੇ ਦੀ ਕਾਰਵਾਈ", "ur": "مقدمے کی کارروائی", "bn": "মামলার কার্যক্রম"},
    "Cross-Examination": {"hi": "जिरह (क्रॉस-एग्जामिनेशन)", "pa": "ਜਿਰ੍ਹਾ", "ur": "جرح", "bn": "জেরা"},
    "Appeals & Revisions": {"hi": "अपील और संशोधन", "pa": "ਅਪੀਲਾਂ ਅਤੇ ਸੋਧਾਂ", "ur": "اپیلیں اور نظرثانی", "bn": "আপিল ও সংশোধন"},
    "FIR Quashing": {"hi": "एफआईआर रद्द करना", "pa": "ਐਫਆਈਆਰ ਰੱਦ ਕਰਨਾ", "ur": "ایف آئی آر منسوخی", "bn": "এফআইআর বাতিল"},
    "White Collar Crimes": {"hi": "सफेदपोश अपराध", "pa": "ਚਿੱਟੇ-ਕਾਲਰ ਅਪਰਾਧ", "ur": "سفید پوش جرائم", "bn": "হোয়াইট কলার অপরাধ"},
    
    # Land & Property Chapters
    "Title Disputes": {"hi": "स्वामित्व विवाद", "pa": "ਮਾਲਕੀ ਵਿਵਾਦ", "ur": "ملکیتی تنازعات", "bn": "মালিকানা বিরোধ"},
    "Partition Suits": {"hi": "बंटवारा वाद", "pa": "ਵੰਡ ਦੇ ਮੁਕੱਦਮੇ", "ur": "بٹوارے کے مقدمات", "bn": "বণ্টন মামলা"},
    "Illegal Possession": {"hi": "अवैध कब्जा", "pa": "ਨਾਜਾਇਜ਼ ਕਬਜ਼ਾ", "ur": "غیر قانونی قبضہ", "bn": "অবৈধ দখল"},
    "Lease & Tenancy": {"hi": "पट्टा और किरायेदारी", "pa": "ਲੀਜ਼ ਅਤੇ ਕਿਰਾਏਦਾਰੀ", "ur": "پٹہ اور کرایہ داری", "bn": "লিজ ও ভাড়াটিয়া"},
    "Registration & Deeds": {"hi": "पंजीकरण और विलेख", "pa": "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਡੀਡਸ", "ur": "رجسٹریشن اور دستاویزات", "bn": "নিবন্ধন ও দলিল"},
    "Succession & Mutation": {"hi": "उत्तराधिकार और दाखिल-खारिज", "pa": "ਉੱਤਰਾਧਿਕਾਰ ਅਤੇ ਇੰਤਕਾਲ", "ur": "جانشینی اور انتقال", "bn": "উত্তরাধিকার ও নামজারি"},
    
    # Marriage & Family Chapters
    "Contested Divorce": {"hi": "विवादित तलाक", "pa": "ਵਿਵਾਦਪੂਰਨ ਤਲਾਕ", "ur": "متنازعہ طلاق", "bn": "বিরোধপূর্ণ বিবাহবিচ্ছেদ"},
    "Mutual Consent": {"hi": "आपसी सहमति", "pa": "ਆਪਸੀ ਸਹਿਮਤੀ", "ur": "باہمی رضامندی", "bn": "পারস্পরিক সম্মতি"},
    "Child Custody": {"hi": "बाल हिरासत", "pa": "ਬੱਚੇ ਦੀ ਹਿਰਾਸਤ", "ur": "بچے کی تحویل", "bn": "সন্তানের হেফাজত"},
    "Alimony & Maintenance": {"hi": "गुज़ारा भत्ता", "pa": "ਗੁਜ਼ਾਰਾ ਭੱਤਾ", "ur": "نفقہ", "bn": "ভরণপোষণ"},
    "Domestic Violence": {"hi": "घरेलू हिंसा", "pa": "ਘਰੇਲੂ ਹਿੰਸਾ", "ur": "گھریلو تشدد", "bn": "পারিবারিক সহিংসতা"},
    "Restitution of Rights": {"hi": "अधिकारों की बहाली", "pa": "ਅਧਿਕਾਰਾਂ ਦੀ ਬਹਾਲੀ", "ur": "حقوق کی بحالی", "bn": "অধিকার পুনরুদ্ধার"},
    
    # Civil Disputes Chapters
    "Breach of Contract": {"hi": "अनुबंध का उल्लंघन", "pa": "ਇਕਰਾਰਨਾਮੇ ਦੀ ਉਲੰਘਣਾ", "ur": "معاہدے کی خلاف ورزی", "bn": "চুক্তির লঙ্ঘন"},
    "Injunctions": {"hi": "निषेधाज्ञा (स्टे)", "pa": "ਮਨਾਹੀ (ਸਟੇਅ)", "ur": "حکم امتناعی", "bn": "নিষেধাজ্ঞা"},
    "Consumer Cases": {"hi": "उपभोक्ता मामले", "pa": "ਖਪਤਕਾਰ ਮਾਮਲੇ", "ur": "صارفین کے مقدمات", "bn": "ভোক্তা মামলা"},
    "Legal Notices": {"hi": "कानूनी नोटिस", "pa": "ਕਾਨੂੰਨੀ ਨੋਟਿਸ", "ur": "قانونی نوٹس", "bn": "আইনি নোটিশ"},
    "Recovery Suits": {"hi": "वसूली वाद", "pa": "ਵਸੂਲੀ ਦੇ ਮੁਕੱਦਮੇ", "ur": "وصولی کے مقدمات", "bn": "পুনরুদ্ধার মামলা"},
    "Arbitration": {"hi": "मध्यस्थता (आर्बिट्रेशन)", "pa": "ਸਾਲਸੀ", "ur": "ثالثی", "bn": "সালিশি"},

    # Descriptions
    "Comprehensive defense and representation in all criminal proceedings. From police station advisement and bail applications to trial litigation and appeals. We ensure your rights are protected at every step of the criminal justice system with rigorous evidence analysis and strategic courtroom advocacy.": {
        "hi": "सभी आपराधिक कार्यवाहियों में व्यापक बचाव और प्रतिनिधित्व। पुलिस स्टेशन परामर्श और जमानत आवेदन से लेकर ट्रायल मुकदमेबाजी और अपील तक। हम कठोर साक्ष्य विश्लेषण और रणनीतिक वकालत के साथ यह सुनिश्चित करते हैं कि आपराधिक न्याय प्रणाली के हर कदम पर आपके अधिकारों की रक्षा हो।",
        "pa": "ਸਾਰੀਆਂ ਅਪਰਾਧਿਕ ਕਾਰਵਾਈਆਂ ਵਿੱਚ ਵਿਆਪਕ ਬਚਾਅ ਅਤੇ ਨੁਮਾਇੰਦਗੀ। ਅਸੀਂ ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹਾਂ ਕਿ ਨਿਆਂ ਪ੍ਰਣਾਲੀ ਦੇ ਹਰ ਕਦਮ 'ਤੇ ਤੁਹਾਡੇ ਅਧਿਕਾਰਾਂ ਦੀ ਰੱਖਿਆ ਕੀਤੀ ਜਾਵੇ।",
        "ur": "تمام مجرمانہ کارروائیوں میں جامع دفاع اور نمائندگی۔ ہم اس بات کو یقینی بناتے ہیں کہ نظام انصاف کے ہر قدم پر آپ کے حقوق کا تحفظ کیا جائے۔",
        "bn": "সমস্ত অপরাধমূলক কার্যক্রমে ব্যাপক প্রতিরক্ষা এবং প্রতিনিধিত্ব। আমরা নিশ্চিত করি যে ন্যায়বিচার ব্যবস্থার প্রতিটি পদক্ষেপে আপনার অধিকার সুরক্ষিত থাকে।"
    },
    "Expert legal counsel for complex property disputes, real estate transactions, and land rights. We handle title verification, boundary disputes, partition suits, and illegal possession cases. Secure your assets with thorough documentation and aggressive civil representation.": {
        "hi": "जटिल संपत्ति विवादों, अचल संपत्ति लेनदेन और भूमि अधिकारों के लिए विशेषज्ञ कानूनी परामर्श। हम स्वामित्व सत्यापन, सीमा विवाद, बंटवारा वाद और अवैध कब्जे के मामलों को संभालते हैं।",
        "pa": "ਗੁੰਝਲਦਾਰ ਜਾਇਦਾਦ ਵਿਵਾਦਾਂ, ਰੀਅਲ ਅਸਟੇਟ ਲੈਣ-ਦੇਣ ਅਤੇ ਜ਼ਮੀਨੀ ਅਧਿਕਾਰਾਂ ਲਈ ਮਾਹਰ ਕਾਨੂੰਨੀ ਸਲਾਹ।",
        "ur": "پیچیدہ جائیداد کے تنازعات، رئیل اسٹیٹ کے لین دین، اور زمین کے حقوق کے لیے ماہر قانونی مشورہ۔",
        "bn": "জটিল সম্পত্তি বিরোধ, রিয়েল এস্টেট লেনদেন এবং জমির অধিকারের জন্য বিশেষজ্ঞ আইনি পরামর্শ।"
    },
    "Sensitive and confidential legal support for matrimonial disputes and family matters. We provide mediation and litigation services for contested divorces, mutual separation, child custody, alimony claims, and domestic violence protections, prioritizing your peace of mind.": {
        "hi": "वैवाहिक विवादों और पारिवारिक मामलों के लिए संवेदनशील और गोपनीय कानूनी सहायता। हम आपके मन की शांति को प्राथमिकता देते हुए विवादित तलाक, आपसी अलगाव, बाल हिरासत और गुज़ारा भत्ता के लिए मध्यस्थता और मुकदमेबाजी सेवाएं प्रदान करते हैं।",
        "pa": "ਵਿਆਹੁਤਾ ਵਿਵਾਦਾਂ ਅਤੇ ਪਰਿਵਾਰਕ ਮਾਮਲਿਆਂ ਲਈ ਸੰਵੇਦਨਸ਼ੀਲ ਅਤੇ ਗੁਪਤ ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ।",
        "ur": "ازدواجی تنازعات اور خاندانی معاملات کے لیے حساس اور خفیہ قانونی معاونت۔",
        "bn": "বৈবাহিক বিরোধ এবং পারিবারিক বিষয়ে সংবেদনশীল এবং গোপনীয় আইনি সহায়তা।"
    },
    "Strategic consultation and representation for a wide array of civil litigation. We draft robust legal notices, handle breach of contract claims, injunctions, and consumer protection cases. Dedicated to resolving disputes efficiently through negotiation or district court proceedings.": {
        "hi": "दीवानी मुकदमों की एक विस्तृत श्रृंखला के लिए रणनीतिक परामर्श और प्रतिनिधित्व। हम मजबूत कानूनी नोटिस तैयार करते हैं, अनुबंध उल्लंघन, निषेधाज्ञा और उपभोक्ता संरक्षण मामलों को संभालते हैं।",
        "pa": "ਸਿਵਲ ਮੁਕੱਦਮੇਬਾਜ਼ੀ ਦੀ ਵਿਸ਼ਾਲ ਸ਼੍ਰੇਣੀ ਲਈ ਰਣਨੀਤਕ ਸਲਾਹ ਅਤੇ ਨੁਮਾਇੰਦਗੀ।",
        "ur": "دیوانی مقدمات کی ایک وسیع صف کے لیے اسٹریٹجک مشاورت اور نمائندگی۔",
        "bn": "দেওয়ানি মামলার বিস্তৃত পরিসরের জন্য কৌশলগত পরামর্শ এবং প্রতিনিধিত্ব।"
    }
}

for eng, trans in new_strings.items():
    # Append to each dict in index.html
    for lang in ['hi', 'pa', 'ur', 'bn']:
        # Find the end of the language dict, e.g., 'hi:{' ... '}'
        # This is a bit tricky, let's just use string replace to inject right after "lang:{"
        pattern = f' {lang}:{{'
        injection = f' {lang}:{{\n  "{eng}":"{trans[lang]}",'
        html = html.replace(pattern, injection)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated translations successfully")
