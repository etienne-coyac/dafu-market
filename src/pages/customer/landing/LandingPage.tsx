import { Button, Input, Typography } from "@mui/joy";
import { useState } from "react";

const LandingPage = () => {
  const [t, setT] = useState<string>("test");

  return (
    <>
      <Input defaultValue={t} />
      <Button onClick={() => setT(t + "1")}></Button>
    </>
  );
};

export default LandingPage;
