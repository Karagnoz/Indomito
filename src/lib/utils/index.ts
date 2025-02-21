import { parse, format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const experiencesOptions = [
  { label: "Vuelta a Espíritu Santo", value: "Vuelta a Espíritu Santo" },
  { label: "Escape a Espíritu Santo", value: "Escape a Espíritu Santo" },
  { label: "Expedición Loreto - La Paz", value: "Expedición Loreto - La Paz" },
  { label: "Archipiélago de San José", value: "Archipiélago de San José" },
  { label: "Bahía Magdalena y el Acuario del Mundo", value: "Bahía Magdalena y el Acuario del Mundo" },
  { label: "Sunset en Espíritu Santo", value: "Sunset en Espíritu Santo" },
  { label: "Exploración Costera", value: "Exploración Costera" },
  { label: "Viaje privado", value: "Viaje privado" },
  // { label: "Otro", value: "otro" },
];

export const tripModeOptions = [
  { label: "Expedición", value: "expedición" },
  { label: "Excursión", value: "excursión" },
];

export const kayakExperienceOptions = [
  { label: "0 viajes en Kayak de travesía", value: "0_viajes" },
  { label: "1 – 5 viajes de varios días en kayak de travesía", value: "1_5_viajes" },
  { label: "5 – 15 viajes de varios días en kayak de travesía", value: "5_15_viajes" },
  { label: "Más de 20 viajes de varios días en kayak de travesía", value: "20_viajes" },
];

export const monthsOptions = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function formatDate(dateString: string) {
  const date = parse(dateString, "yyyyMMdd", new Date());

  return format(date, "dd/MM/yyyy");
}

export function saveForm(form: "register" | "request", data: FormData) {
  const formId = form === "register" ? 939 : 949;
  const wp_url = `https://www.indomito360.com/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

  return fetch(wp_url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa("uWebManager:R64J tjBE fAhe tJii QiMT WkSO"),
    },
    body: data,
  });
}

export function createFormData(data: any) {
  const formData = new FormData();
  formData.append("_wpcf7_unit_tag", "form_id");

  for (const key in data) {
    formData.append(key, data[key]);
  }

  return formData;
}
