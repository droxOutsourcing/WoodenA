module.exports = (req, res) => {
  res.json({
    message: "Environment Check",
    envVars: {
      SUPABASE_URL: process.env.SUPABASE_URL ? "present" : "missing",
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "present" : "missing",
      NODE_ENV: process.env.NODE_ENV || "undefined"
    },
    packageVersions: {
      node: process.version
    }
  });
};