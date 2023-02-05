export type DataTableBody = {
  id: number;
  s: string;
  brand: string;
  name: string;
  corporation_name: string;
  image: string;
  price: number;
  "CHG%": number;
  CHG: number;
  TECHNICAL_RATING: "Strong Buy" | "Buy" | "Sell";
  VOLUME: number;
  "VOLUME*PRICE": number;
  MKT_CAP: number;
  "P/E": number;
  EMPLOYEES: number;
  SECTOR: string;
  CURRENCY: "USD" | "EURO";
};
