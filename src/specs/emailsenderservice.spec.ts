import EmailSenderService from "../services/emailsender.service";
import User from "../utils/user.util";

jest.mock("../services/emailsender.service.ts")

const mockedEmailSenderService = jest.mocked(EmailSenderService, {shallow: true})

describe("EmailSender service testing", () => {
	it("Should successfully send an email", () => {
		const user = new User("test_user", "test@test.fr");

		expect(mockedEmailSenderService.sendMail).toHaveBeenCalledTimes(0);

		EmailSenderService.sendMail(user);

		expect(mockedEmailSenderService.sendMail).toHaveBeenCalledTimes(1);
		expect(mockedEmailSenderService.sendMail).toHaveBeenCalledWith(user);
		expect(mockedEmailSenderService.sendMail).toHaveReturnedTimes(1);
	});
});