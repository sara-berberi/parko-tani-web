"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

type Section = {
  heading: string;
  body?: string;
  items?: string[];
  intro?: string;
};

export default function PrivacyPage() {
  const { locale } = useLanguage();

  const content =
    locale === "sq"
      ? {
          title: "Politika e Privatësisë",
          lastUpdated: "Parko Tani  ·  Përditësuar së fundmi: 22 Mars 2026",
          sections: [
            {
              heading: "1. Informacioni që mbledhim",
              items: [
                "Informacion llogarie: Emri, adresa email dhe fjalëkalimi kur regjistroheni.",
                "Të dhëna lokacioni: Lokacioni i pajisjes suaj për të shfaqur vendet e parkimit pranë jush dhe për të ndihmuar me navigimin. Përdoret vetëm ndërkohë që aplikacioni është aktiv.",
                "Informacion mbi mjetin: Detaje që jepni për mjetin tuaj për qëllime rezervimi.",
                "Të dhëna përdorimi: Historia e rezervimeve, ndërveprimet me vendet e parkimit dhe aktiviteti në aplikacion.",
                "Foto: Nëse ngarkoni imazhe të vendit tuaj të parkimit (vetëm për pronarët).",
              ],
            },
            {
              heading: "2. Si e përdorim informacionin tuaj",
              items: [
                "Për të krijuar dhe menaxhuar llogarinë tuaj.",
                "Për të shfaqur vendet e parkimit të disponueshme pranë jush.",
                "Për të procesuar rezervimet ndërmjet shoferëve dhe pronarëve të parkimeve.",
                "Për të dërguar email transaksionale (verifikimi i llogarisë, rivendosja e fjalëkalimit).",
                "Për të përmirësuar aplikacionin dhe zgjidhur probleme.",
              ],
            },
            {
              heading: "3. Ndarja e informacionit tuaj",
              intro: "Ne nuk e shesim të dhënat tuaja personale. Ndajmë të dhëna vetëm me:",
              items: [
                "Resend – për dërgimin e emaileve transaksionale.",
                "Cloudinary – për ruajtjen e imazheve të ngarkuara.",
                "Railway – për hostimin e infrastrukturës sonë.",
              ],
              body: "Të gjithë ofruesit e palëve të treta janë të lidhur nga politikat e tyre të privatësisë dhe ligjet përkatëse të mbrojtjes së të dhënave.",
            },
            {
              heading: "4. Ruajtja e të dhënave",
              body: "Ne ruajmë të dhënat tuaja për aq kohë sa llogaria juaj është aktive. Mund të kërkoni fshirjen e llogarisë dhe të dhënave tuaja duke na kontaktuar.",
            },
            {
              heading: "5. Të drejtat tuaja",
              body: "Ju keni të drejtë të aksesoni, korrigjoni ose fshini të dhënat tuaja personale në çdo kohë. Për të ushtruar këto të drejta, na kontaktoni në support@parkotani.com.",
            },
            {
              heading: "6. Siguria",
              body: "Ne përdorim masa standarde të industrisë, duke përfshirë HTTPS, fjalëkalime të enkriptuara dhe autentifikim bazuar në JWT, për të mbrojtur të dhënat tuaja.",
            },
            {
              heading: "7. Privatësia e fëmijëve",
              body: "Parko Tani nuk drejtohet ndaj fëmijëve nën moshën 13 vjeç. Ne nuk mbledhim me dije të dhëna nga fëmijët.",
            },
            {
              heading: "8. Ndryshimet në këtë politikë",
              body: "Mund ta përditësojmë këtë politikë. Do t'ju njoftojmë për ndryshime të rëndësishme përmes email-it ose njoftimit brenda aplikacionit.",
            },
            {
              heading: "9. Kontakti",
              body: "Nëse keni pyetje rreth kësaj politike, na kontaktoni: info@parkotani.com · Parko Tani · Shqipëri",
            },
          ] as Section[],
        }
      : {
          title: "Privacy Policy",
          lastUpdated: "Parko Tani  ·  Last updated: March 22, 2026",
          sections: [
            {
              heading: "1. Information We Collect",
              items: [
                "Account information: Your name, email address, and password when you register.",
                "Location data: Your device location to show nearby parking spots and assist with navigation. This is only used while the app is active.",
                "Vehicle information: Details you provide about your vehicle for booking purposes.",
                "Usage data: Booking history, parking spot interactions, and app activity.",
                "Photos: If you upload images of your parking spot (owners only).",
              ],
            },
            {
              heading: "2. How We Use Your Information",
              items: [
                "To create and manage your account.",
                "To show available parking spots near you.",
                "To process bookings between drivers and parking owners.",
                "To send transactional emails (account verification, password reset).",
                "To improve the app and fix issues.",
              ],
            },
            {
              heading: "3. Sharing Your Information",
              intro: "We do not sell your personal data. We share data only with:",
              items: [
                "Resend – for sending transactional emails.",
                "Cloudinary – for storing uploaded images.",
                "Railway – for hosting our backend infrastructure.",
              ],
              body: "All third-party providers are bound by their own privacy policies and applicable data protection laws.",
            },
            {
              heading: "4. Data Retention",
              body: "We retain your data for as long as your account is active. You may request deletion of your account and data by contacting us.",
            },
            {
              heading: "5. Your Rights",
              body: "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at support@parkotani.com.",
            },
            {
              heading: "6. Security",
              body: "We use industry-standard security measures including HTTPS, hashed passwords, and JWT-based authentication to protect your data.",
            },
            {
              heading: "7. Children's Privacy",
              body: "Parko Tani is not directed at children under 13. We do not knowingly collect data from children.",
            },
            {
              heading: "8. Changes to This Policy",
              body: "We may update this policy. We will notify you of significant changes via email or in-app notification.",
            },
            {
              heading: "9. Contact",
              body: "If you have questions about this policy, contact us at: info@parkotani.com · Parko Tani · Albania",
            },
          ] as Section[],
        };

  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 md:pb-32">
        <div className="section-container max-w-3xl">
          <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-brand-700 mb-3">
            {content.title}
          </h1>
          <p className="text-sm text-brand-300 mb-12">{content.lastUpdated}</p>
          <div className="space-y-8">
            {content.sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-display font-bold text-lg md:text-xl text-brand-700 mb-3">
                  {section.heading}
                </h2>
                {section.intro && (
                  <p className="text-brand-400 leading-relaxed mb-2">{section.intro}</p>
                )}
                {section.items && (
                  <ul className="list-disc list-inside space-y-1 text-brand-400 leading-relaxed mb-2">
                    {section.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.body && (
                  <p className="text-brand-400 leading-relaxed">{section.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
