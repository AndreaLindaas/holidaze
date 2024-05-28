/// <reference types="cypress" />

describe("holidaze", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("nav ul li").contains("Login").click();
    cy.wait(6000);
    cy.get("form .emailInput input").type(
      "cypresstestingaccount@stud.noroff.no"
    );
    cy.get("form .password input").type("12345678");
    cy.get("button").contains("Login").click();
    cy.wait(8000);
  });

  it("can create a venue", () => {
    cy.get(".userMenu").click();
    cy.get(".createVenueButton").click();
    cy.wait(6000);
    cy.get(".mediaUrl").type(
      "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/08/featured_image_reasons_to_invest_in_a_vacation_home.jpeg.jpg"
    );
    cy.get("button").contains("Add").click();
    cy.get("button").contains("Remove").should("exist");
    cy.get(".venueName").type("Automated testing");
    cy.get(".description").type(
      "This is the description of a venue created with cypress. This is the description of a venue created with cypress. This is the description of a venue created with cypress. This is the description of a venue created with cypress."
    );
    cy.get(".address").type("Karolinerveien 4a");
    cy.get(".city").type("Trondheim");
    cy.get(".country").type("Norway");
    cy.get(".price").type("200");
    cy.get(".maxGuests").type("5");
    cy.get("button").contains("Create").click();
    cy.wait(5000);
    cy.contains("Automated testing");
    cy.contains("About the venue");
  });

  it("can delete venue", () => {
    cy.get(".userMenu").click();
    cy.get(".profileButton").click();
    cy.wait(6000);
    cy.get("button").contains("Delete").click();
    cy.wait(5000);
    cy.get(".deleteVenueButton").click();
  });
});
