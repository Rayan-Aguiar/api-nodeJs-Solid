import { describe } from "node:test";
import { it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase


describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it("should be able to get user profile", async () => {


    const createUser = await usersRepository.create({
      email: "john.doe@example.com",
      name: "John Doe",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createUser.id,
    });

    expect(user.name).toEqual('John Doe');
  });

  it("should not be able to get user profile with wrong id", async () => {


    await expect(() => 
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
