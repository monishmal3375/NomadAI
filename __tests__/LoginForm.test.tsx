import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../components/LoginForm";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

import { signIn } from "next-auth/react";

describe("LoginForm", () => {
  it("renders the Google sign-in button", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: /continue with google/i })).toBeInTheDocument();
  });

  it("calls signIn('google') when clicked", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /continue with google/i }));

    expect(signIn).toHaveBeenCalled();
    expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/" });
  });
});
