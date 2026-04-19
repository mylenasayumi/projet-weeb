// ErrorPage.jsx
// A 404 error page that appears when the user accesses an undefined URL.
import { useLanguage } from "../languages/LanguageContext";

function ErrorPage() {
    const { t } = useLanguage();
    return <h1 className="font-roboto bg-dark-blue text-white md:text-5xl text-xl font-extrabold text-center pt-10 md:pt-20 pb-200 md:pb-300">{t("errorPage.error")}</h1>;
}
  
export default ErrorPage;