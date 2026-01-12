import "@mantine/core/styles.css";

import { AppShell, Title } from "@mantine/core";

function App() {
  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm" }}>
      <AppShell.Header>
        <Title order={1}>Recipe Manager</Title>
      </AppShell.Header>
      <AppShell.Navbar>
        <h2>Recipe List</h2>
      </AppShell.Navbar>
      <AppShell.Main>
        <h2>Recipe Info</h2>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
