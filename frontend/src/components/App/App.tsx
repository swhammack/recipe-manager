import "@mantine/core/styles.css";

import { AppShell, Title } from "@mantine/core";
import { Navbar } from "../NavBar/Navbar.tsx";

function App() {
  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 400, breakpoint: "sm" }}>
      <AppShell.Header>
        <Title order={1}>Recipe Manager</Title>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <h2>Recipe Info</h2>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
