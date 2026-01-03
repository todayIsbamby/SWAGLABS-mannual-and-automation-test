import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json", // ไฟล์ service account
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export interface updateSheet {
  id: string;
  status: string;
  sheet: string;
}

