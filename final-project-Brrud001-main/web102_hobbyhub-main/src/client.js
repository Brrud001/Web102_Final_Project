import { createClient } from "@supabase/supabase-js";

const URL = "https://dzhlfgghywvnejtviady.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6aGxmZ2doeXd2bmVqdHZpYWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0OTAyNjAsImV4cCI6MjAyOTA2NjI2MH0.Fb_hzYI_xNXGPyTrxQFBCLRNr_dLBA6BQ0TCM2Z2jwI";

export const supabase = createClient(URL, API_KEY);
