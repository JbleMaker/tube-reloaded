import "./db";
import Video from "./models/Video";
import app from "./server";

const PORT = 4000;

const handleServer = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 📡`);

app.listen(PORT, handleServer);
