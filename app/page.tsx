import RequireAuth from "../components/RequireAuth";
import AppShell from "../components/AppShell";

export default function Home() {
  return (
    <RequireAuth>
      <AppShell />
    </RequireAuth>
  );
}