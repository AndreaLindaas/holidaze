/// <reference types="cypress" />

describe("holidaze", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("can see 10 venues on frontpage", () => {
    cy.get(".allVenues a").should("have.length", 10);
  });

  it("can open a venue listing", () => {
    cy.get(".allVenues a").first().click();
    cy.contains("Meet the host");
  });

  it("can search for venues", () => {
    cy.get("form input").first().type("Oslo");
    cy.get("button").contains("Search").click();
    cy.get(".searchPage").should("exist");
  });

  it("can register a user", () => {
    cy.get("nav ul li").contains("Register").click();
    cy.get("form .name input").type("TestuserCypressTestingAccount");
    cy.get("form .email input").type("cypresstestingaccount@stud.noroff.no");
    cy.get("form .password input").type("12345678");
    cy.get("form .confirmPassword input").type("12345678");
    cy.get("button").contains("Sign up").click();

    cy.get("nav ul li").contains("Login").click();
    cy.get("form .emailInput input").type(
      "cypresstestingaccount@stud.noroff.no"
    );
    cy.get("form .password input").type("12345678");
    cy.get("button").contains("Login").click();
    cy.contains("My trips");
  });
});
