describe("user journey", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/en");
  });
  context("creating a new account", () => {
    it("creates a account and sign-out and sign-ins", () => {
      const email = `claw${Math.floor(Math.random() * 1000)}@www.cccaaaa`;
      const username = `claw${Math.floor(Math.random() * 1000)}`;

      cy.getByData("register-nav")
        .click()
        .getByInputName("email")
        .type(email) // email
        .getByInputName("username")
        .type(username) // username
        .location("pathname")
        .should("eq", "/en/auth/signup")
        .getByInputName("firstName")
        .type("clawa")
        .getByInputName("lastName")
        .type("hd")
        .getByInputName("password")
        .type("123456")
        .getByInputName("confirmPassword")
        .type("123456")
        .getByData("submit")
        .click()
        .location("pathname")
        .should("eq", "/en/home")
        .getByData("signout")
        .click()
        .location("pathname")
        .should("eq", "/en/auth/signin")
        .getByInputName("username")
        .type(username)
        .getByInputName("password")
        .type("123456")
        .getByData("submit")
        .click()
        .location("pathname")
        .should("eq", "/en/home");
    });
  });
  context("user interaction", () => {
    beforeEach(() => {
      cy.getByInputName("username").click().type("takish155");
      cy.getByInputName("password").click().type("pogi1919");
      cy.getByData("submit").click();
    });
    it("creates a post and likes it", () => {
      cy.location("pathname").should("eq", "/en/home");
      cy.get("textarea").click().type("Testing if post");
      cy.get("form button")
        .click()
        .then(() => {
          cy.get("p").contains("Testing if post");
        });
      cy.get("article > :nth-child(2) > :nth-child(1) > :nth-child(4)").then(
        (likeButton) => {
          cy.wrap(likeButton)
            .click()
            .then(() => {
              cy.wrap(likeButton).contains("1 Likes");
            });
        }
      );
      cy.get("article > :nth-child(2) > :nth-child(1) > :nth-child(5)")
        .click()
        .then(() => {
          cy.get(
            "article > :nth-child(2) > :nth-child(1) > :nth-child(3)"
          ).should("not.be", "Testing if post");
        });
    });

    it.only("should be able to change username and signin with it", () => {
      cy.getByData("nav-settings").click();
      cy.location("pathname").should("eq", "/en/settings");
      cy.getByData("nav-details").click();
      cy.location("pathname").should("eq", "/en/settings/personal_details");
      cy.getByData("change-username-button").click();
      cy.getByInputName("newUsername").as("usernameInput").should("exist");
      cy.getByInputName("password").as("passwordInput").should("exist");
      cy.get("@usernameInput").type("newName").blur();
      cy.get("@passwordInput").type("pogi1919").blur();
      cy.getByData("change-username-submit-button")
        .click()
        .then(() => {
          cy.get('[data-test="detail-username"]')
            .invoke("text")
            .then((text) => {
              console.log(text);
            });
        });
      cy.get('[data-test="detail-username"]').should("eq", "newName");
      cy.getByData("signout").click();
      cy.getByInputName("username").click().type("takish155");
      cy.getByInputName("password").click().type("pogi1919");
      cy.getByData("submit").click();
      cy.getByData("nav-settings").click();
      cy.location("pathname").should("eq", "/en/settings");
      cy.getByData("nav-details").click();
      cy.location("pathname").should("eq", "/en/settings/personal_details");
      cy.getByData("change-username-button").click();
      cy.getByInputName("newUsername").as("usernameInput").should("exist");
      cy.getByInputName("password").as("passwordInput").should("exist");
      cy.get("@usernameInput").type("takish155").blur();
      cy.get("@passwordInput").type("pogi1919").blur();
      cy.getByData("change-username-submit-button").click();

      cy.getByData("details-username").should("eq", "takish155");
    });
  });
});
