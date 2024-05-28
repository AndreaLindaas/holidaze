/// <reference types="cypress" />

describe("holidaze", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("nav ul li").contains("Login").click();
    cy.get("form .emailInput input").type(
      "cypresstestingaccount@stud.noroff.no"
    );
    cy.get("form .password input").type("12345678");
    cy.get("button").contains("Login").click();
    cy.wait(4000);
    cy.contains("My trips");
  });

  it("can login and book", () => {
    cy.get(".allVenues a").first().click();
    cy.get(".react-datepicker__week .react-datepicker__day--selected").click();
    cy.wait(500);
    cy.get(".react-datepicker__navigation--next").click();
    cy.wait(100);
    cy.get(".react-datepicker__navigation--next").click();
    cy.wait(100);
    cy.get(".react-datepicker__navigation--next").click();
    cy.wait(100);
    cy.get(".react-datepicker__navigation--next").click();
    cy.wait(100);
    cy.get(".react-datepicker__navigation--next").click();
    cy.wait(100);

    cy.get(".react-datepicker__week .react-datepicker__day").first().click();
    cy.wait(100);
    cy.get(".react-datepicker__week .react-datepicker__day").first().click();
    cy.wait(100);
    cy.get(".react-datepicker__week .react-datepicker__day").eq(3).click();

    cy.get("button").contains("Book").click();
    cy.wait(1000);
    cy.get(".numberOfGuests").type("1");
    cy.get(".paymentCardNumber").type("1234567890123456");
    cy.get(".date").type("02/25");
    cy.get(".cvc").type("123");
    cy.get("button").contains("Book").click();
    cy.contains("Your booking was successfully made");
  });

  it("can delete booking", () => {
    cy.contains("My trips").click();
    cy.get(".upcomingTrips a").first().click();
    cy.get("button").contains("Cancel trip").click();
    cy.wait(1000);
    cy.get(".cancelTripButton").click({ force: true });
  });
});
