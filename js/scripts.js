// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, streetAddress, cityAddress, stateAddress, zipAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailAddress = emailAddress
  this.streetAddress = streetAddress
  this.cityAddress = cityAddress
  this.stateAddress = stateAddress
  this.zipAddress = zipAddress

}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
   htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
 });
 contactsList.html(htmlForContactInfo);
};
function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".street-address").html(contact.streetAddress);
  $(".city-address").html(contact.cityAddress);
  $(".state-address").html(contact.stateAddress);
  $(".zip-address").html(contact.zipAddress);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}
function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
      showContact(this.id);
    });
    $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    addressBook.addContact(new Contact($("input#new-first-name").val(), $("input#new-last-name").val(), $("input#new-phone-number").val(), $("input#new-email-address").val(),
    $("input#new-street-address").val(),
    $("input#new-city-address").val(), $("select#new-state-address").val(), $("input#new-zip-address").val()
    ))
    displayContactDetails(addressBook);
  });
});
