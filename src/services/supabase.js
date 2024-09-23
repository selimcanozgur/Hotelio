import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://sgljosjbtarwjtcpgzhc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbGpvc2pidGFyd2p0Y3BnemhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwODQxMTEsImV4cCI6MjA0MjY2MDExMX0.Z4O87-1mxFA8eKEBLxTbIpn0NvAYMFYghSs8u2bJqPE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
