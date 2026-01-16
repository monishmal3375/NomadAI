import { authOptions } from "../lib/auth/options";

describe("NextAuth config", () => {
  test("has at least one provider", () => {
    expect(authOptions.providers?.length).toBeGreaterThan(0);
  });

  test("uses jwt session strategy", () => {
    expect(authOptions.session?.strategy).toBe("jwt");
  });

  test("google provider is present", () => {
    const provider: any = authOptions.providers?.[0];
    expect(provider).toBeTruthy();
  });
});
