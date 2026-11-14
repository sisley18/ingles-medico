/**
 * Course Data: Inglés Quirúrgico — Pared Abdominal y Técnica TAR
 * Secciones numeradas por nivel CEFR: A1, B1, C1
 */

window.CARDS = [
  // --- 25 TARJETAS ORIGINALES (CORE DECK) ---
  { id: 1, level: "A1", group: "core", cat: "Anatomía & Base", en: "Abdominal wall", speak: "Abdominal wall", ph: "/ab-DÓ-mi-nal uól/", def: "Pared abdominal. Conjunto de capas musculofasciales que protegen las vísceras; área de especialidad del Dr. Yuri Novitsky.", hint: "Cuidado de no confundirlo con 'well' (pozo/bien)." },
  { id: 2, level: "A1", group: "core", cat: "Profesión & OR", en: "Surgeon", speak: "Surgeon", ph: "/SÉR-dshon/", def: "Cirujano/a. Especialista médico que realiza intervenciones quirúrgicas.", hint: "Se escribe sin 'r' antes de la 'o' (no 'surgeron')." },
  { id: 3, level: "A1", group: "core", cat: "Profesión & OR", en: "Operating room (OR)", speak: "Operating room. The O. R.", ph: "/Ó-pe-rei-ting rúm/", def: "Quirófano / Sala de operaciones. En EE. UU. se abrevia casi siempre como 'the OR'.", hint: "Usa el gerundio 'operating', no el sustantivo 'operation'." },
  { id: 4, level: "A1", group: "core", cat: "Profesión & OR", en: "Observership", speak: "Observership", ph: "/ob-ZÉR-ver-ship/", def: "Rotación de observación clínica. Estancia formativa en la que un médico extranjero observa cirugías sin contacto directo con el paciente.", hint: "Se combina con 'to do an...' o 'to go on an...'." },
  { id: 5, level: "B1", group: "core", cat: "Anatomía Pared", en: "Rectus abdominis", speak: "Rectus abdominis", ph: "/RÉK-tus ab-DÓ-mi-nis/", def: "Músculo recto del abdomen. Músculo vertical anterior par envuelto por su vaina fascial.", hint: "El espacio detrás de este músculo es el plano inicial (Rives-Stoppa)." },
  { id: 6, level: "B1", group: "core", cat: "Anatomía Pared", en: "Transversus abdominis", speak: "Transversus abdominis", ph: "/trans-VÉR-sus ab-DÓ-mi-nis/", def: "Músculo transverso del abdomen. Capa muscular más profunda de la pared anterolateral, cuya sección da nombre al TAR.", hint: "Sus fibras corren de forma horizontal (transversal)." },
  { id: 7, level: "B1", group: "core", cat: "Anatomía Pared", en: "Posterior rectus sheath", speak: "Posterior rectus sheath", ph: "/pos-TÍ-rior RÉK-tus shíz/", def: "Vaina posterior de los rectos. Capa fascial profunda que se incide medialmente para entrar al espacio retrorrectal.", hint: "'Sheath' significa literalmente 'funda' o 'vaina'." },
  { id: 8, level: "B1", group: "core", cat: "Anatomía Pared", en: "Linea alba", speak: "Linea alba", ph: "/LÍ-ni-a ÁL-ba/", def: "Línea alba. Rafe tendinoso en la línea media donde convergen las aponeurosis abdominales; objetivo principal de reconstrucción.", hint: "En latín significa 'línea blanca'." },
  { id: 9, level: "B1", group: "core", cat: "Anatomía Pared", en: "Linea semilunaris", speak: "Linea semilunaris", ph: "/LÍ-ni-a se-mi-lu-NÁ-ris/", def: "Línea semilunar. Borde lateral de la vaina del recto; límite anatómico lateral crítico que no debe dañarse.", hint: "Marca la transición entre el músculo recto y los músculos planos del flanco." },
  { id: 10, level: "C1", group: "core", cat: "Anatomía Pared", en: "Neurovascular bundles", speak: "Neurovascular bundles", ph: "/niu-ro-VÁS-kiu-lar BÁN-dols/", def: "Paquetes vasculonerviosos. Nervios y vasos intercostales que perforan la vaina posterior y deben preservarse.", hint: "Su preservación evita la denervación y el abombamiento (bulging)." },
  { id: 11, level: "B1", group: "core", cat: "Anatomía Pared", en: "Peritoneum", speak: "Peritoneum", ph: "/pe-ri-to-NÍ-um/", def: "Peritoneo. Membrana serosa más interna que recubre la cavidad abdominal y protege las vísceras de la malla.", hint: "Fíjate en la acentuación en inglés: termina en /-NÍ-um/." },
  { id: 12, level: "C1", group: "core", cat: "Anatomía Pared", en: "Transversalis fascia", speak: "Transversalis fascia", ph: "/trans-ver-SÁ-lis FÁ-sha/", def: "Fascia transversalis. Capa aponeurótica delgada situada entre el músculo transverso y la grasa preperitoneal.", hint: "Junto con el peritoneo forma el plano posterior que aísla la malla." },
  { id: 13, level: "B1", group: "core", cat: "Patología Herniaria", en: "Incisional hernia", speak: "Incisional hernia", ph: "/in-SÍ-sho-nal JÉR-nia/", def: "Eventración / Hernia incisional. Protrusión de contenido abdominal a través de una cicatriz quirúrgica previa.", hint: "En español médico se dice 'eventración', pero en inglés siempre es 'incisional hernia'." },
  { id: 14, level: "C1", group: "core", cat: "Patología Herniaria", en: "Loss of domain", speak: "Loss of domain", ph: "/lós of do-MÉIN/", def: "Pérdida de domicilio. Condición en hernias gigantes donde gran parte de las vísceras reside fuera de la cavidad abdominal.", hint: "Suele requerir toxina botulínica o neumoperitoneo preoperatorio antes del TAR." },
  { id: 15, level: "C1", group: "core", cat: "Patología Herniaria", en: "Incarcerated vs. Strangulated", speak: "Incarcerated versus Strangulated", ph: "/in-KÁR-se-rei-ted vs. STRÁN-giu-lei-ted/", def: "Atascada (irreducible) vs. Estrangulada (con compromiso vascular e isquemia del tejido atrapado).", hint: "La segunda constituye una emergencia quirúrgica absoluta." },
  { id: 16, level: "C1", group: "core", cat: "Técnica TAR", en: "Adhesiolysis", speak: "Adhesiolysis", ph: "/ad-ji-si-Ó-li-sis/", def: "Adherenciólisis. Paso inicial tras abrir el saco herniario para liberar asas intestinales pegadas a la pared.", hint: "Es uno de los momentos de mayor concentración en el quirófano." },
  { id: 17, level: "C1", group: "core", cat: "Técnica TAR", en: "Retrorectus / Sublay plane", speak: "Retrorectus or Sublay plane", ph: "/re-tro-RÉK-tus / SÁB-lei pléin/", def: "Plano retrorrectal / sublay. Espacio anatómico detrás del músculo recto y delante de la vaina posterior donde se aloja la malla.", hint: "Se considera el plano ideal para colocar mallas por su vascularización." },
  { id: 18, level: "C1", group: "core", cat: "Técnica TAR", en: "Primary fascial closure", speak: "Primary fascial closure", ph: "/PRÁI-ma-ri FÁ-shal KLÓU-shur/", def: "Cierre fascial primario. Afrontamiento y sutura directa de los bordes de la vaina anterior en la línea media sin tensión.", hint: "Objetivo funcional principal de la separación posterior de componentes." },
  { id: 19, level: "A1", group: "core", cat: "Profesión & OR", en: "To scrub in", speak: "To scrub in", ph: "/tu skráb ín/", def: "Lavarse y vestirse de estéril. Realizar el lavado quirúrgico y colocarse camisolín y guantes estériles.", hint: "Lo opuesto (salir del campo estéril) es 'to scrub out'." },
  { id: 20, level: "B1", group: "core", cat: "Instrumental OR", en: "Bovie", speak: "Bovie", ph: "/BÓU-vi/", def: "Electrobisturí / Electrocauterio. Nombre genérico usado en EE. UU. para pedir el lápiz de electrocirugía.", hint: "Lleva el nombre de William T. Bovie, su inventor." },
  { id: 21, level: "B1", group: "core", cat: "Verbos Quirúrgicos", en: "To incise", speak: "To incise", ph: "/tu in-SÁIZ/", def: "Incidir. Realizar un corte limpio sobre la piel, la vaina posterior o la hoja posterior del oblicuo menor.", hint: "Sustantivo relacionado: 'incision' (/in-SÍ-shon/)." },
  { id: 22, level: "B1", group: "core", cat: "Verbos Quirúrgicos", en: "To dissect", speak: "To dissect", ph: "/tu di-SÉKT/", def: "Disecar. Separar planos anatómicos de forma cortante ('sharp dissection') o roma ('blunt dissection').", hint: "Verbo esencial al desarrollar el plano preperitoneal hacia el psoas." },
  { id: 23, level: "B1", group: "core", cat: "Verbos Quirúrgicos", en: "To divide", speak: "To divide", ph: "/tu di-VÁID/", def: "Seccionar / Cortar por completo. Cortar transversalmente una estructura muscular, tendinosa o vascular.", hint: "Ejemplo: 'Divide the transversus abdominis muscle fibers'." },
  { id: 24, level: "B1", group: "core", cat: "Verbos Quirúrgicos", en: "To release", speak: "To release", ph: "/tu ri-LÍS/", def: "Liberar. Eliminar la tracción lateral de un músculo o fascia para permitir que avance hacia la línea media.", hint: "Es la 'R' de la sigla TAR (Transversus Abdominis Release)." },
  { id: 25, level: "C1", group: "core", cat: "Verbos Quirúrgicos", en: "To approximate", speak: "To approximate", ph: "/tu a-PRÓK-si-meit/", def: "Afrontar / Acercar bordes. Unir sin tensión dos bordes fasciales o cutáneos para suturarlos.", hint: "Se usa tanto para el plano posterior como para cerrar la línea alba." },

  // --- 15 TARJETAS AVANZADAS (CLASES 2, 3 y 4: INSTRUMENTAL, PRE-OP & POST-OP) ---
  { id: 26, level: "B1", group: "extra", cat: "Instrumental OR", en: "DeBakey forceps", speak: "DeBakey forceps", ph: "/di-BÉI-ki FÓR-seps/", def: "Pinza de disección atraumática tipo DeBakey. Usada para manipular tejido delicado, peritoneo o intestino.", hint: "En EE. UU. a las pinzas de mano izquierda se les dice 'forceps' o 'pick-ups'." },
  { id: 27, level: "B1", group: "extra", cat: "Instrumental OR", en: "Army-Navy retractor", speak: "Army-Navy retractor", ph: "/ÁR-mi NÉI-vi ri-TRÁK-tor/", def: "Separador de Farabeuf (tipo Army-Navy). Separador manual superficial de doble extremo muy común en EE. UU.", hint: "En Argentina se conoce como separador de Farabeuf." },
  { id: 28, level: "B1", group: "extra", cat: "Instrumental OR", en: "Bookwalter retractor", speak: "Bookwalter retractor", ph: "/BÚK-uól-ter ri-TRÁK-tor/", def: "Separador autoestático de aro (Bookwalter) fijado a la mesa quirúrgica para exposición amplia de pared abdominal.", hint: "Fundamental en reconstrucciones abiertas complejas tipo TAR." },
  { id: 29, level: "B1", group: "extra", cat: "Instrumental OR", en: "Needle driver", speak: "Needle driver", ph: "/NÍ-dol DRÁI-ver/", def: "Portaagujas (también llamado 'needle holder'). Instrumento para tomar la aguja al suturar la fascia.", hint: "'Driver' es el término coloquial más usado en el quirófano norteamericano." },
  { id: 30, level: "B1", group: "extra", cat: "Instrumental OR", en: "Yankauer suction", speak: "Yankauer suction tip", ph: "/IÁN-kau-er SÁK-shon/", def: "Cánula de aspiración rígida tipo Yankauer para evacuar sangre o humo del electrobisturí.", hint: "Se pide simplemente diciendo 'Suction, please' o 'Yankauer'." },
  { id: 31, level: "B1", group: "extra", cat: "Instrumental OR", en: "JP drain (Jackson-Pratt)", speak: "J. P. drain. Jackson Pratt closed-suction drain.", ph: "/dshéi-pí dréin/", def: "Drenaje aspirativo cerrado tipo Jackson-Pratt con reservorio en forma de pera ('bulb').", hint: "Se coloca habitualmente sobre la malla en el espacio retromuscular." },
  { id: 32, level: "B1", group: "extra", cat: "Patología Herniaria", en: "Swiss-cheese defects", speak: "Swiss-cheese defects", ph: "/suís-chíz DÍ-fekts/", def: "Defectos múltiples en 'queso suizo'. Múltiples orificios herniarios pequeños separados por puentes fasciales a lo largo de la cicatriz.", hint: "Se unifican durante la laparotomía para reconstruir toda la línea alba." },
  { id: 33, level: "B1", group: "extra", cat: "Anatomía Pared", en: "Arcuate line", speak: "Arcuate line", ph: "/ÁR-kiu-eit láin/", def: "Línea arqueada (arco de Douglas). Límite inferior de la vaina posterior del recto, por debajo del cual sólo quedan fascia transversalis y peritoneo.", hint: "Referencia anatómica clave al disecar caudalmente hacia el espacio de Retzius." },
  { id: 34, level: "C1", group: "extra", cat: "Anatomía Pared", en: "Space of Retzius", speak: "Space of Retzius", ph: "/spéis of RÉT-si-us/", def: "Espacio retropúbico preperitoneal donde se diseca caudalmente para exponer el pubis y los ligamentos de Cooper.", hint: "Permite fijar o solapar ampliamente la malla en hernias suprapúbicas." },
  { id: 35, level: "C1", group: "extra", cat: "Pre-op & CT", en: "Preoperative Botox", speak: "Preoperative botulinum toxin injection", ph: "/pri-Ó-pe-ra-tiv BÓU-toks/", def: "Quimiodenervación preoperatoria con toxina botulínica A en los músculos oblicuos y transverso 4 semanas antes de la cirugía.", hint: "Elonga la musculatura lateral y facilita el cierre sin tensión." },
  { id: 36, level: "C1", group: "extra", cat: "Pre-op & CT", en: "Progressive pneumoperitoneum (PPP)", speak: "Progressive pneumoperitoneum", ph: "/pro-GRÉ-siv niu-mo-pe-ri-to-NÍ-um/", def: "Neumoperitoneo progresivo preoperatorio. Insuflación gradual de aire en la cavidad abdominal para tratar la pérdida de domicilio.", hint: "Suele combinarse con Botox en defectos gigantes." },
  { id: 37, level: "C1", group: "extra", cat: "Intraoperatorio", en: "Buttonhole (peritoneal fenestration)", speak: "Buttonhole in the posterior layer", ph: "/BÁ-ton-jóul/", def: "Ojal o perforación accidental en el peritoneo o la vaina posterior durante la disección del TAR.", hint: "Todo 'buttonhole' debe cerrarse con sutura absorbible para evitar hernias internas." },
  { id: 38, level: "C1", group: "extra", cat: "Postoperatorio", en: "SSO (Surgical Site Occurrence)", speak: "Surgical site occurrence. S. S. O.", ph: "/SÉR-dshi-kal sáit o-KÁ-rens/", def: "Evento del sitio quirúrgico (seroma, hematoma, dehiscencia cutánea, necrosis de colgajo).", hint: "Diferenciar de SSI (Surgical Site Infection = infección del sitio quirúrgico)." },
  { id: 39, level: "C1", group: "extra", cat: "Postoperatorio", en: "Bulging vs. True recurrence", speak: "Lateral bulging versus true hernia recurrence", ph: "/BÁL-dshing vs. trú ri-KÁ-rens/", def: "Abombamiento parietal (por lesión nerviosa sin defecto fascial) vs. Recidiva herniaria verdadera (nuevo defecto en la fascia).", hint: "Preservar los 'neurovascular bundles' en el TAR previene el bulging." },
  { id: 40, level: "B1", group: "extra", cat: "Postoperatorio", en: "Abdominal binder", speak: "Abdominal binder", ph: "/ab-DÓ-mi-nal BÁIN-der/", def: "Faja elástica abdominal postoperatoria para soporte y confort del paciente.", hint: "Muy utilizada en el protocolo ERAS tras reconstrucción de pared." }
];

window.TAR_STEPS = [
  {
    num: 1,
    level: "B1",
    title: "Midline laparotomy & adhesiolysis",
    speak: "Step one: Midline laparotomy and complete adhesiolysis to clear the anterior abdominal wall.",
    es: "Laparotomía mediana, resección de cicatriz previa y liberación completa de adherencias (adherenciólisis) de la pared abdominal.",
    tip: "Se coloca una compresa húmeda ('counting towel') sobre las vísceras para proteger el intestino."
  },
  {
    num: 2,
    level: "B1",
    title: "Retrorectus dissection (Rives-Stoppa)",
    speak: "Step two: Incise the posterior rectus sheath half a centimeter from the midline and develop the retrorectus plane laterally.",
    es: "Incidir la vaina posterior del recto a 0,5–1 cm de la línea media y disecar el espacio retrorrectal hasta las cercanías de la línea semilunar.",
    tip: "Permite visualizar el músculo recto por arriba y la vaina posterior por debajo."
  },
  {
    num: 3,
    level: "C1",
    title: "Identify and preserve neurovascular bundles",
    speak: "Step three: Carefully identify and preserve the perforating neurovascular bundles just medial to the linea semilunaris.",
    es: "Identificar y preservar los paquetes vasculonerviosos intercostales ('the perforators') justo mediales a la línea semilunar.",
    tip: "Punto crítico (landmark): detén la disección retrorrectal unos 0,5 a 1 cm medial a estos nervios."
  },
  {
    num: 4,
    level: "C1",
    title: "Incise posterior lamella of internal oblique",
    speak: "Step four: Incise the posterior lamella of the internal oblique aponeurosis just medial to the neurovascular bundles.",
    es: "Incidir la hoja posterior de la aponeurosis del oblicuo menor medial a los nervios perforantes para exponer el músculo transverso.",
    tip: "Suele iniciarse en el tercio superior (cefálico), donde el vientre muscular del transverso es bien carnoso y fácil de identificar."
  },
  {
    num: 5,
    level: "C1",
    title: "Divide transversus abdominis muscle",
    speak: "Step five: Divide the transversus abdominis muscle fibers from cephalad to caudad using electrocautery over a right-angle clamp.",
    es: "Seccionar las fibras del músculo transverso del abdomen de cefálico a caudal con electrobisturí ('Bovie') sobre una pinza en ángulo recto.",
    tip: "Esta maniobra elimina la tracción circunferencial lateral de la pared abdominal."
  },
  {
    num: 6,
    level: "C1",
    title: "Develop retromuscular / preperitoneal plane",
    speak: "Step six: Perform blunt dissection laterally toward the psoas muscle, superiorly under the diaphragm, and inferiorly into the space of Retzius.",
    es: "Desarrollar mediante disección roma el plano preperitoneal/retromuscular lateralmente hasta el músculo psoas, cefálicamente hacia el trígono subxifoideo/diafragma y caudalmente al espacio de Retzius.",
    tip: "Se empuja la fascia transversalis y el peritoneo hacia abajo (dorsalmente) con torunda o compresa."
  },
  {
    num: 7,
    level: "C1",
    title: "Reconstruct posterior layer",
    speak: "Step seven: Approximate and close the posterior rectus sheaths and peritoneum in the midline using a running absorbable suture.",
    es: "Cerrar el plano visceral posterior (ambas vainas posteriores y peritoneo) en la línea media con sutura continua absorbible (ej. Vicryl 2-0).",
    tip: "Cualquier ojal ('buttonhole') debe repararse para excluir totalmente las vísceras del contacto con la malla."
  },
  {
    num: 8,
    level: "B1",
    title: "Sublay mesh placement",
    speak: "Step eight: Place a large heavyweight or medium-weight polypropylene mesh in a diamond configuration inside the retromuscular space.",
    es: "Colocar una malla sintética amplia de polipropileno en el espacio retromuscular (sublay) con amplio solapamiento ('overlap') lateral, subxifoideo y suprapúbico.",
    tip: "En la técnica actual del Dr. Novitsky suele usarse mínima o ninguna fijación transfascial cuando el bolsillo retromuscular es amplio."
  },
  {
    num: 9,
    level: "B1",
    title: "Primary fascial closure",
    speak: "Step nine: Achieve tension-free primary fascial closure of the anterior rectus sheath in the midline, reconstructing the linea alba.",
    es: "Cierre fascial primario sin tensión de la vaina anterior de los rectos en la línea media sobre la malla, restaurando la línea alba fisiológica.",
    tip: "Se realiza habitualmente con sutura monofilamento de absorción lenta (PDS) o puntos continuos tipo 'small bites'."
  },
  {
    num: 10,
    level: "A1",
    title: "Drain placement & skin closure",
    speak: "Step ten: Place closed-suction Jackson-Pratt drains in the retromuscular space, resect redundant skin, and close the subcutaneous tissue and skin.",
    es: "Colocar drenajes aspirativos cerrados (Jackson-Pratt / JP drains) sobre la malla y cerrar tejido celular subcutáneo y piel por planos.",
    tip: "Se aplica faja abdominal ('abdominal binder') antes de despertar al paciente."
  }
];

window.VIDEOS = [
  {
    id: "-6g6BAnIRI0",
    level: "C1",
    title: "Fixing Big Hernias: Component Separation (18 min)",
    url: "https://www.youtube.com/watch?v=-6g6BAnIRI0",
    desc: "Explicación detallada sobre separación de componentes, anatomía retromuscular y manejo de grandes defectos ventrales.",
    task: "Práctica C1.1: Silencia el video del minuto 04:00 al 07:00 y narra en voz alta usando los 5 pasos del Guion de Narración."
  },
  {
    id: "v5hwI-uVuJA",
    level: "B1",
    title: "What is a Rives-Stoppa Hernia Repair? (7 min)",
    url: "https://www.youtube.com/watch?v=v5hwI-uVuJA",
    desc: "Revisión clara del espacio retrorrectal (Rives-Stoppa), incisión de la vaina posterior y colocación de malla sublay.",
    task: "Práctica B1.2: Anota 5 colocaciones verbales quirúrgicas que escuches durante la explicación del plano retrorrectal."
  },
  {
    id: "7Hp2VF3b07M",
    level: "B1",
    title: "Complex Abdominal Hernia Repair – Component Separation (2m 35s)",
    url: "https://www.youtube.com/watch?v=7Hp2VF3b07M",
    desc: "Resumen visual conciso sobre cómo la liberación muscular permite avanzar los rectos hacia la línea media sin tensión.",
    task: "Práctica B1.3: Ideal para calentamiento rápido de 2 minutos narrando los planos anatómicos en tiempo real."
  },
  {
    id: "Rc8PnLrdvhM",
    level: "A1",
    title: "Abdominal Hernia Surgery | Ventral Hernia 3D Animation (1m 50s)",
    url: "https://www.youtube.com/watch?v=Rc8PnLrdvhM",
    desc: "Animación médica 3D de alta claridad que muestra el defecto herniario ventral, el saco peritoneal y el refuerzo con malla.",
    task: "Práctica A1.2: Identifica y pronuncia en voz alta: abdominal wall, hernia sac, bowel loops, mesh y primary closure."
  }
];

window.DIALOGUES = {
  class1: [
    { speaker: "Dr. Dani Castillo", role: "a", text: "Good morning! Hi, I'm Dr. Dani Castillo, an international surgical observer from Argentina joining Dr. Novitsky today." },
    { speaker: "Circulating Nurse", role: "b", text: "Welcome to the OR, Dr. Castillo! Let me get your name and badge number on our surgical log." },
    { speaker: "Dr. Dani Castillo", role: "a", text: "Thank you very much. Since I'm not scrubbing in for this first case, where is the best spot for me to stand so I have a clear view without getting near the sterile field?" },
    { speaker: "Circulating Nurse", role: "b", text: "Right over here by the anesthesia screen and the overhead monitor is perfect. Once Dr. Novitsky opens the retrorectus space, you can step onto that platform behind him." },
    { speaker: "Dr. Dani Castillo", role: "a", text: "Got it. I'll keep my hands clasped in front of me and stay clear of the blue sterile drapes. Thank you!" }
  ],
  class2: [
    { speaker: "Dr. Yuri Novitsky", role: "b", text: "Let's incise the posterior rectus sheath half a centimeter lateral to the linea alba. DeBakey forceps and Bovie, please." },
    { speaker: "Surgical Resident", role: "a", text: "Holding counter-traction on the posterior sheath now. You can see the red fibers of the rectus abdominis muscle right above us." },
    { speaker: "Dr. Yuri Novitsky", role: "b", text: "Good. Keep sweeping the retrorectus plane laterally with a Kittner. Watch out—here are the neurovascular bundles just medial to the linea semilunaris." },
    { speaker: "Dr. Dani Castillo", role: "a", text: "Dr. Novitsky, do you always start the transversus abdominis division in the upper third of the abdomen?" },
    { speaker: "Dr. Yuri Novitsky", role: "b", text: "Yes, almost always top-down. Up near the costal margin, the transversus muscle belly is thick and muscular, making it much safer to separate from the underlying transversalis fascia." }
  ],
  class3: [
    { speaker: "Dr. Yuri Novitsky", role: "b", text: "Morning team. Dr. Castillo, take a look at this axial CT scan. How would you describe this patient's abdominal wall defect?" },
    { speaker: "Dr. Dani Castillo", role: "a", text: "This is a large recurrent midline incisional hernia with a transverse defect width of eighteen centimeters and significant loss of domain." },
    { speaker: "Dr. Yuri Novitsky", role: "b", text: "Spot on. And how would you optimize this patient in Argentina before bringing them to the operating room?" },
    { speaker: "Dr. Dani Castillo", role: "a", text: "First, we enforce strict smoking cessation for at least four weeks and optimize glycemic control so the HbA1c is below seven percent. Given the loss of domain, we also administer ultrasound-guided preoperative Botox to the lateral oblique muscles four weeks prior to performing a bilateral TAR." }
  ],
  class4: [
    { speaker: "Dr. Dani Castillo", role: "a", text: "During our adhesiolysis and TAR plane development, we occasionally get a small buttonhole in the thin peritoneum below the arcuate line. How do you handle larger defects in the posterior layer?" },
    { speaker: "Dr. Yuri Novitsky", role: "b", text: "Any small buttonhole is closed immediately with a figure-of-eight 3-0 Vicryl so bowel never touches the polypropylene mesh. If we have a larger peritoneal defect that won't come together without tension, we interpose native hernia sac, omentum, or an absorbable polyglycolic acid mesh patch." }
  ]
};

window.EXERCISES = {
  partA: [
    {
      id: "a1",
      level: "A1",
      wrong: "I am going to observership with a famous surgeron in New York.",
      hint: "Pista: verbo para 'hacer una rotación' (to do an...) + ortografía de 'cirujano'.",
      accepted: [
        "I am going to do an observership with a famous surgeon in New York.",
        "I'm going to do an observership with a famous surgeon in New York.",
        "I am going on an observership with a famous surgeon in New York."
      ],
      canonical: "I am going to do an observership with a famous surgeon in New York."
    },
    {
      id: "a2",
      level: "A1",
      wrong: "He is an expert in the abdominal well and complex hernias.",
      hint: "Pista: preposición opcional ('on/in') + sustantivo para 'pared' (wall, no well).",
      accepted: [
        "He is an expert on the abdominal wall and complex hernias.",
        "He is an expert in the abdominal wall and complex hernias.",
        "He's an expert on the abdominal wall and complex hernias.",
        "He's an expert in the abdominal wall and complex hernias."
      ],
      canonical: "He is an expert on the abdominal wall and complex hernias."
    },
    {
      id: "a3",
      level: "A1",
      wrong: "He described am important tecnique to repair ventral defects.",
      hint: "Pista: artículo indefinido antes de vocal ('an') + ortografía de 'technique'.",
      accepted: [
        "He described an important technique to repair ventral defects."
      ],
      canonical: "He described an important technique to repair ventral defects."
    },
    {
      id: "a4",
      level: "A1",
      wrong: "I like to learn operation room vocabulary before my trip.",
      hint: "Pista: deseo actual ('I would like' / 'I'd like') + 'operating room'.",
      accepted: [
        "I'd like to learn operating room vocabulary before my trip.",
        "I would like to learn operating room vocabulary before my trip."
      ],
      canonical: "I'd like to learn operating room vocabulary before my trip."
    }
  ],
  partB: [
    {
      id: "b1",
      term: "1. To scrub in",
      speak: "To scrub in",
      correct: "c",
      options: [
        { val: "", label: "-- Selecciona la definición correcta --" },
        { val: "a", label: "a. Área cubierta por campos quirúrgicos que no puede tocarse sin guantes estériles." },
        { val: "b", label: "b. Dispositivo de electrocauterio usado para cortar y coagular tejido." },
        { val: "c", label: "c. Lavarse las manos quirúrgicamente y colocarse camisolín y guantes estériles." },
        { val: "d", label: "d. Capa fascial que se incide para acceder al músculo transverso en el TAR." },
        { val: "e", label: "e. Profesional de enfermería que asiste desde fuera del área estéril." }
      ]
    },
    {
      id: "b2",
      term: "2. Circulating nurse",
      speak: "Circulating nurse",
      correct: "e",
      options: [
        { val: "", label: "-- Selecciona la definición correcta --" },
        { val: "a", label: "a. Área cubierta por campos quirúrgicos que no puede tocarse sin guantes estériles." },
        { val: "b", label: "b. Dispositivo de electrocauterio usado para cortar y coagular tejido." },
        { val: "c", label: "c. Lavarse las manos quirúrgicamente y colocarse camisolín y guantes estériles." },
        { val: "d", label: "d. Capa fascial que se incide para acceder al músculo transverso en el TAR." },
        { val: "e", label: "e. Profesional de enfermería que asiste desde fuera del área estéril." }
      ]
    },
    {
      id: "b3",
      term: "3. Bovie",
      speak: "Bovie electrocautery",
      correct: "b",
      options: [
        { val: "", label: "-- Selecciona la definición correcta --" },
        { val: "a", label: "a. Área cubierta por campos quirúrgicos que no puede tocarse sin guantes estériles." },
        { val: "b", label: "b. Dispositivo de electrocauterio usado para cortar y coagular tejido." },
        { val: "c", label: "c. Lavarse las manos quirúrgicamente y colocarse camisolín y guantes estériles." },
        { val: "d", label: "d. Capa fascial que se incide para acceder al músculo transverso en el TAR." },
        { val: "e", label: "e. Profesional de enfermería que asiste desde fuera del área estéril." }
      ]
    },
    {
      id: "b4",
      term: "4. Posterior rectus sheath",
      speak: "Posterior rectus sheath",
      correct: "d",
      options: [
        { val: "", label: "-- Selecciona la definición correcta --" },
        { val: "a", label: "a. Área cubierta por campos quirúrgicos que no puede tocarse sin guantes estériles." },
        { val: "b", label: "b. Dispositivo de electrocauterio usado para cortar y coagular tejido." },
        { val: "c", label: "c. Lavarse las manos quirúrgicamente y colocarse camisolín y guantes estériles." },
        { val: "d", label: "d. Capa fascial que se incide para acceder al músculo transverso en el TAR." },
        { val: "e", label: "e. Profesional de enfermería que asiste desde fuera del área estéril." }
      ]
    },
    {
      id: "b5",
      term: "5. Sterile field",
      speak: "Sterile field",
      correct: "a",
      options: [
        { val: "", label: "-- Selecciona la definición correcta --" },
        { val: "a", label: "a. Área cubierta por campos quirúrgicos que no puede tocarse sin guantes estériles." },
        { val: "b", label: "b. Dispositivo de electrocauterio usado para cortar y coagular tejido." },
        { val: "c", label: "c. Lavarse las manos quirúrgicamente y colocarse camisolín y guantes estériles." },
        { val: "d", label: "d. Capa fascial que se incide para acceder al músculo transverso en el TAR." },
        { val: "e", label: "e. Profesional de enfermería que asiste desde fuera del área estéril." }
      ]
    }
  ],
  partC: [
    {
      id: "c1",
      level: "B1",
      q: "1. During the Rives-Stoppa dissection, what anatomical landmark marks the lateral border of the rectus sheath where you must stop to avoid cutting the nerves?",
      speak: "During the Rives-Stoppa dissection, what anatomical landmark marks the lateral border of the rectus sheath?",
      options: [
        "The linea alba",
        "The linea semilunaris and perforating neurovascular bundles",
        "The space of Retzius",
        "The skin flap"
      ],
      correctIndex: 1
    },
    {
      id: "c2",
      level: "C1",
      q: "2. Which specific structure is incised just medial to the neurovascular bundles to expose the underlying transversus abdominis muscle fibers?",
      speak: "Which specific structure is incised just medial to the neurovascular bundles to expose the underlying transversus abdominis muscle fibers?",
      options: [
        "The anterior rectus sheath",
        "The external oblique aponeurosis",
        "The posterior lamella of the internal oblique aponeurosis",
        "The inguinal ligament"
      ],
      correctIndex: 2
    },
    {
      id: "c3",
      level: "C1",
      q: "3. If a small peritoneal tear ('buttonhole') occurs while developing the retromuscular plane, what is the standard intraoperative management?",
      speak: "If a small peritoneal tear or buttonhole occurs while developing the retromuscular plane, what is the standard intraoperative management?",
      options: [
        "Leave it open so fluid can drain into the peritoneal cavity",
        "Close the buttonhole immediately with absorbable suture so bowel cannot contact the synthetic mesh",
        "Abort the TAR procedure and place an onlay mesh",
        "Divide the linea semilunaris"
      ],
      correctIndex: 1
    },
    {
      id: "c4",
      level: "C1",
      q: "4. What is the difference between 'lateral bulging' and a 'true hernia recurrence' on postoperative follow-up?",
      speak: "What is the difference between lateral bulging and a true hernia recurrence on postoperative follow-up?",
      options: [
        "Bulging is caused by denervation/muscle laxity with an intact fascial layer, whereas a true recurrence is a new fascial defect",
        "Bulging always requires emergency surgery for strangulation",
        "They are identical terms in American surgical English",
        "Bulging only happens in the midline linea alba"
      ],
      correctIndex: 0
    }
  ]
};
