/**
 * Converte un datetime in una stringa leggibile da un input
 * di type="datetime-local"
 * @param datetime datetime da convertire
 * @returns stringa formattata da passare ad un <input>
 */
export const datetimeToString = (datetime: Date) => {
  // aggiungo lo zero prima dei numeri a cifra singola
  const pad = (num: number) => String(num).padStart(2, '0');
  
  const dd = pad(datetime.getDate());
  const mm = pad(datetime.getMonth() + 1);
  const yyyy = datetime.getFullYear();
  const h = pad(datetime.getHours());
  const m = pad(datetime.getMinutes());
  
  return `${yyyy}-${mm}-${dd}T${h}:${m}`;
}

/**
 * Converte un datetime in una stringa leggibile da un input
 * di type="date"
 * @param datetime datetime da convertire
 * @returns stringa formattata da passare ad un <input>
 */
export const datetimeToDateString = (datetime: Date) => {
  // aggiungo lo zero prima dei numeri a cifra singola
  const pad = (num: number) => String(num).padStart(2, '0');
  
  const dd = pad(datetime.getDate());
  const mm = pad(datetime.getMonth() + 1);
  const yyyy = datetime.getFullYear();
  
  return `${yyyy}-${mm}-${dd}`;
}