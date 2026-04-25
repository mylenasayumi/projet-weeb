// LoginSection.test.jsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import authTokenService from "../../services/AuthTokenService";
import authService from "../../services/AuthService";
import LoginSection from "../users/login/LoginSection";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();
const assignMock = vi.fn();
const originalLocation = window.location;
let mockSearch = "?success=account_created";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({
            search: mockSearch,
        }),
    };
});

vi.mock("../../languages/LanguageContext", () => ({
    useLanguage: () => ({
        t: (key) => key,
        lang: "en",
        changeLanguage: vi.fn(),
    }),
}));

vi.mock("../../services/AuthTokenService", () => ({
    default: {
        login: vi.fn(),
    },
}));

vi.mock("../../services/AuthService", () => ({
    default: {
        getCurrentUser: vi.fn(),
    },
}));

describe("LoginSection", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();

        window.history.pushState({}, "", "/login?success=account_created");        
    
        Object.defineProperty(window, "location", {
            configurable: true,
            value: {
                ...originalLocation,
                assign: assignMock,
            },
        });
    });

    afterEach(() => {
        Object.defineProperty(window, "location", {
            configurable: true,
            value: originalLocation,
        });
    });

    const renderComponent = () => {
        render(
            <MemoryRouter>
                <LoginSection />
            </MemoryRouter>
        )
    }

    it("renders inputs and button.", () => {
        renderComponent();

        expect(screen.getByPlaceholderText("login.email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("login.password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "login.loginButton" })).toBeInTheDocument();
    });

    it("logs in and saves user.", async () => {
        authTokenService.login.mockResolvedValue({ access: "abc" });
        authService.getCurrentUser.mockResolvedValue({
            id: 1,
            email: "mylena@gmail.com",
            first_name: "Mylena",
            last_name: "Hamasaki",
            is_active: true,
        });

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText("login.email"), {
            target: { value: "mylena@gmail.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("login.password"), {
            target: { value: "secret123" },
        });

        fireEvent.click(screen.getByRole("button", { name: "login.loginButton" }));

        await waitFor(() => {
            expect(authTokenService.login).toHaveBeenCalledWith(
                "mylena@gmail.com",
                "secret123"
            );
        });

        await waitFor(() => {
            expect(authService.getCurrentUser).toHaveBeenCalled();
        });
        expect(JSON.parse(localStorage.getItem("user")).email).toBe("mylena@gmail.com");
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("displays an error if login fails.", async () => {
        authTokenService.login.mockRejectedValue(new Error("Invalid credentials"));

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText("login.email"), {
            target: { value: "mylena@gmail.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("login.password"), {
            target: { value: "wrong" },
        });

        fireEvent.click(screen.getByRole("button", { name: "login.loginButton" }));

        expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
    });

    it("shows account created success message", () => {
        renderComponent();
        expect(screen.getByText("login.accountCreatedMessage")).toBeInTheDocument();
    });

    it("redirects to github auth on button click", () => {
        renderComponent();

        fireEvent.click(screen.getByRole("button", { name: "login.githubButton" }));

        expect(assignMock).toHaveBeenCalledWith(
            expect.stringContaining("/api/auth/github/")
        );
    });

    it("shows error if user fetch fails after login", async () => {
        authTokenService.login.mockResolvedValue({ access: "abc" });
        authService.getCurrentUser.mockRejectedValue(new Error("User fetch failed"));

        renderComponent();

        fireEvent.change(screen.getByPlaceholderText("login.email"), {
            target: { value: "mylena@gmail.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("login.password"), {
            target: { value: "secret123" },
        });

        fireEvent.click(screen.getByRole("button", { name: "login.loginButton" }));

        expect(await screen.findByText("User fetch failed")).toBeInTheDocument();
    });

    it("shows github access denied error", () => {
        mockSearch = "?error=github_access_denied";
        window.history.pushState({}, "", "/login?error=github_access_denied");

        renderComponent();

        expect(screen.getByText("github_access_denied")).toBeInTheDocument();
    });

    it("shows github no code error", () => {
        mockSearch = "?error=github_no_code";
        window.history.pushState({}, "", "/login?error=github_no_code");

        renderComponent();

        expect(screen.getByText("github_no_code")).toBeInTheDocument();
    });

    it("shows github token failed error", () => {
        mockSearch = "?error=github_token_failed";
        window.history.pushState({}, "", "/login?error=github_token_failed");

        renderComponent();

        expect(screen.getByText("github_token_failed")).toBeInTheDocument();
    });

    it("shows github no email error", () => {
        mockSearch = "?error=github_no_email";
        window.history.pushState({}, "", "/login?error=github_no_email");

        renderComponent();

        expect(screen.getByText("github_no_email")).toBeInTheDocument();
    });

    it("shows fallback login error message when error is empty", () => {
        mockSearch = "?error=";
        window.history.pushState({}, "", "/login?error=");

        renderComponent();

        expect(screen.getByText("login.errorMessage")).toBeInTheDocument();
    });
});