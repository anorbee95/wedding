import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const data = [
  {
    title: "DRESS CODE",
    content: [
      "Öltözzetek alkalomhoz illően, kerüljétek a piros és fehér színt. Ha valami szupermenő színes ruhát választotok, azzal nyerhettek egy extra táncot az ifjú párral. Amennyiben mégis fehér mellett döntenétek Luca az ügyeletes vörösboros, aki néha csetlik-botlik és lehet nyakon talál.",
    ],
  },
  {
    title: "PARKOLÁS",
    content: [
      "Ne aggódj a parkolás miatt, mert a helyszínen bőven van hely a kocsidnak, akár busz méretű is! Ha pedig egy közeli szálláson pihennél meg az esküvő után, nyugodtan hagyd itt az autót – reggel is itt fog várni, biztonságban. Ha nem is autóval jössz vagy nem te vezetsz, akkor rögtön koncentrálhatsz az ivásra.",
    ],
  },
  {
    title: "SZÁLLÁS",
    content: [
      "Amennyiben szeretnétek szállást a helyszín közelében, kérlek jelezzétek az RSVP során, és keresni fogunk benneteket a részletekkel kapcsolatosan. Így nyugodtan bulizhattok és ihattok velünk egész éjjel, reggel pedig könnyedén visszajuthattok az autóitokhoz – még kócosan is!",
    ],
  },
  {
    title: "NÁSZAJÁNDÉK",
    content: [
      "Mindig felmerül a kérdés, hogy 'Vajon mire is vágyik igazán az ifjú pár nászajándékként?' Természetesen a legnagyobb ajándék számunkra, hogy életünk egyik legszebb napját velünk élitek meg, és ünneplitek pirkadatig. Miután az RSVP-n hivatalosan is bejelentkeztetek az eseményre, hajnalig járó tánckötelezettséget vállaltok.",
      "Közös otthonunkat gondosan belaktuk és minden számunkra fontos háztartási géppel felfegyvereztük, közös képeinkkel telebombáztuk és random vásárolt dísztárgyainkkal megszínesítettük. Sőt, a kutyusuknak, Bütyikének is megvan már minden, amire egy elkényeztetett eb vágyhat: saját ágy, játékkosár és több rágócsont, mint amennyi a Föld körül keringő műhold.",
      "Ezért kérjük, ne gondoljátok túl a nekünk szánt ajándékokat. Lehetőségetek van egy kacat helyett hozzá járulni nászutunkhoz, illetve jövőbeli utazásainkhoz, melyekről hazahozott emlékeink még csodásabb elemei lehetnek otthonuknak.",
      "Ha szeretnétek tehát minket megajándékozni a nagy napon, rejtsétek adományaitokat egy borítékba. Tudjátok, hogy tartja a mondás szeretetből nem lehet megélni, de minden kis hozzájárulás közelebb segít minket, hogy még több vidám és kalandos utazásban legyen részünk.",
    ],
  },
  {
    title: "KORHATÁR",
    content: [
      "Ugyan Démi életének nagyon fontos részét képezik a gyerekek, de az esküvőnk napját nélkülük szeretnénk megélni. Ezért kérünk titeket, hogy ha tehetitek, ne hozzátok magatokkal kis gyerkőceiteket. Amennyiben ez problémát okoz, keressetek minket bátran, és igyekszünk megoldást találni a helyzetre.",
    ],
  },
];

export default function Accordions() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderContent = (content) => {
    return content.map((item, idx) => (
      <p key={idx} className="mb-2 text-gray-500 dark:text-gray-400">
        {item}
      </p>
    ));
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      {data.map((item, index) => (
        <div
          key={index}
          className={`${
            index === data.length - 1 ? "border-b" : ""
          } border-gray-200 dark:border-gray-700`}
        >
          <h2 id={`accordion-collapse-heading-${index + 1}`}>
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${
                index === 0 ? "rounded-t-xl" : ""
              }`}
              data-accordion-target={`#accordion-collapse-body-${index + 1}`}
              aria-expanded={activeIndex === index}
              aria-controls={`accordion-collapse-body-${index + 1}`}
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-bold">{item.title}</span>
              <FiChevronDown
                className={`w-5 h-5 transition-transform ${
                  activeIndex === index ? "transform rotate-180" : ""
                }`}
              />
            </button>
          </h2>
          <div
            id={`accordion-collapse-body-${index + 1}`}
            className={`${activeIndex === index ? "" : "hidden"}`}
            aria-labelledby={`accordion-collapse-heading-${index + 1}`}
          >
            <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              {renderContent(item.content)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
