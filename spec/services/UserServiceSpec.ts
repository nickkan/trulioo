///<reference path='../../typings/main/ambient/jasmine/jasmine.d.ts'/>
var us = require('../../services/UserService');

var userService;

var oldPassword;
var plainPassword;
var salt;

var oldEmail;
var plainEmail;
var newEmail;

describe("UserService Unit Tests", function() {

  beforeEach(function() {
    userService = new us.UserService();
  });

  describe("checkOldPassword", function() {

    beforeEach(function() {
      oldPassword = "$2a$09$9Y8IsfEvv0E5G53gtCj9c.HXazTOhhKlKUH/H13DINyFmDjuPuoBW";
      plainPassword = "test";
      salt = "$2a$09$9Y8IsfEvv0E5G53gtCj9c.";
    });

    it("should return true for the correct password", function() {
      expect(userService.checkOldPassword(oldPassword, plainPassword, salt)).toEqual(true);
    });

    it("should return false for a blank password", function() {
      expect(userService.checkOldPassword(oldPassword, "", salt)).toEqual(false);
    });

    it("should return false for the incorrect password", function() {
      expect(userService.checkOldPassword(oldPassword, "incorrect", salt)).toEqual(false);
    });

    it("should return false for an unhashed password", function() {
      expect(userService.checkOldPassword(plainPassword, plainPassword, salt)).toEqual(false);
    });
  });

  describe("checkAndValidateEmail", function() {

    beforeEach(function() {
      oldEmail = "test@test.com";
      plainEmail = "test@test.com";
      newEmail = "newtest@test.com";
    });

    it("should return true for valid email inputs", function() {
      expect(userService.checkAndValidateEmail(oldEmail, plainEmail, newEmail)).toEqual(true);
    });

    it("should return false for a new email that is invalid", function() {
      expect(userService.checkAndValidateEmail(oldEmail, plainEmail, "newtestattestdotcom")).toEqual(false);
    });

    it("should return false for an email that does not match the old email", function() {
      expect(userService.checkAndValidateEmail(oldEmail, newEmail, newEmail)).toEqual(false);
    });

  });

});
