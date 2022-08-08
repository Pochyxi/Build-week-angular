export interface Posts {
  id: number;
  autore: number | string | null;
  title: string;
  body: string;
}
export interface SendPost {
  autore: string;
  title: string;
  body: string;
}
