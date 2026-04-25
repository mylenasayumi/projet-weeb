// UpdateArticle.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import articleService from "../../services/ArticlesService";
import UpdateArticle from "../../pages/UpdateArticle";
import authTokenService from "../../services/AuthTokenService";

const mockNavigate = vi.fn();
const locationState = { current: null };

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({
            state: locationState.current,
        }),
    };
});

vi.mock("../../services/ArticlesService", () => ({
    default: {
        update: vi.fn(),
    },
}));

vi.mock("../../services/AuthTokenService", () => ({
    default: {
        isAuthenticated: vi.fn(() => true),
        logout: vi.fn(),
    },
}));

vi.mock("../../languages/LanguageContext", () => ({
    useLanguage: () => ({
        t: (key) => key,
        lang: "en",
        changeLanguage: vi.fn(),
    }),
}));

describe("UpdateArticle", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        locationState.current = {
            id: 10,
            title: "Old title",
            description: "Old description",
            ownerId: 1,
        };

        authTokenService.isAuthenticated.mockReturnValue(true);

        localStorage.setItem(
            "user",
            JSON.stringify({ id: 1, email: "mylena@gmail.com" })
        );
        vi.stubGlobal("confirm", vi.fn(() => true));
    });

    it("renders form with article data", () => {
        render(<UpdateArticle />);

        expect(screen.getByDisplayValue("Old title")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Old description")).toBeInTheDocument();
    });

    it("sends update", async () => {
        articleService.update.mockResolvedValue({});

        render(<UpdateArticle />);

        fireEvent.change(screen.getByDisplayValue("Old title"), {
            target: { name: "title", value: "New title" },
        });

        fireEvent.click(screen.getByRole("button", { name: "articles.updateArticleSaveButton" }));

        await waitFor(() => {
            expect(articleService.update).toHaveBeenCalledWith(10, {
                title: "New title",
                description: "Old description",
            });
        });

        expect(mockNavigate).toHaveBeenCalledWith("/articles");
    });

    it("redirects to /articles when article data is missing", async () => {
        locationState.current = null;

        render(<UpdateArticle />);

        expect(await screen.findByText("articles.articleDataMissingError")).toBeInTheDocument();
    });


    it("shows error when user is not authenticated", async () => {
        locationState.current = {
            id: 10,
            title: "Old title",
            description: "Old description",
            ownerId: 1,
        };

        authTokenService.isAuthenticated.mockReturnValue(false);

        render(<UpdateArticle />);

        expect(await screen.findByText("articles.loggedInUpdateArticleError")).toBeInTheDocument();
    });

    it("shows error when user is not the owner of the article", async () => {
        locationState.current = {
            id: 10,
            title: "Old title",
            description: "Old description",
            ownerId: 99999,
        };

        localStorage.setItem(
            "user",
            JSON.stringify({ id: 1, email: "mylena@gmail.com" })
        );

        render(<UpdateArticle />);

        expect(await screen.findByText("articles.notOwnerUpdateArticleError")).toBeInTheDocument();
    });

    it("does not update when user cancels confirmation", async () => {
        locationState.current = {
            id: 10,
            title: "Old title",
            description: "Old description",
            ownerId: 1,
        };

        vi.stubGlobal("confirm", vi.fn(() => false));

        render(<UpdateArticle />);

        fireEvent.click(screen.getByRole("button", { name: "articles.updateArticleSaveButton" }));

        expect(articleService.update).not.toHaveBeenCalled();
    });

    it("shows owner error when status 403", async () => {
        locationState.current = {
            id: 10,
            title: "Old title",
            description: "Old description",
            ownerId: 1,
        };

        vi.stubGlobal("confirm", vi.fn(() => true));

        articleService.update.mockRejectedValue({
            response: { status: 403 },
        });

        render(<UpdateArticle />);

        fireEvent.click(screen.getByRole("button", { name: "articles.updateArticleSaveButton" }));

        expect(await screen.findByText("articles.notOwnerUpdateArticleError")).toBeInTheDocument();
    });

    it("logs out and redirects when status 401", async () => {
        locationState.current = {
            id: 10,
            title: "Old title",
            description: "Old description",
            ownerId: 1,
        };

        vi.stubGlobal("confirm", vi.fn(() => true));

        articleService.update.mockRejectedValue({
            response: { status: 401 },
        });

        authTokenService.logout.mockResolvedValue();

        render(<UpdateArticle />);

        fireEvent.click(screen.getByRole("button", { name: "articles.updateArticleSaveButton" }));

        expect(await screen.findByText("articles.loggedInUpdateArticleError")).toBeInTheDocument();
        expect(authTokenService.logout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it("shows an error on unexpected failure", async () => {
        locationState.current = {
            id: 10,
            title: "Old title",
            description: "Old description",
            ownerId: 1,
        };

        vi.stubGlobal("confirm", vi.fn(() => true));

        articleService.update.mockRejectedValue(new Error("boom"));

        render(<UpdateArticle />);

        fireEvent.click(screen.getByRole("button", { name: "articles.updateArticleSaveButton" }));

        expect(await screen.findByText("articles.updateArticleError")).toBeInTheDocument();
    });

    it("handles invalid user in localStorage", () => {
        locationState.current = {
            id: 10,
            title: "Old title",
            description: "Old description",
            ownerId: 1,
        };

        localStorage.setItem("user", "{invalid-json");

        render(<UpdateArticle />);

        expect(screen.getByDisplayValue("Old title")).toBeInTheDocument();
    });
});

